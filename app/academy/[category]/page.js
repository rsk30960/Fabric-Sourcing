import { notFound } from "next/navigation";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { supabaseServerSelect, supabaseServerSelectOne } from "../../../lib/supabaseServer";

export const dynamic = "force-dynamic";

async function getCategoryAndArticles(slug) {
  const category = await supabaseServerSelectOne("academy_categories", `select=*&slug=eq.${encodeURIComponent(slug)}`);
  if (!category) return { category: null, articles: [] };

  const articles = await supabaseServerSelect(
    "academy_articles",
    `select=id,slug,title,summary,status,is_compliance_sensitive,sort_order&category_id=eq.${category.id}`
  );

  return { category, articles: articles.sort((a, b) => a.sort_order - b.sort_order) };
}

export async function generateMetadata({ params }) {
  const { category } = await getCategoryAndArticles(params.category);
  if (!category) return {};
  return { title: `${category.name} | Textile Academy | Vexora Global`, description: category.description };
}

export default async function AcademyCategoryPage({ params }) {
  const { category, articles } = await getCategoryAndArticles(params.category);
  if (!category) notFound();

  return (
    <div className="max-w-content mx-auto px-4 md:px-6 py-16 md:py-20">
      <Link href="/academy" className="text-sm text-ink-secondary hover:text-clay">&larr; Textile Academy</Link>
      <div className="max-w-2xl mt-4 mb-10">
        <h1 className="text-3xl font-semibold text-graphite mb-3">{category.name}</h1>
        <p className="text-ink-secondary">{category.description}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {articles.map((a) => (
          <Link
            key={a.id}
            href={`/academy/${category.slug}/${a.slug}`}
            className="flex items-center justify-between gap-3 bg-surface-card border border-border rounded-md px-4 py-3 hover:border-clay hover:shadow-sm transition-all"
          >
            <span className="flex items-center gap-2">
              <span className="font-medium text-graphite">{a.title}</span>
              {a.is_compliance_sensitive && (
                <AlertTriangle size={14} className="text-status-warning" aria-label="Compliance-sensitive topic" />
              )}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-sm whitespace-nowrap ${
                a.status === "published" ? "bg-status-successBg text-status-success" : "bg-surface-page text-ink-secondary"
              }`}
            >
              {a.status === "published" ? "Live" : "Coming soon"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
