"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const DIVISIONS = [
  { label: "Fashion Apparel", href: "/products/fashion-apparel" },
  { label: "School Uniforms", href: "/products/school-uniforms" },
  { label: "Corporate Uniforms", href: "/products/corporate-uniforms" },
  { label: "Industrial Workwear", href: "/products/industrial-workwear" },
  { label: "Technical Fabrics", href: "/products/technical-fabrics" },
];

const SERVICES = [
  { label: "Textile Consulting", href: "/services/consulting" },
  { label: "Sourcing", href: "/services/sourcing" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [divisionsOpen, setDivisionsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="border-b border-border bg-surface-card sticky top-0 z-40">
      <div className="max-w-content mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        <Link href="/" className="font-semibold text-lg text-graphite">
          Fabric Sourcing
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-ink">
          <div
            className="relative"
            onMouseEnter={() => setDivisionsOpen(true)}
            onMouseLeave={() => setDivisionsOpen(false)}
          >
            <button className="hover:text-clay transition-colors">Products</button>
            {divisionsOpen && (
              <div className="absolute top-full left-0 pt-2">
                <div className="bg-surface-card border border-border rounded-md shadow-lg py-2 w-56">
                  <Link href="/catalogue" className="block px-4 py-2 font-medium hover:bg-surface-page hover:text-clay border-b border-border mb-1">
                    Full Catalogue
                  </Link>
                  {DIVISIONS.map((d) => (
                    <Link
                      key={d.href}
                      href={d.href}
                      className="block px-4 py-2 hover:bg-surface-page hover:text-clay"
                    >
                      {d.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="hover:text-clay transition-colors">Services</button>
            {servicesOpen && (
              <div className="absolute top-full left-0 pt-2">
                <div className="bg-surface-card border border-border rounded-md shadow-lg py-2 w-56">
                  {SERVICES.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block px-4 py-2 hover:bg-surface-page hover:text-clay"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/tools" className="hover:text-clay transition-colors">
            Tools
          </Link>
          <Link href="/blog" className="hover:text-clay transition-colors">
            Blog
          </Link>
          <Link href="/about" className="hover:text-clay transition-colors">
            About
          </Link>
          <Link href="/careers" className="hover:text-clay transition-colors">
            Careers
          </Link>
          <Link
            href="/contact"
            className="bg-graphite text-white px-4 py-2 rounded-sm hover:bg-graphite-dark transition-colors"
          >
            Contact
          </Link>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border px-4 py-4 flex flex-col gap-3 text-sm text-ink">
          <span className="text-ink-secondary font-medium">Products</span>
          <Link href="/catalogue" className="pl-3 font-medium" onClick={() => setMobileOpen(false)}>
            Full Catalogue
          </Link>
          {DIVISIONS.map((d) => (
            <Link key={d.href} href={d.href} className="pl-3" onClick={() => setMobileOpen(false)}>
              {d.label}
            </Link>
          ))}
          <span className="text-ink-secondary font-medium mt-2">Services</span>
          {SERVICES.map((s) => (
            <Link key={s.href} href={s.href} className="pl-3" onClick={() => setMobileOpen(false)}>
              {s.label}
            </Link>
          ))}
          <Link href="/tools" className="mt-2" onClick={() => setMobileOpen(false)}>
            Tools
          </Link>
          <Link href="/blog" onClick={() => setMobileOpen(false)}>
            Blog
          </Link>
          <Link href="/about" onClick={() => setMobileOpen(false)}>
            About
          </Link>
          <Link href="/careers" onClick={() => setMobileOpen(false)}>
            Careers
          </Link>
          <Link
            href="/contact"
            className="bg-graphite text-white px-4 py-2 rounded-sm text-center mt-2"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
