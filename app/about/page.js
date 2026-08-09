import Image from "next/image";
import { Factory, PackageCheck, Globe2 } from "lucide-react";
import Button from "../../components/Button";

// About page — docs/volume-2-website-functional-requirements.md §2.5
// Founder letter is real content, supplied directly by the founder (Saravanakumar R.) —
// not placeholder/fabricated copy.
export const metadata = {
  title: "The Journey | Vexora Global",
  description: "A letter from our founder, Saravanakumar R., on why Vexora Global exists and where it's headed.",
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

      {/* Founder letter */}
      <section className="max-w-2xl mx-auto mb-20">
        <p className="text-clay font-medium text-sm uppercase tracking-wide mb-2">The Journey</p>
        <h1 className="text-3xl font-semibold text-graphite mb-8 leading-tight">
          Building More Than a Business — Building an Industry Platform
        </h1>

        <div className="flex items-center gap-4 mb-10">
          <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border border-border">
            <Image
              src="/images/brand/founder-photo.jpg"
              alt="Saravanakumar R."
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div>
            <p className="font-semibold text-graphite">Saravanakumar R.</p>
            <p className="text-sm text-ink-secondary">Founder &amp; Chief Executive Officer, Vexora Global</p>
          </div>
        </div>

        <div className="font-serif text-lg text-ink-secondary space-y-6 leading-relaxed">
          <p>
            Every company begins with an idea. Some begin with a product. Others begin with an opportunity.
            Vexora Global began with a question.
          </p>
          <blockquote className="border-l-2 border-clay pl-4 italic text-graphite">
            &ldquo;Why should knowledge, innovation, and opportunity in the textile industry remain
            disconnected?&rdquo;
          </blockquote>
          <p>
            For more than two decades, I have had the privilege of working across the textile and apparel
            value chain, collaborating with manufacturers, exporters, sourcing teams, product developers,
            suppliers, and customers. Throughout this journey, I witnessed the remarkable craftsmanship and
            dedication that drive our industry. I also saw recurring challenges — fragmented information,
            disconnected supply chains, manual processes, and limited access to trusted knowledge.
          </p>
          <p>
            Those experiences shaped a belief that the future of textiles would not be defined only by
            manufacturing excellence, but by the ability to connect people, knowledge, technology, and
            opportunity through a single digital ecosystem.
          </p>
          <p>That belief became the foundation of Vexora Global.</p>
          <p>
            Our vision is simple yet ambitious: to build a platform where businesses can discover solutions,
            professionals can expand their knowledge, manufacturers can reach new markets, and customers can
            make informed decisions with confidence.
          </p>
          <p>
            We believe that a company should be measured not only by the products it delivers, but also by
            the value it creates for the industry it serves. This philosophy is reflected in every
            initiative we undertake — from fashion apparel and industrial workwear to school uniforms,
            corporate solutions, textile consulting, and the Textile Academy.
          </p>
          <p>
            Technology is transforming every industry, and textiles are no exception. Artificial
            Intelligence, digital collaboration, data-driven decision-making, and continuous learning will
            shape the future of global apparel and textile businesses. Rather than viewing these changes as
            challenges, we see them as opportunities to build smarter, faster, and more sustainable
            solutions.
          </p>
          <p>
            At Vexora Global, our mission is to bridge traditional textile expertise with modern digital
            innovation. We aspire to create an ecosystem where knowledge becomes accessible, partnerships
            become stronger, and businesses of every size can grow with confidence.
          </p>
          <p>This journey is only beginning.</p>
          <p>
            Every conversation, every partnership, and every project adds another thread to a much larger
            story — a story of innovation, trust, craftsmanship, and global collaboration.
          </p>
          <p>Thank you for being part of that journey. Together, let&rsquo;s shape the future of textiles.</p>
        </div>

        <div className="mt-10 pt-8 border-t border-border">
          <p className="text-xs uppercase tracking-wide text-ink-secondary mb-1">Founder</p>
          <p className="font-semibold text-graphite">Saravanakumar R.</p>
          <p className="text-sm text-ink-secondary">Founder &amp; Chief Executive Officer, Vexora Global</p>
          <p className="text-sm text-clay italic mt-2">&ldquo;From Ideas to Impact.&rdquo;</p>
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
