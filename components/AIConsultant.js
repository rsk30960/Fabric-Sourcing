"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";

const GREETING = {
  role: "assistant",
  content:
    "Hi! I'm the Vexora Global AI Consultant. Ask me about our products, sourcing process, or industry topics — or tell me what you're looking for and I'll pass your details to the team.",
};

export default function AIConsultant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/consultant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || data.error || "Sorry, something went wrong." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-24 right-6 z-50 flex items-center gap-2 bg-graphite text-white px-4 py-3 rounded-full shadow-lg hover:bg-graphite-dark transition"
        aria-label={open ? "Close AI Consultant" : "Open AI Consultant"}
      >
        {open ? <X size={20} /> : <MessageSquare size={20} />}
        <span className="hidden sm:inline text-sm font-medium">{open ? "Close" : "Ask AI Consultant"}</span>
      </button>

      {open && (
        <div className="fixed bottom-40 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm h-[28rem] bg-surface-card border border-border rounded-md shadow-xl flex flex-col overflow-hidden">
          <div className="bg-graphite text-white px-4 py-3 shrink-0">
            <p className="text-sm font-medium">Vexora Global AI Consultant</p>
            <p className="text-xs text-white/70">
              AI assistant — not a substitute for a formal quote or expert compliance advice.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm rounded-md px-3 py-2 max-w-[85%] whitespace-pre-wrap ${
                  m.role === "user" ? "bg-clay text-white ml-auto" : "bg-surface-page text-ink"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && <div className="text-xs text-ink-secondary">Thinking…</div>}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-border p-2 shrink-0">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              className="flex-1 text-sm px-3 py-2 rounded-sm border border-border focus:outline-none focus:border-clay"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-clay text-white p-2 rounded-sm disabled:opacity-50"
              aria-label="Send"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
