import Link from "next/link";
import Image from "next/image";
import { supabaseServerSelect } from "../../lib/supabaseServer";
import { ACADEMY_CATEGORY_IMAGES } from "../../lib/academyImages";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Textile Academy | Vexora Global",
  description: "Free textile and apparel education — fibres to finishing, manufacturing, workwear compliance, sourcing, and business fundamentals.",
};

async function getCategories() {
  const [categories, articles] = await Promise.all([
    supabaseServerSelect("academy_categories", "select=id,slug,name,description,sort_order"),
    supabaseServerSelect("academy_articles", "select=category_id"),
  ]);
  const counts = new Map();
  for (const a of articles) {
    counts.set(a.category_id, (counts.get(a.category_id) || 0) + 1);
  }
  return categories
    .map((c) => ({ ...c, topicCount: counts.get(c.id) || 0 }))
    .sort((a, b) => a.sort_order - b.sort_order);
}

export default async function AcademyIndexPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-content mx-auto px-4 md:px-6 py-16 md:py-20">
      <div className="relative aspect-[21/9] rounded-lg overflow-hidden mb-12">
        <Image
          src="/images/marketing/23-academy-index.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl font-semibold text-graphite mb-3">Textile Academy</h1>
        <p className="text-ink-secondary">
          Free education for buyers and industry newcomers — from fibre basics to sourcing and
          business fundamentals. Content is being built out topic by topic; some are live, others
          are marked "coming soon."
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="bg-surface-card border border-border rounded-md p-10 text-center text-ink-secondary">
          Academy structure is being finalized — check back soon.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/academy/${c.slug}`}
              className="group block bg-surface-card border border-border rounded-md overflow-hidden hover:border-clay hover:shadow-md transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={ACADEMY_CATEGORY_IMAGES[c.slug]}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-graphite mb-1">{c.name}</h3>
                <p className="text-sm text-ink-secondary mb-2">{c.description}</p>
                <p className="text-xs text-ink-secondary">{c.topicCount} topics</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
