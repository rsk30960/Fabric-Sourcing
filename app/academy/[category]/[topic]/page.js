import { notFound } from "next/navigation";
import Link from "next/link";
import { supabaseServerSelectOne } from "../../../../lib/supabaseServer";

export const dynamic = "force-dynamic";

async function getArticle(categorySlug, topicSlug) {
  const category = await supabaseServerSelectOne("academy_categories", `select=*&slug=eq.${encodeURIComponent(categorySlug)}`);
  if (!category) return { category: null, article: null };

  const article = await supabaseServerSelectOne(
    "academy_articles",
    `select=*&category_id=eq.${category.id}&slug=eq.${encodeURIComponent(topicSlug)}`
  );

  return { category, article };
}

export async function generateMetadata({ params }) {
  const { category, article } = await getArticle(params.category, params.topic);
  if (!article) return {};
  return {
    title: `${article.title} | Textile Academy | Vexora Global`,
    description: article.summary || `${article.title} — part of the ${category.name} academy category.`,
  };
}

export default async function AcademyTopicPage({ params }) {
  const { category, article } = await getArticle(params.category, params.topic);
  if (!category || !article) notFound();

  return (
    <div className="max-w-content mx-auto px-4 md:px-6 py-16 md:py-20">
      <div className="max-w-2xl mx-auto">
        <Link href={`/academy/${category.slug}`} className="text-sm text-ink-secondary hover:text-clay">
          &larr; {category.name}
        </Link>

        <h1 className="text-3xl font-semibold text-graphite mt-4 mb-4">{article.title}</h1>

        {article.is_compliance_sensitive && (
          <div className="bg-status-warningBg text-status-warning rounded-md p-4 mb-6 text-sm">
            <p className="font-medium mb-1">This topic touches real compliance/safety standards.</p>
            <p>
              Content here needs expert technical review before publishing — standards like these
              carry real safety implications if described incorrectly. Nothing on this page should
              be treated as compliance guidance until it's been reviewed.
            </p>
          </div>
        )}

        {article.status === "coming_soon" ? (
          <div className="bg-surface-card border border-dashed border-border-strong rounded-md p-10 text-center text-ink-secondary">
            <p className="font-medium text-graphite mb-1">Coming soon</p>
            <p className="text-sm">This topic hasn't been written yet — check back soon, or explore other Academy topics in the meantime.</p>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none text-ink whitespace-pre-wrap">{article.body}</div>
        )}
      </div>
    </div>
  );
}
