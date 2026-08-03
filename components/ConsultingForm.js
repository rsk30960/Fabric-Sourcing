"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

// Textile Consulting enquiry form — docs/volume-4-service-modules.md §4.3 (resolved fields)
const ENGAGEMENT_TYPES = ["One-time audit", "Ongoing retainer", "Project-based", "Not sure yet"];

const initialState = {
  name: "", company: "", email: "", mobile: "", country: "",
  companySize: "", challenge: "", engagementType: "",
};

export default function ConsultingForm() {
  const [form, setForm] = useState(initialState);
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
    if (!form.challenge.trim()) e.challenge = "Please describe your current challenge.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");

    const message = [
      `Company size/scale: ${form.companySize || "Not specified"}`,
      `Engagement type: ${form.engagementType || "Not specified"}`,
      `Current challenge: ${form.challenge}`,
    ].join("\n");

    try {
      const { error } = await supabase.from("leads").insert({
        source: "Consulting Enquiry",
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
        <p className="font-medium">Thanks — your consulting enquiry has been received.</p>
        <p className="text-sm mt-1">We typically respond within 1-2 business days.</p>
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
        <Field label="Company size / scale">
          <input className={inputClass()} value={form.companySize} onChange={(e) => update("companySize", e.target.value)} />
        </Field>
      </div>

      <Field label="Preferred engagement type">
        <select className={inputClass()} value={form.engagementType} onChange={(e) => update("engagementType", e.target.value)}>
          <option value="">Select...</option>
          {ENGAGEMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </Field>

      <Field label="What's the current challenge you'd like help with?" required error={errors.challenge}>
        <textarea rows={4} className={inputClass(errors.challenge)} value={form.challenge}
          onChange={(e) => update("challenge", e.target.value)} />
      </Field>

      {status === "error" && (
        <p className="text-status-danger text-sm">Something went wrong. Please try again or reach us on WhatsApp.</p>
      )}

      <button type="submit" disabled={status === "submitting"}
        className="bg-graphite text-white px-6 py-3 rounded-sm font-medium hover:bg-graphite-dark transition-colors disabled:opacity-50">
        {status === "submitting" ? "Sending..." : "Send Enquiry"}
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
