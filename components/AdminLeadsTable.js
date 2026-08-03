"use client";

// Admin — Lead Management, docs/volume-5-admin-portal.md §5.3.
// Status flow: New → Awaiting Clarification (if needed) → Quoted → Won/Lost, per Volume 4 §4.4's
// confirmed conditional workflow. Expandable rows show Specification Request line items
// (fabric/trims/artwork/measurements/styling/reference images) where applicable.

import { useEffect, useState } from "react";
import { ClipboardList, ChevronDown, ChevronRight } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export const STATUSES = [
  { value: "New", bg: "bg-status-infoBg", text: "text-status-info" },
  { value: "Awaiting Clarification", bg: "bg-status-warningBg", text: "text-status-warning" },
  { value: "Quoted", bg: "bg-status-warningBg", text: "text-status-warning" },
  { value: "Won", bg: "bg-status-successBg", text: "text-status-success" },
  { value: "Lost", bg: "bg-status-dangerBg", text: "text-status-danger" },
];

function statusConfig(value) {
  return STATUSES.find((s) => s.value === value) ?? STATUSES[0];
}

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function StatusPill({ lead, isEditing, onStartEdit, onChangeStatus, onCancelEdit }) {
  if (isEditing) {
    return (
      <select
        autoFocus
        defaultValue={lead.status}
        onChange={(e) => onChangeStatus(lead.id, e.target.value)}
        onBlur={onCancelEdit}
        className="min-h-9 rounded-sm border border-graphite bg-white px-2 text-xs text-ink outline-none"
      >
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>{s.value}</option>
        ))}
      </select>
    );
  }
  const config = statusConfig(lead.status);
  return (
    <button
      type="button"
      onClick={() => onStartEdit(lead.id)}
      className={`inline-flex min-h-9 items-center rounded-sm px-2.5 py-1 text-xs font-medium ${config.bg} ${config.text}`}
    >
      {lead.status}
    </button>
  );
}

