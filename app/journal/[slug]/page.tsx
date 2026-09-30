import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import type { Metadata } from "next";
import { getAllArticles, getArticleBySlug, getRawArticleBySlug } from "@/lib/contentful/queries";
import { ArticleDetail } from "@/components/site/ArticleDetail";
import { ArticleDetailLive } from "@/components/site/ArticleDetailLive";

export const revalidate = 3600;

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const article = await getArticleBySlug(slug, isEnabled);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ contentfulPreviewSecret?: string }>;
}) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const { contentfulPreviewSecret } = await searchParams;
  // Contentful Studio's embedded preview panel loads this URL in a cross-site iframe, where the
  // draftMode cookie (SameSite=Lax) never arrives — so preview mode there is signaled via a query
  // param on the "Content preview" URL instead of the /api/preview redirect + cookie.
  const preview = isEnabled || contentfulPreviewSecret?.trim() === process.env.CONTENTFUL_PREVIEW_SECRET;

  if (preview) {
    const entry = await getRawArticleBySlug(slug, true);
    if (!entry) notFound();
    // Strip SDK class instances so the entry can cross the server/client boundary as a plain prop.
    const plainEntry = JSON.parse(JSON.stringify(entry));
    return <ArticleDetailLive entry={plainEntry} />;
  }

  const article = await getArticleBySlug(slug);
  if (!article) notFound();
  return <ArticleDetail article={article} />;
}
