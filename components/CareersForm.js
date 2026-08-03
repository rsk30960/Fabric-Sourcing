"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

// Careers application form — docs/volume-2-website-functional-requirements.md §2.12
// Freelance/contract-oriented. Submits to `candidates`, deliberately NOT `leads` (Volume 6) —
// an applicant has a completely different lifecycle from a sales enquiry.
export default function CareersForm() {
  const [form, setForm] = useState({
    name: "", email: "", mobile: "", areaOfExpertise: "", availability: "", rateExpectation: "", message: "",
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.areaOfExpertise.trim()) e.areaOfExpertise = "Please tell us your area of expertise.";
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
      let portfolioPath = null;
      if (file) {
        const path = `${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage.from("resumes").upload(path, file);
        if (uploadError) throw uploadError;
        portfolioPath = path;
      }

      const { error: insertError } = await supabase.from("candidates").insert({
        name: form.name,
        email: form.email,
        mobile: form.mobile || null,
        area_of_expertise: form.areaOfExpertise,
        availability: form.availability || null,
        rate_expectation: form.rateExpectation || null,
        message: form.message || null,
        portfolio_url: portfolioPath,
      });
      if (insertError) throw insertError;

      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-status-successBg text-status-success rounded-md p-6">
        <p className="font-medium">Thanks — your application has been received.</p>
        <p className="text-sm mt-1">We review every application personally and will reach out if there's a fit.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Name" required error={errors.name}>
          <input className={inputClass(errors.name)} value={form.name} onChange={(e) => update("name", e.target.value)} />
        </Field>
        <Field label="Email" required error={errors.email}>
          <input type="email" className={inputClass(errors.email)} value={form.email} onChange={(e) => update("email", e.target.value)} />
        </Field>
        <Field label="Mobile">
          <input type="tel" className={inputClass()} value={form.mobile} onChange={(e) => update("mobile", e.target.value)} />
        </Field>
        <Field label="Area of expertise / role" required error={errors.areaOfExpertise}>
          <input className={inputClass(errors.areaOfExpertise)} placeholder="e.g. Pattern making, Garment tech, Sourcing agent"
            value={form.areaOfExpertise} onChange={(e) => update("areaOfExpertise", e.target.value)} />
        </Field>
        <Field label="Availability">
          <input className={inputClass()} placeholder="e.g. Part-time, Project-based" value={form.availability}
            onChange={(e) => update("availability", e.target.value)} />
        </Field>
        <Field label="Rate expectation (optional)">
          <input className={inputClass()} value={form.rateExpectation} onChange={(e) => update("rateExpectation", e.target.value)} />
        </Field>
      </div>

      <Field label="Anything else you'd like to share?">
        <textarea rows={3} className={inputClass()} value={form.message} onChange={(e) => update("message", e.target.value)} />
      </Field>

      <Field label="Portfolio / Resume (PDF, JPG, or DOCX, max 10 MB)" error={errors.file}>
        <input type="file" accept=".pdf,.jpg,.jpeg,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} className="text-sm" />
      </Field>

      {status === "error" && (
        <p className="text-status-danger text-sm">Something went wrong. Please try again.</p>
      )}

      <button type="submit" disabled={status === "submitting"}
        className="bg-graphite text-white px-6 py-3 rounded-sm font-medium hover:bg-graphite-dark transition-colors disabled:opacity-50">
        {status === "submitting" ? "Submitting..." : "Submit Application"}
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
