import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import DivisionArt from "../../components/DivisionArt";

const CATEGORY_ICONS = {
  Sourcing: "handshake",
  Manufacturing: "hardHat",
  "Buyer Guides": "lightbulb",
  Fabrics: "layers",
};

// Blog / Knowledge Centre index — docs/volume-2-website-functional-requirements.md §2.11
// The primary organic-acquisition surface per Volume 1 §1.5 (zero existing referral network).
// force-dynamic: see app/products/[division]/page.js — same fetch-caching reasoning.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog / Knowledge Centre | Fabric Sourcing",
  description: "Industry knowledge and technical insight from 20+ years in textiles.",
};

async function getPosts() {
  // Sorting client-side rather than with .order() — see app/products/[division]/page.js
  // getProducts() comment; this supabase-js version has the same silent-zero-rows behavior
  // with .order() chained onto a query, not just embedded-resource selects.
  try {
    const { data, error } = await supabase.from("blogs").select("id,title,slug,category,publish_date,author").eq("is_published", true);
    if (error) throw error;
    return (data || []).sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date));
  } catch {
    return [];
  }
}

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-content mx-auto px-4 md:px-6 py-16 md:py-20">
      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl font-semibold text-graphite mb-3">Blog &amp; Knowledge Centre</h1>
        <p className="text-ink-secondary">
          Technical insight and industry knowledge from 20+ years in textiles — sourcing, manufacturing,
          and what to look for as a buyer.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="bg-surface-card border border-border rounded-md p-10 text-center text-ink-secondary">
          No posts published yet — check back soon.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block bg-surface-card border border-border rounded-md overflow-hidden hover:border-clay hover:shadow-md transition-all"
            >
              <DivisionArt icon={CATEGORY_ICONS[post.category] || "bookOpen"} size="sm" />
              <div className="p-5">
                {post.category && (
                  <span className="text-xs font-medium text-clay bg-clay/10 px-2 py-0.5 rounded-sm">
                    {post.category}
                  </span>
                )}
                <h2 className="font-semibold text-graphite mt-3 mb-1">{post.title}</h2>
                <p className="text-xs text-ink-secondary">
                  {post.author}
                  {post.publish_date && ` · ${new Date(post.publish_date).toLocaleDateString()}`}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
