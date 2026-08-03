import DivisionCard from "../../components/DivisionCard";
import CatalogueDownloadGate from "../../components/CatalogueDownloadGate";
import { DIVISIONS } from "../../lib/divisions";

// Product Catalogue index — docs/volume-2-website-functional-requirements.md §2.10
// Top-level "browse everything" hub, distinct from per-division listing pages — routes into
// them rather than re-listing every product.
export const metadata = {
  title: "Catalogue | Fabric Sourcing",
  description: "Browse our product divisions, or get the full catalogue sent to your inbox.",
};

const DIVISION_TAGS = {
  "fashion-apparel": "Partner-Sourced",
  "school-uniforms": "Owned Manufacturing",
  "corporate-uniforms": "Owned Manufacturing",
  "industrial-workwear": "Owned Manufacturing",
  "technical-fabrics": "Partner-Sourced",
};

export default function CataloguePage() {
  return (
    <div className="max-w-content mx-auto px-4 md:px-6 py-16 md:py-20">
      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl font-semibold text-graphite mb-3">Catalogue</h1>
        <p className="text-ink-secondary">
          Browse by division below, or get our full catalogue sent directly to your inbox.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {Object.entries(DIVISIONS).map(([slug, d]) => (
          <DivisionCard
            key={slug}
            label={d.name}
            description={d.description}
            href={`/products/${slug}`}
            tag={DIVISION_TAGS[slug]}
            icon={d.icon}
          />
        ))}
      </div>

      <div className="bg-surface-card border border-border rounded-lg p-8 md:p-10 text-center">
        <h2 className="text-xl font-semibold text-graphite mb-2">Get the full catalogue</h2>
        <p className="text-ink-secondary mb-6 max-w-md mx-auto">
          Leave your name and email and we'll send our complete product catalogue directly to your inbox.
        </p>
        <CatalogueDownloadGate />
      </div>
    </div>
  );
}
