"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

const LINKS = [
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/tasks", label: "Tasks" },
  { href: "/admin/products", label: "Products" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  return (
    <div className="border-b border-border bg-white">
      <div className="max-w-content mx-auto px-5 flex items-center justify-between h-14">
        <div className="flex items-center gap-1">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-2 text-sm rounded-sm font-medium ${
                pathname.startsWith(l.href) ? "bg-graphite text-white" : "text-ink-secondary hover:bg-surface-page"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <button onClick={handleLogout} className="text-sm text-ink-secondary hover:text-clay">
          Log out
        </button>
      </div>
    </div>
  );
}
