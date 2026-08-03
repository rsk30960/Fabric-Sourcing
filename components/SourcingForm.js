"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

// Sourcing enquiry form — docs/volume-4-service-modules.md §4.4 (draft fields, not fully finalized).
// Distinct from the Specification Enquiry Form (Volume 3 §3.3) — this is a broader ongoing
// partnership relationship, not a one-off product quote.
export default function SourcingForm() {
  const [form, setForm] = useState({
    name: "", company: "", email: "", mobile: "", country: "",
    categoriesOfInterest: "", orderFrequency: "", targetMarkets: "", businessType: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.mobile.trim()) e.mobile = "Mobile number is required.";
    if (!form.categoriesOfInterest.trim()) e.categoriesOfInterest = "Please tell us what product categories you're interested in.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");

    const message = [
      `Product categories of interest: ${form.categoriesOfInterest}`,
      `Expected order frequency/volume: ${form.orderFrequency || "Not specified"}`,
      `Target markets: ${form.targetMarkets || "Not specified"}`,
      `Business type/scale: ${form.businessType || "Not specified"}`,
    ].join("\n");

    try {
      const { error } = await supabase.from("leads").insert({
        source: "Sourcing Enquiry",
        market: form.country === "India" ? "Domestic" : "Export",
        contact_name: form.name,
        contact_company: form.company,
        contact_email: form.email,
        contact_mobile: form.mobile,
        contact_country: form.country,
        message,
      });
      if (error) throw error;
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-status-successBg text-status-success rounded-md p-6">
        <p className="font-medium">Thanks — we've received your sourcing enquiry.</p>
        <p className="text-sm mt-1">
          If your details are clear, we'll come back with pricing and conditions directly. If we need to
          clarify anything first, we'll follow up with a few questions. Either way, expect to hear from us
          within 1-2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Name" required error={errors.name}>
          <input className={inputClass(errors.name)} value={form.name} onChange={(e) => update("name", e.target.value)} />
        </Field>
        <Field label="Company">
          <input className={inputClass()} value={form.company} onChange={(e) => update("company", e.target.value)} />
        </Field>
        <Field label="Email" required error={errors.email}>
          <input type="email" className={inputClass(errors.email)} value={form.email} onChange={(e) => update("email", e.target.value)} />
        </Field>
        <Field label="Mobile" required error={errors.mobile}>
          <input type="tel" className={inputClass(errors.mobile)} value={form.mobile} onChange={(e) => update("mobile", e.target.value)} />
        </Field>
        <Field label="Country">
          <input className={inputClass()} value={form.country} onChange={(e) => update("country", e.target.value)} />
        </Field>
        <Field label="Business type / scale">
          <input className={inputClass()} placeholder="e.g. Brand, Distributor, Retailer" value={form.businessType}
            onChange={(e) => update("businessType", e.target.value)} />
        </Field>
      </div>

      <Field label="Product categories you're interested in" required error={errors.categoriesOfInterest}>
        <textarea rows={2} className={inputClass(errors.categoriesOfInterest)} value={form.categoriesOfInterest}
          onChange={(e) => update("categoriesOfInterest", e.target.value)} />
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Expected order frequency / volume">
          <input className={inputClass()} value={form.orderFrequency} onChange={(e) => update("orderFrequency", e.target.value)} />
        </Field>
        <Field label="Target markets">
          <input className={inputClass()} value={form.targetMarkets} onChange={(e) => update("targetMarkets", e.target.value)} />
        </Field>
      </div>

      {status === "error" && (
        <p className="text-status-danger text-sm">Something went wrong. Please try again or reach us on WhatsApp.</p>
      )}

      <button type="submit" disabled={status === "submitting"}
        className="bg-clay text-white px-6 py-3 rounded-sm font-medium hover:bg-clay-dark transition-colors disabled:opacity-50">
        {status === "submitting" ? "Sending..." : "Start the Conversation"}
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
