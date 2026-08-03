"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

// Specification Enquiry Form — docs/volume-3-product-catalogue.md §3.3
// One submission, multiple line items (the confirmed "enquiry list" model). Shared contact
// fields once per submission; each product added gets its own full spec.
const COUNTRIES = ["India", "USA", "United Kingdom", "Germany", "France", "UAE", "Saudi Arabia", "Australia", "New Zealand", "Other"];

function blankLineItem(productName = "") {
  return {
    key: crypto.randomUUID(),
    productReference: productName,
    fabric: "",
    trims: "",
    artwork: "",
    measurements: "",
    styling: "",
    quantity: "",
    files: [],
  };
}

export default function SpecificationForm({ prefillProduct = "" }) {
  const [contact, setContact] = useState({ name: "", company: "", email: "", mobile: "", country: "" });
  const [items, setItems] = useState([blankLineItem(prefillProduct)]);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  function updateContact(field, value) {
    setContact((c) => ({ ...c, [field]: value }));
  }

  function updateItem(key, field, value) {
    setItems((its) => its.map((it) => (it.key === key ? { ...it, [field]: value } : it)));
  }

  function addItem() {
    setItems((its) => [...its, blankLineItem()]);
  }

  function removeItem(key) {
    setItems((its) => (its.length > 1 ? its.filter((it) => it.key !== key) : its));
  }

  function validate() {
    const e = {};
    if (contact.name.trim().length < 2) e.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) e.email = "Enter a valid email address.";
    if (!contact.mobile.trim()) e.mobile = "Mobile number is required.";
    if (!contact.country) e.country = "Please select a country.";

    items.forEach((it) => {
      if (!it.fabric.trim()) e[`fabric-${it.key}`] = "Fabric is required.";
      if (!it.measurements.trim()) e[`measurements-${it.key}`] = "Measurements are required.";
      if (!it.quantity || Number(it.quantity) <= 0) e[`quantity-${it.key}`] = "Enter a valid quantity.";
      it.files.forEach((f) => {
        if (f.size > 10 * 1024 * 1024) e[`files-${it.key}`] = "Each reference image must be under 10 MB.";
      });
    });

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");

    try {
      const { data: lead, error: leadError } = await supabase
        .from("leads")
        .insert({
          source: "Specification Request",
          market: contact.country === "India" ? "Domestic" : "Export",
          contact_name: contact.name,
          contact_company: contact.company,
          contact_email: contact.email,
          contact_mobile: contact.mobile,
          contact_country: contact.country,
        })
        .select()
        .single();
      if (leadError) throw leadError;

      const { data: specRequest, error: specError } = await supabase
        .from("specification_requests")
        .insert({
          lead_id: lead.id,
          name: contact.name,
          company: contact.company,
          email: contact.email,
          mobile: contact.mobile,
          country: contact.country,
        })
        .select()
        .single();
      if (specError) throw specError;

      for (const item of items) {
        const uploadedPaths = [];
        for (const file of item.files) {
          const path = `${Date.now()}-${file.name}`;
          const { error: uploadError } = await supabase.storage
            .from("reference-images")
            .upload(path, file);
          if (uploadError) throw uploadError;
          uploadedPaths.push(path);
        }

        const { error: lineError } = await supabase.from("specification_request_line_items").insert({
          specification_request_id: specRequest.id,
          fabric: item.fabric,
          trims: item.trims || null,
          artwork: item.artwork || null,
          measurements: item.measurements,
          styling: item.styling || null,
          quantity: Number(item.quantity),
          reference_images: uploadedPaths,
        });
        if (lineError) throw lineError;
      }

      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-status-successBg text-status-success rounded-md p-6">
        <p className="font-medium">Your specification request has been received.</p>
        <p className="text-sm mt-1">
          We review every submission personally — expect a response (a quote, or a few clarifying
          questions) within 1-2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <div>
        <h3 className="font-semibold text-graphite mb-4">Your details</h3>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Name" required error={errors.name}>
            <input className={inputClass(errors.name)} value={contact.name}
              onChange={(e) => updateContact("name", e.target.value)} />
          </Field>
          <Field label="Company">
            <input className={inputClass()} value={contact.company}
              onChange={(e) => updateContact("company", e.target.value)} />
          </Field>
          <Field label="Email" required error={errors.email}>
            <input type="email" className={inputClass(errors.email)} value={contact.email}
              onChange={(e) => updateContact("email", e.target.value)} />
          </Field>
          <Field label="Mobile" required error={errors.mobile}>
            <input type="tel" className={inputClass(errors.mobile)} value={contact.mobile}
              onChange={(e) => updateContact("mobile", e.target.value)} />
          </Field>
          <Field label="Country" required error={errors.country}>
            <select className={inputClass(errors.country)} value={contact.country}
              onChange={(e) => updateContact("country", e.target.value)}>
              <option value="">Select...</option>
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-graphite">Your enquiry list</h3>
          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center gap-1 text-sm text-clay font-medium hover:underline"
          >
            <Plus size={16} /> Add another product
          </button>
        </div>

        <div className="space-y-6">
          {items.map((item, idx) => (
            <div key={item.key} className="border border-border rounded-md p-5 bg-surface-card">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-ink-secondary">Item {idx + 1}</p>
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(item.key)}
                    className="text-status-danger hover:opacity-70"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Product / reference">
                  <input className={inputClass()} value={item.productReference}
                    onChange={(e) => updateItem(item.key, "productReference", e.target.value)} />
                </Field>
                <Field label="Fabric" required error={errors[`fabric-${item.key}`]}>
                  <input className={inputClass(errors[`fabric-${item.key}`])} value={item.fabric}
                    placeholder="e.g. 65% Poly / 35% Cotton, or 'not sure — advise'"
                    onChange={(e) => updateItem(item.key, "fabric", e.target.value)} />
                </Field>
                <Field label="Trims">
                  <input className={inputClass()} value={item.trims}
                    onChange={(e) => updateItem(item.key, "trims", e.target.value)} />
                </Field>
                <Field label="Artwork">
                  <input className={inputClass()} value={item.artwork}
                    onChange={(e) => updateItem(item.key, "artwork", e.target.value)} />
                </Field>
                <Field label="Styling">
                  <input className={inputClass()} value={item.styling}
                    onChange={(e) => updateItem(item.key, "styling", e.target.value)} />
                </Field>
                <Field label="Quantity" required error={errors[`quantity-${item.key}`]}>
                  <input type="number" min="1" className={inputClass(errors[`quantity-${item.key}`])}
                    value={item.quantity}
                    onChange={(e) => updateItem(item.key, "quantity", e.target.value)} />
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Measurements" required error={errors[`measurements-${item.key}`]}>
                  <textarea rows={2} className={inputClass(errors[`measurements-${item.key}`])}
                    value={item.measurements}
                    placeholder="Describe sizing/measurements in your own words, or attach a spec sheet as a reference image below."
                    onChange={(e) => updateItem(item.key, "measurements", e.target.value)} />
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Reference images (optional, multiple allowed, max 10 MB each)"
                  error={errors[`files-${item.key}`]}>
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    onChange={(e) => updateItem(item.key, "files", Array.from(e.target.files || []))}
                    className="text-sm"
                  />
                </Field>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TODO: Cloudflare Turnstile widget — see tech-stack.md */}

      {status === "error" && (
        <p className="text-status-danger text-sm">
          Something went wrong submitting your request. Please try again or reach us on WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-clay text-white px-6 py-3 rounded-sm font-medium hover:bg-clay-dark transition-colors disabled:opacity-50"
      >
        {status === "submitting" ? "Submitting..." : "Submit Specification Request"}
      </button>
    </form>
  );
}

function Field({ label, required, error, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-graphite mb-1.5">
        {label} {required && <span className="text-clay">*</span>}
      </span>
      {children}
      {error && <span className="block text-status-danger text-xs mt-1">{error}</span>}
    </label>
  );
}

function inputClass(error) {
  return `w-full border rounded-sm px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-graphite/30 ${
    error ? "border-status-danger" : "border-border"
  }`;
}
