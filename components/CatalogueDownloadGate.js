"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

// Gated catalogue download — docs/volume-3-product-catalogue.md §3.1 (confirmed gated behind
// lead form), docs/volume-2-website-functional-requirements.md §2.10.
// No actual catalogue PDF exists yet — that's real content still to be produced. This captures
// the lead correctly regardless, so the flow works the moment a real file is uploaded.
export default function CatalogueDownloadGate() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || name.trim().length < 2) {
      setError("Please enter your name and a valid email address.");
      return;
    }
    setError("");
    setStatus("submitting");

    try {
      const { error: insertError } = await supabase.from("leads").insert({
        source: "Catalogue Download",
        contact_name: name,
        contact_email: email,
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
      <div className="bg-status-successBg text-status-success rounded-md p-6 text-center">
        <p className="font-medium">Thanks — we'll email the catalogue to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border border-border rounded-sm px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-graphite/30"
        />
        <input
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 border border-border rounded-sm px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-graphite/30"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="bg-clay text-white px-5 py-2.5 rounded-sm text-sm font-medium hover:bg-clay-dark transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {status === "submitting" ? "Sending..." : "Get the Catalogue"}
        </button>
      </div>
      {error && <p className="text-status-danger text-xs mt-2">{error}</p>}
    </form>
  );
}
