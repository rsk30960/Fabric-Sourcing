import { NextResponse } from "next/server";
import { anthropic, CONSULTANT_MODEL, CONSULTANT_SYSTEM_PROMPT } from "../../../lib/anthropic";
import { supabaseServerSelect } from "../../../lib/supabaseServer";

export const dynamic = "force-dynamic";

const TOOLS = [
  {
    name: "search_knowledge_base",
    description:
      "Search Textile Academy articles and blog posts for grounding content. Call this before answering any factual question about textiles, sourcing, manufacturing, compliance, sizing, or Incoterms.",
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search terms describing what the visitor is asking about." },
      },
      required: ["query"],
    },
  },
  {
    name: "create_lead",
    description:
      "Create a lead record once you have the visitor's name, at least one contact method (email or phone), and a description of what they're looking to source. Call at most once per conversation, after confirming the details with the visitor.",
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        company: { type: "string" },
        division: { type: "string" },
        requirement: { type: "string", description: "What the visitor needs, summarized in their own words." },
      },
      required: ["name", "requirement"],
    },
  },
];

async function runSearchKnowledgeBase(query) {
  const safeTerm = String(query || "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .slice(0, 60);
  if (!safeTerm) return "No usable search term provided.";

  const term = encodeURIComponent(`*${safeTerm}*`);
  const orFilter = `or=(title.ilike.${term},summary.ilike.${term},body.ilike.${term})`;

  const [articles, posts] = await Promise.all([
    supabaseServerSelect(
      "academy_articles",
      `select=title,summary,body,is_compliance_sensitive,status&status=eq.published&${orFilter}`
    ),
    supabaseServerSelect("blogs", `select=title,body,category&is_published=eq.true&${orFilter}`),
  ]);

  const results = [
    ...articles.slice(0, 3).map((a) => ({
      source: "Textile Academy",
      title: a.title,
      complianceSensitive: a.is_compliance_sensitive,
      content: (a.summary ? a.summary + " " : "") + (a.body || "").slice(0, 600),
    })),
    ...posts.slice(0, 2).map((p) => ({
      source: "Blog",
      title: p.title,
      complianceSensitive: false,
      content: (p.body || "").slice(0, 600),
    })),
  ];

  if (results.length === 0) {
    return "No matching content found in the knowledge base for this query.";
  }

  return results
    .map(
      (r) =>
        `[${r.source}] ${r.title}${r.complianceSensitive ? " (compliance-sensitive — needs expert review)" : ""}\n${r.content}`
    )
    .join("\n\n---\n\n");
}

async function runCreateLead(input) {
  const { name, email, phone, company, division, requirement } = input || {};
  if (!name || !requirement) {
    return "Missing required fields (name, requirement) — ask the visitor for what's missing before trying again.";
  }

  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/leads`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        // anon only has INSERT on leads (no SELECT) — return=minimal avoids PostgREST trying
        // to return the inserted row, which would need a grant anon doesn't have.
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        source: "AI Consultant",
        status: "New",
        contact_name: name,
        contact_email: email || null,
        contact_mobile: phone || null,
        contact_company: company || null,
        division: division || null,
        requirement,
        message: `Captured via AI Consultant chat.\n\nRequirement: ${requirement}`,
      }),
    });

    if (!res.ok) {
      return "Failed to create the lead record — tell the visitor the team will follow up manually and apologize for the hiccup.";
    }
    return "Lead created successfully. Thank the visitor and let them know the team will follow up.";
  } catch {
    return "Failed to create the lead record — tell the visitor the team will follow up manually and apologize for the hiccup.";
  }
}

export async function POST(req) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "AI Consultant is not configured yet." }, { status: 503 });
  }

  const body = await req.json().catch(() => null);
  const messages = body?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "messages is required" }, { status: 400 });
  }

  let conversation = messages.slice(-20).map((m) => ({ role: m.role, content: m.content }));

  try {
    for (let i = 0; i < 4; i++) {
      const response = await anthropic.messages.create({
        model: CONSULTANT_MODEL,
        max_tokens: 1024,
        system: CONSULTANT_SYSTEM_PROMPT,
        tools: TOOLS,
        messages: conversation,
      });

      if (response.stop_reason !== "tool_use") {
        const text =
          response.content.find((b) => b.type === "text")?.text ||
          "Sorry, I couldn't process that — please try the contact form instead.";
        return NextResponse.json({ reply: text });
      }

      conversation = [...conversation, { role: "assistant", content: response.content }];

      const toolResults = [];
      for (const block of response.content) {
        if (block.type !== "tool_use") continue;
        let result;
        if (block.name === "search_knowledge_base") {
          result = await runSearchKnowledgeBase(block.input?.query);
        } else if (block.name === "create_lead") {
          result = await runCreateLead(block.input);
        } else {
          result = "Unknown tool.";
        }
        toolResults.push({ type: "tool_result", tool_use_id: block.id, content: result });
      }
      conversation = [...conversation, { role: "user", content: toolResults }];
    }

    return NextResponse.json({
      reply: "Sorry, I'm having trouble completing that — please try the contact form instead.",
    });
  } catch (err) {
    console.error("AI Consultant error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