function SpecificationDetail({ leadId }) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const { data: specRequest } = await supabase
        .from("specification_requests")
        .select("id")
        .eq("lead_id", leadId)
        .maybeSingle();

      if (!specRequest) {
        if (!cancelled) setLoading(false);
        return;
      }

      const { data: lineItems } = await supabase
        .from("specification_request_line_items")
        .select("*")
        .eq("specification_request_id", specRequest.id);

      if (cancelled) return;
      setItems(lineItems || []);

      // Reference images live in a private bucket — need signed URLs to view them.
      const urls = {};
      for (const item of lineItems || []) {
        for (const path of item.reference_images || []) {
          const { data } = await supabase.storage.from("reference-images").createSignedUrl(path, 3600);
          if (data?.signedUrl) urls[path] = data.signedUrl;
        }
      }
      if (!cancelled) {
        setImageUrls(urls);
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [leadId]);

  if (loading) return <p className="text-xs text-ink-secondary py-3">Loading specification…</p>;
  if (items.length === 0) return null;

  return (
    <div className="space-y-3 py-3">
      <p className="text-xs font-medium text-ink-secondary">Specification line items</p>
      {items.map((item, idx) => (
        <div key={item.id} className="bg-surface-page rounded-sm p-3 text-xs space-y-1">
          <p className="font-medium text-graphite">Item {idx + 1}</p>
          <p><span className="text-ink-secondary">Fabric:</span> {item.fabric}</p>
          {item.trims && <p><span className="text-ink-secondary">Trims:</span> {item.trims}</p>}
          {item.artwork && <p><span className="text-ink-secondary">Artwork:</span> {item.artwork}</p>}
          <p><span className="text-ink-secondary">Measurements:</span> {item.measurements}</p>
          {item.styling && <p><span className="text-ink-secondary">Styling:</span> {item.styling}</p>}
          <p><span className="text-ink-secondary">Quantity:</span> {item.quantity}</p>
          {item.reference_images?.length > 0 && (
            <div className="flex gap-2 flex-wrap pt-1">
              {item.reference_images.map((path) => (
                <a key={path} href={imageUrls[path]} target="_blank" rel="noopener noreferrer" className="text-clay hover:underline">
                  Reference image
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function AdminLeadsTable() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      // Sorting client-side rather than with .order() — see
      // app/products/[division]/page.js getProducts() comment for why.
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .is("deleted_at", null);
      if (cancelled) return;
      if (error) {
        setLoadError("Could not load leads from Supabase.");
      } else {
        setLeads((data ?? []).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
      }
      setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const sources = Array.from(new Set(leads.map((l) => l.source))).sort();
  const filteredLeads = leads.filter(
    (l) => (statusFilter === "all" || l.status === statusFilter) && (sourceFilter === "all" || l.source === sourceFilter)
  );

  async function handleStatusChange(leadId, newStatus) {
    setEditingId(null);
    setUpdateError(null);
    const previous = leads;
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l)));
    const { error } = await supabase.from("leads").update({ status: newStatus }).eq("id", leadId);
    if (error) {
      setLeads(previous);
      setUpdateError("Could not update status. Please try again.");
    }
  }

  return (
    <div className="max-w-content mx-auto px-5 py-8">
      <div className="flex items-center gap-2 mb-1">
        <ClipboardList size={18} className="text-graphite" />
        <h1 className="text-lg font-medium text-graphite">Leads</h1>
      </div>
      <p className="text-sm text-ink-secondary mb-5">
        {loading ? "Loading…" : `${filteredLeads.length} of ${leads.length} lead${leads.length !== 1 ? "s" : ""} shown`}
      </p>

      <div className="mb-4 flex flex-wrap gap-3">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 rounded-sm border border-border bg-white px-3 text-sm text-ink outline-none focus:border-graphite">
          <option value="all">All statuses</option>
          {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.value}</option>)}
        </select>
        <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}
          className="h-10 rounded-sm border border-border bg-white px-3 text-sm text-ink outline-none focus:border-graphite">
          <option value="all">All sources</option>
          {sources.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {updateError && <p className="mb-3 text-sm text-status-danger">{updateError}</p>}
      {loadError && <p className="mb-3 text-sm text-status-danger">{loadError}</p>}

      {!loading && !loadError && leads.length === 0 && (
        <div className="rounded-md border border-dashed border-border-strong bg-white p-8 text-center text-sm text-ink-secondary">
          No leads yet. Submit an enquiry form on the site to see one appear here.
        </div>
      )}

      {!loading && leads.length > 0 && (
        <div className="rounded-md border border-border bg-white overflow-hidden">
          {filteredLeads.map((lead) => {
            const isExpanded = expandedId === lead.id;
            return (
              <div key={lead.id} className="border-b border-border last:border-0">
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : lead.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-surface-page"
                >
                  {isExpanded ? <ChevronDown size={16} className="shrink-0 text-ink-secondary" /> : <ChevronRight size={16} className="shrink-0 text-ink-secondary" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-graphite font-medium truncate">
                      {lead.contact_name || "—"} {lead.contact_company && `· ${lead.contact_company}`}
                    </p>
                    <p className="text-xs text-ink-secondary truncate">{lead.contact_email}</p>
                  </div>
                  <span className="text-xs text-ink-secondary hidden sm:inline">{lead.source}</span>
                  <span className="text-xs text-ink-secondary hidden sm:inline">{lead.market || "—"}</span>
                  <span onClick={(e) => e.stopPropagation()}>
                    <StatusPill
                      lead={lead}
                      isEditing={editingId === lead.id}
                      onStartEdit={setEditingId}
                      onChangeStatus={handleStatusChange}
                      onCancelEdit={() => setEditingId(null)}
                    />
                  </span>
                  <span className="text-xs text-ink-secondary w-20 text-right">{formatDate(lead.created_at)}</span>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pl-11 text-sm">
                    <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-xs mb-2">
                      {lead.contact_mobile && <div><dt className="inline text-ink-secondary">Mobile: </dt><dd className="inline">{lead.contact_mobile}</dd></div>}
                      {lead.contact_country && <div><dt className="inline text-ink-secondary">Country: </dt><dd className="inline">{lead.contact_country}</dd></div>}
                      {lead.business_type && <div><dt className="inline text-ink-secondary">Business type: </dt><dd className="inline">{lead.business_type}</dd></div>}
                      {lead.requirement && <div><dt className="inline text-ink-secondary">Enquiring about: </dt><dd className="inline">{lead.requirement}</dd></div>}
                    </dl>
                    {lead.message && (
                      <p className="text-xs whitespace-pre-wrap bg-surface-page rounded-sm p-3 mb-2">{lead.message}</p>
                    )}
                    {lead.source === "Specification Request" && <SpecificationDetail leadId={lead.id} />}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
