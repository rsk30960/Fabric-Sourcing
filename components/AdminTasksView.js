"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ListChecks } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

function formatDate(value) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function isOverdue(dueDate) {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date(new Date().toDateString());
}

export default function AdminTasksView() {
  const [tasks, setTasks] = useState([]);
  const [leadsById, setLeadsById] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    async function load() {
      const [{ data: tasksData }, { data: leadsData }] = await Promise.all([
        supabase.from("tasks").select("*"),
        supabase.from("leads").select("id,contact_name,contact_company"),
      ]);
      setTasks((tasksData || []).sort((a, b) => (a.due_date || "9999") > (b.due_date || "9999") ? 1 : -1));
      setLeadsById(new Map((leadsData || []).map((l) => [l.id, l])));
      setLoading(false);
    }
    load();
  }, []);

  async function toggleTask(taskId, completed) {
    setTasks((t) => t.map((task) => (task.id === taskId ? { ...task, completed } : task)));
    await supabase.from("tasks").update({ completed }).eq("id", taskId);
  }

  const visibleTasks = tasks.filter((t) => showCompleted || !t.completed);

  return (
    <div className="max-w-content mx-auto px-5 py-8">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <ListChecks size={18} className="text-graphite" />
          <h1 className="text-lg font-medium text-graphite">My Tasks</h1>
        </div>
        <label className="flex items-center gap-2 text-sm text-ink-secondary">
          <input type="checkbox" checked={showCompleted} onChange={(e) => setShowCompleted(e.target.checked)} />
          Show completed
        </label>
      </div>
      <p className="text-sm text-ink-secondary mb-5">
        {loading ? "Loading…" : `${visibleTasks.filter((t) => !t.completed).length} pending`}
      </p>

      {!loading && visibleTasks.length === 0 && (
        <div className="rounded-md border border-dashed border-border-strong bg-white p-8 text-center text-sm text-ink-secondary">
          No tasks. Add follow-ups from a lead's detail page.
        </div>
      )}

      {!loading && visibleTasks.length > 0 && (
        <div className="rounded-md border border-border bg-white overflow-hidden">
          {visibleTasks.map((task) => {
            const lead = leadsById.get(task.lead_id);
            const overdue = !task.completed && isOverdue(task.due_date);
            return (
              <div key={task.id} className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) => toggleTask(task.id, e.target.checked)}
                />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${task.completed ? "line-through text-ink-secondary" : "text-ink"}`}>
                    {task.title}
                  </p>
                  {lead && (
                    <Link href={`/admin/leads/${lead.id}`} className="text-xs text-clay hover:underline">
                      {lead.contact_name || "Lead"}{lead.contact_company && ` · ${lead.contact_company}`}
                    </Link>
                  )}
                </div>
                {task.due_date && (
                  <span className={`text-xs whitespace-nowrap ${overdue ? "text-status-danger font-medium" : "text-ink-secondary"}`}>
                    {overdue ? "Overdue: " : ""}{formatDate(task.due_date)}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
