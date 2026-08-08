"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import SpecificationDetail from "./SpecificationDetail";
import { STATUSES } from "./AdminLeadsTable";

const CURRENCIES = ["INR", "USD", "EUR"];

function formatDateTime(value) {
  return new Date(value).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function formatDate(value) {
  return new Date(value).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function AdminLeadDetail({ leadId }) {
  const [lead, setLead] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [activities, setActivities] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noteText, setNoteText] = useState("");
  const [newCompanyName, setNewCompanyName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDue, setTaskDue] = useState("");

  async function loadAll() {
    const [{ data: leadData }, { data: companiesData }, { data: activitiesData }, { data: tasksData }] = await Promise.all([
      supabase.from("leads").select("*").eq("id", leadId).single(),
      supabase.from("companies").select("id,name"),
      supabase.from("lead_activities").select("*").eq("lead_id", leadId),
      supabase.from("tasks").select("*").eq("lead_id", leadId),
    ]);
    setLead(leadData);
    setCompanies((companiesData || []).sort((a, b) => a.name.localeCompare(b.name)));
    setActivities((activitiesData || []).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    setTasks((tasksData || []).sort((a, b) => (a.due_date || "9999") > (b.due_date || "9999") ? 1 : -1));
    setLoading(false);
  }

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leadId]);

  async function updateLead(fields) {
    setLead((l) => ({ ...l, ...fields }));
    await supabase.from("leads").update(fields).eq("id", leadId);
  }

  async function handleAddCompany() {
    if (!newCompanyName.trim()) return;
    const { data } = await supabase.from("companies").insert({ name: newCompanyName }).select().single();
    if (data) {
      setCompanies((c) => [...c, data].sort((a, b) => a.name.localeCompare(b.name)));
      setNewCompanyName("");
      updateLead({ company_id: data.id });
    }
  }

  async function handleAddNote(e) {
    e.preventDefault();
    if (!noteText.trim()) return;
    const { data } = await supabase.from("lead_activities").insert({ lead_id: leadId, type: "note", content: noteText }).select().single();
    if (data) {
      setActivities((a) => [data, ...a]);
      setNoteText("");
    }
  }

  async function handleAddTask(e) {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    const { data } = await supabase.from("tasks").insert({ lead_id: leadId, title: taskTitle, due_date: taskDue || null }).select().single();
    if (data) {
      setTasks((t) => [...t, data]);
      setTaskTitle("");
      setTaskDue("");
    }
  }

  async function toggleTask(taskId, completed) {
    setTasks((t) => t.map((task) => (task.id === taskId ? { ...task, completed } : task)));
    await supabase.from("tasks").update({ completed }).eq("id", taskId);
  }

  if (loading) return <p className="max-w-content mx-auto px-5 py-10 text-sm text-ink-secondary">Loading…</p>;
  if (!lead) return <p className="max-w-content mx-auto px-5 py-10 text-sm text-status-danger">Lead not found.</p>;

  return (
    <div className="max-w-content mx-auto px-5 py-8">
      <Link href="/admin/leads" className="inline-flex items-center gap-1 text-sm text-ink-secondary hover:text-clay mb-4">
        <ArrowLeft size={14} /> Back to Leads
      </Link>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
        <div>
          <h1 className="text-xl font-medium text-graphite mb-1">{lead.contact_name || "—"}</h1>
          <p className="text-sm text-ink-secondary mb-6">{lead.contact_email} {lead.contact_mobile && `· ${lead.contact_mobile}`}</p>

          {lead.message && (
            <div className="bg-surface-page rounded-md p-4 text-sm whitespace-pre-wrap mb-6">{lead.message}</div>
          )}

          {lead.source === "Specification Request" && (
            <div className="mb-6">
              <SpecificationDetail leadId={lead.id} />
            </div>
          )}

          <div className="border-t border-border pt-6">
            <h2 className="font-medium text-graphite mb-3">Activity</h2>
            <form onSubmit={handleAddNote} className="flex gap-2 mb-4">
              <input
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add a note…"
                className="flex-1 border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-graphite/30"
              />
              <button type="submit" className="bg-graphite text-white px-4 py-2 rounded-sm text-sm font-medium hover:bg-graphite-dark">
                Add
              </button>
            </form>
            <div className="space-y-3">
              {activities.length === 0 && <p className="text-xs text-ink-secondary">No activity yet.</p>}
              {activities.map((a) => (
                <div key={a.id} className="text-sm border-l-2 border-border pl-3">
                  <p className="text-xs text-ink-secondary">
                    {formatDateTime(a.created_at)} · <span className="uppercase">{a.type.replace("_", " ")}</span>
                  </p>
                  <p className="text-ink">{a.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface-card border border-border rounded-md p-4">
            <h3 className="text-xs font-medium text-ink-secondary uppercase mb-3">Pipeline</h3>
            <label className="block mb-3">
              <span className="block text-xs text-ink-secondary mb-1">Status</span>
              <select
                value={lead.status}
                onChange={(e) => updateLead({ status: e.target.value })}
                className="w-full border border-border rounded-sm px-2 py-1.5 text-sm"
              >
                {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.value}</option>)}
              </select>
            </label>
            <label className="block mb-3">
              <span className="block text-xs text-ink-secondary mb-1">Company</span>
              <select
                value={lead.company_id || ""}
                onChange={(e) => updateLead({ company_id: e.target.value || null })}
                className="w-full border border-border rounded-sm px-2 py-1.5 text-sm mb-2"
              >
                <option value="">Unassigned</option>
                {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <div className="flex gap-1">
                <input
                  value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}
                  placeholder="New company name"
                  className="flex-1 border border-border rounded-sm px-2 py-1 text-xs"
                />
                <button onClick={handleAddCompany} type="button" className="text-clay" aria-label="Add company">
                  <Plus size={16} />
                </button>
              </div>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className="block">
                <span className="block text-xs text-ink-secondary mb-1">Est. value</span>
                <input
                  type="number"
                  value={lead.estimated_value || ""}
                  onChange={(e) => updateLead({ estimated_value: e.target.value ? Number(e.target.value) : null })}
                  className="w-full border border-border rounded-sm px-2 py-1.5 text-sm"
                />
              </label>
              <label className="block">
                <span className="block text-xs text-ink-secondary mb-1">Currency</span>
                <select
                  value={lead.estimated_value_currency || "INR"}
                  onChange={(e) => updateLead({ estimated_value_currency: e.target.value })}
                  className="w-full border border-border rounded-sm px-2 py-1.5 text-sm"
                >
                  {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
            </div>
          </div>

          <div className="bg-surface-card border border-border rounded-md p-4">
            <h3 className="text-xs font-medium text-ink-secondary uppercase mb-3">Details</h3>
            <dl className="text-xs space-y-1">
              <div><dt className="inline text-ink-secondary">Source: </dt><dd className="inline">{lead.source}</dd></div>
              <div><dt className="inline text-ink-secondary">Market: </dt><dd className="inline">{lead.market || "—"}</dd></div>
              <div><dt className="inline text-ink-secondary">Country: </dt><dd className="inline">{lead.contact_country || "—"}</dd></div>
              <div><dt className="inline text-ink-secondary">Created: </dt><dd className="inline">{formatDate(lead.created_at)}</dd></div>
            </dl>
          </div>

          <div className="bg-surface-card border border-border rounded-md p-4">
            <h3 className="text-xs font-medium text-ink-secondary uppercase mb-3">Tasks</h3>
            <form onSubmit={handleAddTask} className="space-y-2 mb-3">
              <input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Follow up on…"
                className="w-full border border-border rounded-sm px-2 py-1.5 text-sm"
              />
              <div className="flex gap-2">
                <input
                  type="date"
                  value={taskDue}
                  onChange={(e) => setTaskDue(e.target.value)}
                  className="flex-1 border border-border rounded-sm px-2 py-1.5 text-sm"
                />
                <button type="submit" className="bg-graphite text-white px-3 py-1.5 rounded-sm text-sm">
                  Add
                </button>
              </div>
            </form>
            <div className="space-y-2">
              {tasks.length === 0 && <p className="text-xs text-ink-secondary">No tasks yet.</p>}
              {tasks.map((t) => (
                <label key={t.id} className="flex items-start gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={(e) => toggleTask(t.id, e.target.checked)}
                    className="mt-1"
                  />
                  <span className={t.completed ? "line-through text-ink-secondary" : ""}>
                    {t.title}
                    {t.due_date && <span className="text-xs text-ink-secondary block">{formatDate(t.due_date)}</span>}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
