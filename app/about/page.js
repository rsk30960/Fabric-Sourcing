import Image from "next/image";
import { Factory, PackageCheck, Globe2, UserRound } from "lucide-react";
import Button from "../../components/Button";

// About page — docs/volume-2-website-functional-requirements.md §2.5
// Founder bio/photo copy is intentionally placeholder text, not fabricated biography —
// real content needs to come from the founder directly (Volume 1 §1.1 decision: visible founder).
export const metadata = {
  title: "About | Vexora Global",
  description:
    "A new company built on 20+ years of textile industry experience — owned manufacturing for Uniforms and Industrial Workwear, a trusted partner-factory network for everything else.",
};

export default function AboutPage() {
  return (
    <div className="max-w-content mx-auto px-4 md:px-6 py-16 md:py-20">
      <div className="relative aspect-[21/9] rounded-lg overflow-hidden mb-16">
        <Image
          src="/images/marketing/02-cotton-fiber-floating.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Founder profile */}
      <section className="grid md:grid-cols-3 gap-10 items-start mb-20">
        <div className="w-40 h-40 rounded-full bg-surface-page border border-border flex items-center justify-center mx-auto md:mx-0" aria-hidden="true">
          <UserRound size={72} className="text-ink-secondary" strokeWidth={1.5} />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-3xl font-semibold text-graphite mb-4">
            Built on 20+ years in textiles
          </h1>
          <p className="text-ink-secondary mb-4">
            [Founder bio placeholder — name, photo, and career details to be supplied. This section is the
            single most important trust signal on the site: Vexora Global is a new company with no
            corporate track record of its own, so credibility rests on the founder's two decades of
            hands-on textile industry experience, not on company history.]
          </p>
          <p className="text-ink-secondary">
            [Placeholder: specific career highlights, prior roles, industry relationships, and what led to
            starting this company — real content needed before launch.]
          </p>
        </div>
      </section>

      {/* Business model explainer */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-graphite mb-8">How we work</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="relative aspect-[4/3] rounded-md overflow-hidden mb-4">
              <Image
                src="/images/marketing/28-owned-manufacturing.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
            <Factory className="text-clay mb-3" size={28} />
            <h3 className="font-semibold text-graphite mb-2">Owned manufacturing</h3>
            <p className="text-sm text-ink-secondary">
              School &amp; Corporate Uniforms and Industrial Workwear are produced in-house — direct
              accountability for quality and timelines, for domestic and export orders alike.
            </p>
          </div>
          <div>
            <div className="relative aspect-[4/3] rounded-md overflow-hidden mb-4">
              <Image
                src="/images/marketing/29-partner-factory-network.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
            <PackageCheck className="text-clay mb-3" size={28} />
            <h3 className="font-semibold text-graphite mb-2">Partner-factory network</h3>
            <p className="text-sm text-ink-secondary">
              Fashion Apparel, Technical Fabrics, and broader Sourcing engagements run through allied
              factories we work with directly. Factory credentials available on request.
            </p>
          </div>
          <div>
            <div className="relative aspect-[4/3] rounded-md overflow-hidden mb-4">
              <Image
                src="/images/marketing/13-global-shipping.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
            <Globe2 className="text-clay mb-3" size={28} />
            <h3 className="font-semibold text-graphite mb-2">Domestic and export</h3>
            <p className="text-sm text-ink-secondary">
              Every division serves both markets. Quotes issued in INR domestically, USD by default for
              export, EUR available for EU buyers.
            </p>
          </div>
        </div>
      </section>

      {/* Samples/trial process */}
      <section className="bg-surface-card border border-border rounded-lg p-8 md:p-10 mb-20">
        <h2 className="text-xl font-semibold text-graphite mb-3">Try before you commit</h2>
        <p className="text-ink-secondary mb-6 max-w-2xl">
          New to working with us? We offer a low-commitment samples/trial-order process so you can verify
          quality before placing a full order — particularly useful if you're evaluating us for the first
          time from overseas.
        </p>
        <Button href="/contact" variant="accent">
          Ask about samples
        </Button>
      </section>

      <div className="text-center">
        <Button href="/services/sourcing" variant="accent" size="lg">
          Start a sourcing conversation
        </Button>
      </div>
    </div>
  );
}
