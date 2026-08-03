import { notFound } from "next/navigation";
import Link from "next/link";
import { getDivision } from "../../../lib/divisions";
import { supabase } from "../../../lib/supabaseClient";
import { ProductionTypeBadge, MarketsServedBadge } from "../../../components/ProductBadges";
import SpecificationForm from "../../../components/SpecificationForm";
import DivisionArt from "../../../components/DivisionArt";

// Division/Product listing page — docs/volume-2-website-functional-requirements.md §2.6/§2.7
// force-dynamic: this reads live product data managed via the admin portal — Next.js caches
// fetch() calls (including ones made internally by supabase-js) by default, which would
// otherwise serve stale results after a product is added/edited/published.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const division = getDivision(params.division);
  if (!division) return {};
  return {
    title: `${division.name} | Fabric Sourcing`,
    description: division.description,
  };
}

async function getProducts(divisionName) {
  // Deliberately NOT using embedded-resource select syntax (category:categories(...)) — for
  // reasons not fully understood, this installed version of @supabase/supabase-js silently
  // returns zero rows when an embed is combined with certain column-list lengths/combinations
  // (confirmed by direct A/B testing; an identical raw fetch() to the same REST endpoint always
  // returns correct data regardless). Fetching products and categories separately and joining
  // in JS sidesteps the bug entirely and is simple enough given categories is a tiny table.
  try {
    const [{ data: products, error: productsError }, { data: categories, error: categoriesError }] = await Promise.all([
      supabase
        .from("products")
        .select("id,name,sku,production_type,markets_served,available_sizes,images,category_id")
        .eq("is_published", true),
      supabase.from("categories").select("id,division,subcategory"),
    ]);
    if (productsError) throw productsError;
    if (categoriesError) throw categoriesError;

    const categoryById = new Map((categories || []).map((c) => [c.id, c]));
    return (products || [])
      .map((p) => ({ ...p, category: categoryById.get(p.category_id) || null }))
      .filter((p) => p.category?.division === divisionName);
  } catch {
    // No Supabase project connected yet, or query failed — degrade to empty state rather than crash.
    return [];
  }
}

export default async function DivisionPage({ params }) {
  const division = getDivision(params.division);
  if (!division) notFound();

  if (division.enquiryOnly) {
    return (
      <div className="max-w-content mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="max-w-2xl mb-12">
          <h1 className="text-3xl font-semibold text-graphite mb-3">{division.name}</h1>
          <p className="text-ink-secondary">{division.description}</p>
        </div>
        <div className="max-w-2xl">
          <SpecificationForm />
        </div>
      </div>
    );
  }

  const products = await getProducts(division.name);

  return (
    <div className="max-w-content mx-auto px-4 md:px-6 py-16 md:py-20">
      <div className="max-w-2xl mb-4">
        <h1 className="text-3xl font-semibold text-graphite mb-3">{division.name}</h1>
        <p className="text-ink-secondary">{division.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {division.subcategories.map((s) => (
          <span key={s} className="text-xs px-2.5 py-1 rounded-sm bg-surface-page border border-border text-ink-secondary">
            {s}
          </span>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="bg-surface-card border border-border rounded-md p-10 text-center">
          <p className="text-ink-secondary mb-4">
            Our catalogue for this division is being finalized. In the meantime, tell us what you need and
            we'll get back to you directly.
          </p>
          <Link
            href={`/quote-request?product=${encodeURIComponent(division.name)}`}
            className="inline-block bg-clay text-white px-5 py-2.5 rounded-sm text-sm font-medium hover:bg-clay-dark"
          >
            Request a Quote
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/products/${params.division}/${p.id}`}
              className="block bg-surface-card border border-border rounded-md overflow-hidden hover:border-clay hover:shadow-md transition-all"
            >
              {p.images?.[0] ? (
                <div className="aspect-[4/3] bg-surface-page">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <DivisionArt icon={division.icon} size="sm" />
              )}
              <div className="p-4">
                <div className="flex gap-2 mb-2 flex-wrap">
                  <ProductionTypeBadge type={p.production_type} />
                  <MarketsServedBadge markets={p.markets_served} />
                </div>
                <h3 className="font-medium text-graphite">{p.name}</h3>
                {p.category?.subcategory && (
                  <p className="text-xs text-ink-secondary mt-0.5">{p.category.subcategory}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
