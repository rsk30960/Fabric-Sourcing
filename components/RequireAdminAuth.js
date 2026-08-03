"use client";

// Client-side redirect guard for admin pages. The actual security boundary is enforced at
// the database layer (every admin table's RLS is scoped to the `authenticated` role, per
// supabase/migrations/0001_create_core_schema.sql) — this component only exists to bounce a
// logged-out browser to the login page before it renders admin UI, not a substitute for RLS.

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function RequireAdminAuth({ children }) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!active) return;
      if (session) {
        setAuthenticated(true);
      } else {
        router.replace("/admin/login");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setAuthenticated(true);
      } else {
        router.replace("/admin/login");
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [router]);

  if (!authenticated) {
    return (
      <div className="mx-auto max-w-content px-5 py-10 text-sm text-ink-secondary">
        Checking session…
      </div>
    );
  }

  return children;
}
