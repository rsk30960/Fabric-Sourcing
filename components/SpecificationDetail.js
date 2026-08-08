"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

// Shown wherever a Lead with source "Specification Request" needs its full spec displayed —
// AdminLeadsTable's inline expand and the full Lead Detail page (/admin/leads/[id]).
export default function SpecificationDetail({ leadId }) {
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
