"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

// Contact form — docs/volume-2-website-functional-requirements.md §2.3
// Low-friction, exploratory enquiry point. Distinct from the Specification Enquiry Form
// (Volume 3 §3.3), which is for buyers ready to request a product quote.
const COUNTRIES = ["India", "USA", "United Kingdom", "Germany", "France", "UAE", "Saudi Arabia", "Australia", "New Zealand", "Other"];
const BUSINESS_TYPES = ["Brand / Retailer", "Distributor", "School", "Corporate", "Industrial / Manufacturing", "Other"];
const REQUIREMENTS = ["Fashion Apparel", "School Uniforms", "Corporate Uniforms", "Industrial Workwear", "Technical Fabrics", "Textile Consulting", "Sourcing", "Other"];

const initialState = {
  name: "",
  company: "",
  mobile: "",
  email: "",
  country: "",
  businessType: "",
  requirement: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const e = {};
    if (form.name.trim().length < 2 || form.name.trim().length > 100) {
      e.name = "Name must be 2–100 characters.";
    }
    if (!form.mobile.trim()) e.mobile = "Mobile number is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.country) e.country = "Please select a country.";
    if (!form.businessType) e.businessType = "Please select a business type.";
    if (!form.requirement) e.requirement = "Please select what you're enquiring about.";
    if (file) {
      const okType = ["application/pdf", "image/jpeg", "image/jpg",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type);
      if (!okType) e.file = "File must be PDF, JPG, or DOCX.";
      if (file.size > 10 * 1024 * 1024) e.file = "File must be under 10 MB.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");

    try {
      let attachmentPath = null;
      if (file) {
        const path = `${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("reference-images")
          .upload(path, file);
        if (uploadError) throw uploadError;
        attachmentPath = path;
      }

      const { error: insertError } = await supabase.from("leads").insert({
        source: "Contact Form",
        market: form.country === "India" ? "Domestic" : "Export",
        division: form.requirement,
        contact_name: form.name,
        contact_company: form.company,
        contact_email: form.email,
        contact_mobile: form.mobile,
        contact_country: form.country,
        business_type: form.businessType,
        requirement: form.requirement,
        message: form.message,
        attachment_path: attachmentPath,
      });
      if (insertError) throw insertError;

      setStatus("success");
      setForm(initialState);
      setFile(null);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-status-successBg text-status-success rounded-md p-6">
        <p className="font-medium">Thanks — we've received your enquiry.</p>
        <p className="text-sm mt-1">We typically respond within 1-2 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <Field label="Name" required error={errors.name}>
        <input
          type="text"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className={inputClass(errors.name)}
        />
      </Field>

      <Field label="Company" error={errors.company}>
        <input
          type="text"
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
          className={inputClass()}
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Mobile" required error={errors.mobile}>
          <input
            type="tel"
            value={form.mobile}
            onChange={(e) => update("mobile", e.target.value)}
            className={inputClass(errors.mobile)}
          />
        </Field>
        <Field label="Email" required error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass(errors.email)}
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Country" required error={errors.country}>
          <select
            value={form.country}
            onChange={(e) => update("country", e.target.value)}
            className={inputClass(errors.country)}
          >
            <option value="">Select...</option>
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Business Type" required error={errors.businessType}>
          <select
            value={form.businessType}
            onChange={(e) => update("businessType", e.target.value)}
            className={inputClass(errors.businessType)}
          >
            <option value="">Select...</option>
            {BUSINESS_TYPES.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </Field>
      </div>

      <Field label="What are you enquiring about?" required error={errors.requirement}>
        <select
          value={form.requirement}
          onChange={(e) => update("requirement", e.target.value)}
          className={inputClass(errors.requirement)}
        >
          <option value="">Select...</option>
          {REQUIREMENTS.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </Field>

      <Field label="Message">
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={inputClass()}
        />
      </Field>

      <Field label="Attachment (optional — PDF, JPG, or DOCX, max 10 MB)" error={errors.file}>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.docx"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="text-sm"
        />
      </Field>

      {/* TODO: Cloudflare Turnstile widget goes here — tech-stack.md confirms Turnstile as the
          CAPTCHA provider, but wiring it up needs a real site key from a Cloudflare account. */}

      {status === "error" && (
        <p className="text-status-danger text-sm">
          Something went wrong submitting your enquiry. Please try again or reach us on WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-graphite text-white px-6 py-3 rounded-sm font-medium hover:bg-graphite-dark transition-colors disabled:opacity-50"
      >
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
