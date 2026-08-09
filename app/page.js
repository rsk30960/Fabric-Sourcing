import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, PackageSearch, FileCheck2, UserRound } from "lucide-react";
import Button from "../components/Button";
import DivisionCard from "../components/DivisionCard";
import HeroCarousel from "../components/HeroCarousel";

// Rotates through the hero background — process/atmosphere shots only (see
// components/DivisionArt.js header comment for why these aren't documentation of our actual
// facility). Order roughly follows the fibre -> yarn -> fabric -> global story.
const HERO_CAROUSEL_IMAGES = [
  "/images/marketing/01-cotton-field-sunrise.jpg",
  "/images/marketing/02-cotton-fiber-floating.jpg",
  "/images/marketing/03-fiber-twisting-yarn.jpg",
  "/images/marketing/04-yarn-winding-cone.jpg",
  "/images/marketing/05-fabric-knitted.jpg",
  "/images/marketing/06-fabric-flowing-silk.jpg",
  "/images/marketing/13-global-shipping.jpg",
  "/images/marketing/14-ai-digital-interface.jpg",
];

// Home page — docs/volume-2-website-functional-requirements.md §2.4
const DIVISIONS = [
  {
    label: "Fashion Apparel",
    description: "Men's, Women's, Kids — sourced through our partner factory network.",
    href: "/products/fashion-apparel",
    tag: "Partner-Sourced",
    icon: "shirt",
    heroImage: "/images/marketing/12-fashion-runway.jpg",
    heroImagePosition: "object-top",
  },
  {
    label: "School Uniforms",
    description: "Shirts, trousers, skirts, ties, sportswear, winter wear — made to order.",
    href: "/products/school-uniforms",
    tag: "Owned Manufacturing",
    icon: "graduationCap",
    heroImage: "/images/marketing/09-school-uniforms.jpg",
    heroImagePosition: "object-top",
  },
  {
    label: "Corporate Uniforms",
    description: "Shirts, trousers, T-shirts, blazers — made to order.",
    href: "/products/corporate-uniforms",
    tag: "Owned Manufacturing",
    icon: "briefcase",
    heroImage: "/images/marketing/11-corporate-apparel.jpg",
    heroImagePosition: "object-top",
  },
  {
    label: "Industrial Workwear",
    description: "Shirts, trousers, coveralls, hi-vis wear.",
    href: "/products/industrial-workwear",
    tag: "Owned Manufacturing",
    icon: "hardHat",
    heroImage: "/images/marketing/10-industrial-workwear.jpg",
    heroImagePosition: "object-top",
  },
  {
    label: "Hospital Uniforms",
    description: "Doctor's coats, nurse scrubs, support staff uniforms, scrub caps.",
    href: "/products/hospital-uniforms",
    tag: "Owned Manufacturing",
    icon: "stethoscope",
    // heroImage: set once the division banner is generated
  },
  {
    label: "Technical Fabrics",
    description: "Sourced by treatment or application, fully custom to your specification.",
    href: "/products/technical-fabrics",
    tag: "Partner-Sourced",
    icon: "layers",
    heroImage: "/images/marketing/06-fabric-flowing-silk.jpg",
  },
  {
    label: "Sourcing",
    description: "Our flagship service — an ongoing sourcing partnership across product categories.",
    href: "/services/sourcing",
    tag: "Flagship Service",
    icon: "handshake",
    heroImage: "/images/marketing/03-fiber-twisting-yarn.jpg",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — AI-illustrated atmosphere shot, not documentation of our actual facility (see
          components/DivisionArt.js header comment for the reasoning behind that distinction) */}
      <section className="relative bg-graphite text-white overflow-hidden">
        <HeroCarousel images={HERO_CAROUSEL_IMAGES} />
        <div className="absolute inset-0 bg-gradient-to-r from-graphite/90 via-graphite/55 to-graphite/10 pointer-events-none" />
        <div className="relative max-w-content mx-auto px-4 md:px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-clay font-medium mb-3 text-sm uppercase tracking-wide">
              Textile &middot; Apparel &middot; Uniforms &middot; Workwear &middot; Sourcing &middot; Consulting
            </p>
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
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
            <div className="relative aspect-[4/3] rounded-md overflow-hidden mb-4">
              <Image
                src="/images/marketing/05-fabric-knitted.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
            <ShieldCheck className="text-clay mb-3" size={28} />
            <h3 className="font-semibold text-graphite mb-1">Owned manufacturing, where it counts</h3>
            <p className="text-sm text-ink-secondary">
              Uniforms and Industrial Workwear are produced in-house — not just sourced.
            </p>
          </div>
          <div>
            <div className="relative aspect-[4/3] rounded-md overflow-hidden mb-4">
              <Image
                src="/images/marketing/04-yarn-winding-cone.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
            <PackageSearch className="text-clay mb-3" size={28} />
            <h3 className="font-semibold text-graphite mb-1">A vetted partner-factory network</h3>
            <p className="text-sm text-ink-secondary">
              Everything else runs through allied factories we work with directly — factory credentials
              available on request.
            </p>
          </div>
          <div>
            <div className="relative aspect-[4/3] rounded-md overflow-hidden mb-4">
              <Image
                src="/images/marketing/08-quality-inspection.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
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
              Vexora Global is a new company, built entirely on the founder's two decades of hands-on
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
