"use client";

// Admin — Product create/edit form, docs/volume-5-admin-portal.md §5.2, schema per
// docs/volume-3-product-catalogue.md §3.1. Reused for both /admin/products/new and
// /admin/products/[id].

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import { DIVISIONS } from "../lib/divisions";

function arrayToText(arr) {
  return (arr || []).join(", ");
}
function textToArray(text) {
  return text.split(",").map((s) => s.trim()).filter(Boolean);
}

export default function AdminProductForm({ productId }) {
  const router = useRouter();
  const isEditing = Boolean(productId);

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);

  const [form, setForm] = useState({
    name: "", sku: "", description: "", category_id: "", production_type: "Owned Manufacturing",
    markets_served: ["Domestic", "Export"], supplier_id: "", fabric_composition: "", gsm: "",
    available_sizes: "", available_colors: "", moq: "", lead_time: "", certifications: "",
    is_published: false, images: [], spec_sheet_url: "",
  });

  useEffect(() => {
    async function loadRefs() {
      // Sorting client-side rather than with .order() — see
      // app/products/[division]/page.js getProducts() comment for why.
      const [{ data: cats }, { data: sups }] = await Promise.all([
        supabase.from("categories").select("id,division,subcategory"),
        supabase.from("suppliers").select("id,name"),
      ]);
      setCategories((cats || []).sort((a, b) => a.division.localeCompare(b.division)));
      setSuppliers((sups || []).sort((a, b) => a.name.localeCompare(b.name)));

      // Seed categories from lib/divisions.js if the table is empty — makes it possible to
      // create the first product without a separate "manage categories" screen.
      if (!cats || cats.length === 0) {
        const seedRows = Object.values(DIVISIONS).flatMap((d) =>
          d.subcategories.length > 0
            ? d.subcategories.map((sc) => ({ division: d.name, subcategory: sc }))
            : [{ division: d.name, subcategory: "General" }]
        );
        const { data: inserted } = await supabase.from("categories").insert(seedRows).select("id,division,subcategory");
        if (inserted) setCategories(inserted);
      }
    }
    loadRefs();
  }, []);

  useEffect(() => {
    if (!isEditing) return;
    let cancelled = false;
    async function loadProduct() {
      const { data, error: fetchError } = await supabase.from("products").select("*").eq("id", productId).single();
      if (cancelled) return;
      if (fetchError || !data) {
        setError("Could not load this product.");
        setLoading(false);
        return;
      }
      setForm({
        name: data.name || "", sku: data.sku || "", description: data.description || "",
        category_id: data.category_id || "", production_type: data.production_type || "Owned Manufacturing",
        markets_served: data.markets_served || ["Domestic", "Export"], supplier_id: data.supplier_id || "",
        fabric_composition: data.fabric_composition || "", gsm: data.gsm || "",
        available_sizes: arrayToText(data.available_sizes), available_colors: arrayToText(data.available_colors),
        moq: data.moq || "", lead_time: data.lead_time || "", certifications: arrayToText(data.certifications),
        is_published: data.is_published, images: data.images || [], spec_sheet_url: data.spec_sheet_url || "",
      });
      setLoading(false);
    }
    loadProduct();
    return () => { cancelled = true; };
  }, [productId, isEditing]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function toggleMarket(market) {
    setForm((f) => ({
      ...f,
      markets_served: f.markets_served.includes(market)
        ? f.markets_served.filter((m) => m !== market)
        : [...f.markets_served, market],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.category_id) {
      setError("Name and Category are required.");
      return;
    }
    setSaving(true);
    setError(null);

    try {
      let images = form.images;
      for (const file of imageFiles) {
        const path = `${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage.from("product-images").upload(path, file);
        if (uploadError) throw uploadError;
        const { data: pub } = supabase.storage.from("product-images").getPublicUrl(path);
        images = [...images, pub.publicUrl];
      }

      const payload = {
        name: form.name,
        sku: form.sku || null,
        description: form.description || null,
        category_id: form.category_id,
        production_type: form.production_type,
        markets_served: form.markets_served,
        supplier_id: form.supplier_id || null,
        fabric_composition: form.fabric_composition || null,
        gsm: form.gsm ? Number(form.gsm) : null,
        available_sizes: textToArray(form.available_sizes),
        available_colors: textToArray(form.available_colors),
        moq: form.moq ? Number(form.moq) : null,
        lead_time: form.lead_time || null,
        certifications: textToArray(form.certifications),
        is_published: form.is_published,
        images,
      };

      if (isEditing) {
        const { error: updateError } = await supabase.from("products").update(payload).eq("id", productId);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase.from("products").insert(payload);
        if (insertError) throw insertError;
      }

      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong saving this product.");
      setSaving(false);
    }
  }

  if (loading) return <p className="text-sm text-ink-secondary px-5 py-8">Loading…</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-content mx-auto px-5 py-8 space-y-6">
      <h1 className="text-lg font-medium text-graphite">{isEditing ? "Edit product" : "New product"}</h1>

      {error && <p className="text-sm text-status-danger">{error}</p>}

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Name" required>
          <input className={inputClass()} value={form.name} onChange={(e) => update("name", e.target.value)} />
        </Field>
        <Field label="SKU">
          <input className={inputClass()} value={form.sku} onChange={(e) => update("sku", e.target.value)} />
        </Field>
        <Field label="Category" required>
          <select className={inputClass()} value={form.category_id} onChange={(e) => update("category_id", e.target.value)}>
            <option value="">Select...</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.division} — {c.subcategory}</option>
            ))}
          </select>
        </Field>
        <Field label="Production Type">
          <select className={inputClass()} value={form.production_type} onChange={(e) => update("production_type", e.target.value)}>
            <option value="Owned Manufacturing">Owned Manufacturing</option>
            <option value="Partner-Sourced">Partner-Sourced</option>
          </select>
        </Field>
        {form.production_type === "Partner-Sourced" && (
          <Field label="Partner Factory">
            <select className={inputClass()} value={form.supplier_id} onChange={(e) => update("supplier_id", e.target.value)}>
              <option value="">Select...</option>
              {suppliers.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </Field>
        )}
        <Field label="Fabric composition">
          <input className={inputClass()} placeholder="e.g. 65% Poly / 35% Cotton" value={form.fabric_composition}
            onChange={(e) => update("fabric_composition", e.target.value)} />
        </Field>
        <Field label="GSM / Weight">
          <input type="number" className={inputClass()} value={form.gsm} onChange={(e) => update("gsm", e.target.value)} />
        </Field>
        <Field label="MOQ">
          <input type="number" className={inputClass()} value={form.moq} onChange={(e) => update("moq", e.target.value)} />
        </Field>
        <Field label="Lead time">
          <input className={inputClass()} value={form.lead_time} onChange={(e) => update("lead_time", e.target.value)} />
        </Field>
        <Field label="Available sizes (comma-separated)">
          <input className={inputClass()} value={form.available_sizes} onChange={(e) => update("available_sizes", e.target.value)} />
        </Field>
        <Field label="Available colors (comma-separated)">
          <input className={inputClass()} value={form.available_colors} onChange={(e) => update("available_colors", e.target.value)} />
        </Field>
        <Field label="Certifications (comma-separated)">
          <input className={inputClass()} value={form.certifications} onChange={(e) => update("certifications", e.target.value)} />
        </Field>
      </div>

      <Field label="Markets served">
        <div className="flex gap-4">
          {["Domestic", "Export"].map((m) => (
            <label key={m} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.markets_served.includes(m)} onChange={() => toggleMarket(m)} />
              {m}
            </label>
          ))}
        </div>
      </Field>

      <Field label="Description">
        <textarea rows={3} className={inputClass()} value={form.description} onChange={(e) => update("description", e.target.value)} />
      </Field>

      <Field label="Product images">
        <input type="file" multiple accept="image/*" onChange={(e) => setImageFiles(Array.from(e.target.files || []))} className="text-sm" />
        {form.images.length > 0 && <p className="text-xs text-ink-secondary mt-1">{form.images.length} image(s) already uploaded.</p>}
      </Field>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.is_published} onChange={(e) => update("is_published", e.target.checked)} />
        Published (visible on the public site)
      </label>

      <div className="flex gap-3">
        <button type="submit" disabled={saving}
          className="bg-graphite text-white px-6 py-3 rounded-sm font-medium hover:bg-graphite-dark transition-colors disabled:opacity-50">
          {saving ? "Saving..." : isEditing ? "Save changes" : "Create product"}
        </button>
        <button type="button" onClick={() => router.push("/admin/products")}
          className="border border-border px-6 py-3 rounded-sm font-medium text-ink-secondary hover:bg-surface-page">
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-graphite mb-1.5">
        {label} {required && <span className="text-clay">*</span>}
      </span>
      {children}
    </label>
  );
}

function inputClass() {
  return "w-full border border-border rounded-sm px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-graphite/30";
}
