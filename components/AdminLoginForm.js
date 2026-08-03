"use client";

// Admin auth (Supabase Auth, email/password — Volume 7 §7.1, no MFA for v1). No self-serve
// signup — the admin account is created manually in the Supabase dashboard
// (Authentication > Users), mirroring finrise-website's pattern.

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    setSubmitting(false);
    if (signInError) {
      setError("Invalid email or password.");
      return;
    }
    router.replace("/admin/leads");
  };

  return (
    <div className="mx-auto max-w-sm px-5 py-16">
      <div className="rounded-md border border-border bg-white p-6 sm:p-8">
        <h1 className="text-lg font-medium text-graphite">Admin login</h1>
        <p className="mt-1 text-sm text-ink-secondary">Sign in to manage leads and products.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-xs text-ink-secondary">Email</label>
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full rounded-sm border border-border px-3 text-sm text-ink outline-none transition-colors focus:border-graphite focus:ring-1 focus:ring-graphite/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-ink-secondary">Password</label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 w-full rounded-sm border border-border px-3 text-sm text-ink outline-none transition-colors focus:border-graphite focus:ring-1 focus:ring-graphite/20"
            />
          </div>

          {error && <p className="text-xs text-status-danger">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center min-h-11 px-5 py-2.5 rounded-sm text-sm font-medium bg-graphite text-white hover:bg-graphite-dark transition-colors disabled:opacity-50"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
