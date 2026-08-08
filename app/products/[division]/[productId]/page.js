import { notFound } from "next/navigation";
import Link from "next/link";
import { getDivision } from "../../../../lib/divisions";
import { supabaseServerSelect, supabaseServerSelectOne } from "../../../../lib/supabaseServer";
import { ProductionTypeBadge, MarketsServedBadge } from "../../../../components/ProductBadges";
import DivisionArt from "../../../../components/DivisionArt";

// Product Detail page — docs/volume-2-website-functional-requirements.md §2.8
// force-dynamic: see app/products/[division]/page.js — same fetch-caching reasoning.
export const dynamic = "force-dynamic";

async function getProduct(productId) {
  // Server-side reads use supabaseServerSelect (raw fetch) — see lib/supabaseServer.js.
  const product = await supabaseServerSelectOne("products", `select=*&id=eq.${encodeURIComponent(productId)}`);
  if (!product) return null;

  const [category, supplier] = await Promise.all([
    product.category_id
      ? supabaseServerSelectOne("categories", `select=division,subcategory&id=eq.${product.category_id}`)
      : null,
    product.supplier_id
      ? supabaseServerSelectOne("suppliers", `select=name,region,certifications&id=eq.${product.supplier_id}`)
      : null,
  ]);

  return { ...product, category, supplier };
}

export default async function ProductDetailPage({ params }) {
  const division = getDivision(params.division);
  if (!division) notFound();

  const product = await getProduct(params.productId);
  if (!product) notFound();

  return (
    <div className="max-w-content mx-auto px-4 md:px-6 py-16 md:py-20">
      <div className="grid md:grid-cols-2 gap-12">
        {product.images?.[0] ? (
          <div className="aspect-square rounded-md overflow-hidden bg-surface-page">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
        ) : (
          <DivisionArt icon={division.icon} size="lg" />
        )}

        <div>
          <Link href={`/products/${params.division}`} className="text-sm text-ink-secondary hover:text-clay">
            &larr; {division.name}
          </Link>

          <div className="flex gap-2 my-4 flex-wrap">
            <ProductionTypeBadge type={product.production_type} />
            <MarketsServedBadge markets={product.markets_served} />
          </div>

          <h1 className="text-2xl font-semibold text-graphite mb-2">{product.name}</h1>
          {product.description && <p className="text-ink-secondary mb-6">{product.description}</p>}

          <dl className="space-y-2 text-sm mb-8">
            {product.fabric_composition && (
              <Row label="Fabric" value={product.fabric_composition} />
            )}
            {product.gsm && <Row label="GSM / Weight" value={product.gsm} />}
            {product.available_sizes?.length > 0 && (
              <Row label="Sizes" value={product.available_sizes.join(", ")} />
            )}
            {product.available_colors?.length > 0 && (
              <Row label="Colors" value={product.available_colors.join(", ")} />
            )}
            {product.moq && <Row label="MOQ" value={product.moq} />}
            {product.lead_time && <Row label="Lead Time" value={product.lead_time} />}
            {product.certifications?.length > 0 && (
              <Row label="Certifications" value={product.certifications.join(", ")} />
            )}
            {product.production_type === "Partner-Sourced" && product.supplier?.name && (
              <Row label="Produced by" value={`${product.supplier.name}${product.supplier.region ? ` (${product.supplier.region})` : ""}`} />
            )}
          </dl>

          <p className="text-sm text-ink-secondary mb-6">
            Pricing is quote-per-specification — this page is a starting reference, not a fixed price list.
            Tell us your fabric, trims, artwork, measurements, styling, and quantity for an accurate quote.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/quote-request?product=${encodeURIComponent(product.name)}`}
              className="bg-clay text-white px-6 py-3 rounded-sm font-medium hover:bg-clay-dark transition-colors"
            >
              Request a Quote
            </Link>
            {product.spec_sheet_url && (
              <a
                href={product.spec_sheet_url}
                className="border border-graphite text-graphite px-6 py-3 rounded-sm font-medium hover:bg-graphite/5 transition-colors"
              >
                Download Spec Sheet
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex gap-3 py-1.5 border-b border-border">
      <dt className="text-ink-secondary w-32 shrink-0">{label}</dt>
      <dd className="text-graphite">{value}</dd>
    </div>
  );
}
