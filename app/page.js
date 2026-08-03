import Link from "next/link";
import { ShieldCheck, PackageSearch, FileCheck2, UserRound } from "lucide-react";
import Button from "../components/Button";
import DivisionCard from "../components/DivisionCard";
import DivisionArt from "../components/DivisionArt";

// Home page — docs/volume-2-website-functional-requirements.md §2.4
const DIVISIONS = [
  {
    label: "Fashion Apparel",
    description: "Men's, Women's, Kids — sourced through our partner factory network.",
    href: "/products/fashion-apparel",
    tag: "Partner-Sourced",
    icon: "shirt",
  },
  {
    label: "School Uniforms",
    description: "Shirts, trousers, skirts, ties, sportswear, winter wear — made to order.",
    href: "/products/school-uniforms",
    tag: "Owned Manufacturing",
    icon: "graduationCap",
  },
  {
    label: "Corporate Uniforms",
    description: "Shirts, trousers, T-shirts, blazers — made to order.",
    href: "/products/corporate-uniforms",
    tag: "Owned Manufacturing",
    icon: "briefcase",
  },
  {
    label: "Industrial Workwear",
    description: "Shirts, trousers, coveralls, hi-vis wear.",
    href: "/products/industrial-workwear",
    tag: "Owned Manufacturing",
    icon: "hardHat",
  },
  {
    label: "Technical Fabrics",
    description: "Sourced by treatment or application, fully custom to your specification.",
    href: "/products/technical-fabrics",
    tag: "Partner-Sourced",
    icon: "layers",
  },
  {
    label: "Sourcing",
    description: "Our flagship service — an ongoing sourcing partnership across product categories.",
    href: "/services/sourcing",
    tag: "Flagship Service",
    icon: "handshake",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-graphite text-white">
        <div className="max-w-content mx-auto px-4 md:px-6 py-20 md:py-28 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div>
            <p className="text-clay font-medium mb-3 text-sm uppercase tracking-wide">
              Textile &middot; Apparel &middot; Uniforms &middot; Workwear &middot; Sourcing &middot; Consulting
            </p>
            <h1 className="text-3xl md:text-5xl font-semibold max-w-2xl leading-tight">
              Your sourcing partner, built on 20 years in textiles.
            </h1>
            <p className="text-white/70 max-w-xl mt-5 text-base md:text-lg">
              Owned manufacturing for Uniforms and Industrial Workwear. A trusted partner-factory network for
              everything else. Serving domestic and export buyers from a single, accountable relationship.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button href="/quote-request" variant="accent" size="lg">
                Request a Quote
              </Button>
              <Button href="/about" variant="secondary" size="lg" className="border-white/40 text-white hover:bg-white/10">
                Meet the Founder
              </Button>
            </div>
          </div>

          {/* Icon mosaic — decorative, on-brand composition, not photography (see DivisionArt.js) */}
          <div className="hidden lg:grid grid-cols-2 gap-3">
            {["shirt", "hardHat", "graduationCap", "layers"].map((icon) => (
              <DivisionArt key={icon} icon={icon} size="sm" />
            ))}
          </div>
        </div>
      </section>

      {/* Divisions */}
      <section className="max-w-content mx-auto px-4 md:px-6 py-16 md:py-20">
        <h2 className="text-2xl font-semibold text-graphite mb-2">Explore our divisions</h2>
        <p className="text-ink-secondary mb-8 max-w-2xl">
          Every division is live from day one — browse products, or go straight to Sourcing for a broader
          partnership conversation.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DIVISIONS.map((d) => (
            <DivisionCard key={d.href} {...d} />
          ))}
        </div>
      </section>

      {/* Trust signals — structural placeholder; content (factory credentials) deferred per Volume 3 §3.4 */}
      <section className="bg-surface-card border-y border-border">
        <div className="max-w-content mx-auto px-4 md:px-6 py-16 grid md:grid-cols-3 gap-8">
          <div>
            <ShieldCheck className="text-clay mb-3" size={28} />
            <h3 className="font-semibold text-graphite mb-1">Owned manufacturing, where it counts</h3>
            <p className="text-sm text-ink-secondary">
              Uniforms and Industrial Workwear are produced in-house — not just sourced.
            </p>
          </div>
          <div>
            <PackageSearch className="text-clay mb-3" size={28} />
            <h3 className="font-semibold text-graphite mb-1">A vetted partner-factory network</h3>
            <p className="text-sm text-ink-secondary">
              Everything else runs through allied factories we work with directly — factory credentials
              available on request.
            </p>
          </div>
          <div>
            <FileCheck2 className="text-clay mb-3" size={28} />
            <h3 className="font-semibold text-graphite mb-1">Samples before you commit</h3>
            <p className="text-sm text-ink-secondary">
              A low-commitment way to test quality before placing a full order — ask us about our samples
              process.
            </p>
          </div>
        </div>
      </section>

      {/* Founder teaser */}
      <section className="max-w-content mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="bg-surface-page rounded-lg p-8 md:p-12 grid md:grid-cols-3 gap-8 items-center">
          <div className="w-32 h-32 rounded-full bg-white border border-border flex items-center justify-center mx-auto md:mx-0" aria-hidden="true">
            <UserRound size={56} className="text-ink-secondary" strokeWidth={1.5} />
          </div>
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-graphite mb-2">
              20+ years in textiles — one point of accountability
            </h2>
            <p className="text-ink-secondary mb-4">
              Fabric Sourcing is a new company, built entirely on the founder's two decades of hands-on
              textile industry experience. Read the full story, our approach to quality, and how we work
              with both domestic and export buyers.
            </p>
            <Link href="/about" className="text-clay font-medium hover:underline">
              Read the founder's story &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
