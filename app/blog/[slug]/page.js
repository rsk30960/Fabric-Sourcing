import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";
import DivisionArt from "../../../components/DivisionArt";

const CATEGORY_ICONS = {
  Sourcing: "handshake",
  Manufacturing: "hardHat",
  "Buyer Guides": "lightbulb",
  Fabrics: "layers",
};

// force-dynamic: see app/products/[division]/page.js — same fetch-caching reasoning.
export const dynamic = "force-dynamic";

async function getPost(slug) {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();
    if (error) throw error;
    return data;
  } catch {
    return null;
  }
}

async function getRelatedPosts(category, excludeId) {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("id, title, slug")
      .eq("is_published", true)
      .eq("category", category)
      .neq("id", excludeId)
      .limit(3);
    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return {};
  return {
    title: post.meta_title || `${post.title} | Fabric Sourcing`,
    description: post.meta_description || undefined,
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const related = post.category ? await getRelatedPosts(post.category, post.id) : [];

  return (
    <div className="max-w-content mx-auto px-4 md:px-6 py-16 md:py-20">
      <article className="max-w-2xl mx-auto">
        <Link href="/blog" className="text-sm text-ink-secondary hover:text-clay">
          &larr; Blog
        </Link>

        <DivisionArt icon={CATEGORY_ICONS[post.category] || "bookOpen"} size="md" className="my-5" />

        {post.category && (
          <span className="inline-block text-xs font-medium text-clay bg-clay/10 px-2 py-0.5 rounded-sm mt-4">
            {post.category}
          </span>
        )}

        <h1 className="text-3xl font-semibold text-graphite mt-3 mb-2">{post.title}</h1>
        <p className="text-sm text-ink-secondary mb-8">
          {post.author}
          {post.publish_date && ` · ${new Date(post.publish_date).toLocaleDateString()}`}
        </p>

        <div className="prose prose-sm max-w-none text-ink whitespace-pre-wrap">{post.body}</div>
      </article>

      {related.length > 0 && (
        <div className="max-w-2xl mx-auto mt-16 pt-8 border-t border-border">
          <h2 className="text-lg font-semibold text-graphite mb-4">Related posts</h2>
          <ul className="space-y-2">
            {related.map((r) => (
              <li key={r.id}>
                <Link href={`/blog/${r.slug}`} className="text-clay hover:underline">
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
