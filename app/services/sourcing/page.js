import { Handshake, Factory, ShieldCheck } from "lucide-react";
import SourcingForm from "../../../components/SourcingForm";

export const metadata = {
  title: "Sourcing | Fabric Sourcing",
  description: "Our flagship service — an ongoing sourcing partnership across product categories, for domestic and export buyers.",
};

export default function SourcingPage() {
  return (
    <div className="max-w-content mx-auto px-4 md:px-6 py-16 md:py-20">
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
          <Handshake className="text-clay mb-3" size={28} />
          <h3 className="font-semibold text-graphite mb-2">A relationship, not a transaction</h3>
          <p className="text-sm text-ink-secondary">
            We're looking for buyers who want a dependable, ongoing sourcing partner — across categories,
            across seasons.
          </p>
        </div>
        <div>
          <Factory className="text-clay mb-3" size={28} />
          <h3 className="font-semibold text-graphite mb-2">Owned + partner network</h3>
          <p className="text-sm text-ink-secondary">
            Direct manufacturing where we own it, a vetted factory network everywhere else — one point of
            accountability either way.
          </p>
        </div>
        <div>
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
