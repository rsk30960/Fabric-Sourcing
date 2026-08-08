import Link from "next/link";
import { TOOLS } from "../../lib/tools";
import DivisionArt from "../../components/DivisionArt";

export const metadata = {
  title: "Digital Tools | Fabric Sourcing",
  description: "Free calculators and planning tools for textile and apparel buyers — fabric weight, consumption, costing, container loads, and more.",
};

export default function ToolsIndexPage() {
  return (
    <div className="max-w-content mx-auto px-4 md:px-6 py-16 md:py-20">
      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl font-semibold text-graphite mb-3">Digital Tools</h1>
        <p className="text-ink-secondary">
          Free calculators built for textile and apparel buyers — use them as often as you like.
          Every tool works from numbers you enter; nothing here assumes pricing, rates, or
          standards on your behalf.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TOOLS.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group block bg-surface-card border border-border rounded-md overflow-hidden hover:border-clay hover:shadow-md transition-all"
          >
            <DivisionArt icon={tool.icon} size="sm" />
            <div className="p-5">
              <h3 className="font-semibold text-graphite mb-1">{tool.name}</h3>
              <p className="text-sm text-ink-secondary">{tool.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
