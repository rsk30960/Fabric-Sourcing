import Image from "next/image";
import { Handshake, Factory, ShieldCheck } from "lucide-react";
import SourcingForm from "../../../components/SourcingForm";

export const metadata = {
  title: "Sourcing | Vexora Global",
  description: "Our flagship service — an ongoing sourcing partnership across product categories, for domestic and export buyers.",
};

export default function SourcingPage() {
  return (
    <div className="max-w-content mx-auto px-4 md:px-6 py-16 md:py-20">
      <div className="relative aspect-[21/9] rounded-lg overflow-hidden mb-12">
        <Image
          src="/images/marketing/03-fiber-twisting-yarn.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="max-w-2xl mb-12">
        <p className="text-clay font-medium text-sm uppercase tracking-wide mb-2">Flagship Service</p>
        <h1 className="text-3xl font-semibold text-graphite mb-3">Sourcing</h1>
        <p className="text-ink-secondary">
          This is our primary line of business — an ongoing sourcing partnership, not a one-off product
          quote. We work with brands, distributors, and retailers across multiple product categories and
          seasons, backed by owned manufacturing in Uniforms and Industrial Workwear plus a vetted
          partner-factory network for everything else.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div>
          <div className="relative aspect-[4/3] rounded-md overflow-hidden mb-4">
            <Image
              src="/images/marketing/12-relationship-not-transaction.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </div>
          <Handshake className="text-clay mb-3" size={28} />
          <h3 className="font-semibold text-graphite mb-2">A relationship, not a transaction</h3>
          <p className="text-sm text-ink-secondary">
            We're looking for buyers who want a dependable, ongoing sourcing partner — across categories,
            across seasons.
          </p>
        </div>
        <div>
          <div className="relative aspect-[4/3] rounded-md overflow-hidden mb-4">
            <Image
              src="/images/marketing/07-garment-stitching.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </div>
          <Factory className="text-clay mb-3" size={28} />
          <h3 className="font-semibold text-graphite mb-2">Owned + partner network</h3>
          <p className="text-sm text-ink-secondary">
            Direct manufacturing where we own it, a vetted factory network everywhere else — one point of
            accountability either way.
          </p>
        </div>
        <div>
          <div className="relative aspect-[4/3] rounded-md overflow-hidden mb-4">
            <Image
              src="/images/marketing/13-samples-before-you-commit.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </div>
          <ShieldCheck className="text-clay mb-3" size={28} />
          <h3 className="font-semibold text-graphite mb-2">Samples before you commit</h3>
          <p className="text-sm text-ink-secondary">
            New relationship? Start with a low-commitment samples/trial order to verify quality first.
          </p>
        </div>
      </div>

      <div className="max-w-xl">
        <h2 className="text-xl font-semibold text-graphite mb-4">Start a conversation</h2>
        <SourcingForm />
      </div>
    </div>
  );
}
