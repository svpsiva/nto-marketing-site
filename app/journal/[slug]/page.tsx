import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllArticles, getArticleBySlug } from "@/lib/contentful/queries";
import { RichText } from "@/lib/richtext";

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
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/journal" className="text-sm text-sky-700 hover:text-sky-800">
        ← Back to Journal
      </Link>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-charcoal-800 sm:text-4xl">
        {article.title}
      </h1>

      <div className="mt-4 flex items-center gap-3">
        {article.author?.avatar && (
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image src={article.author.avatar.url} alt={article.author.avatar.alt} fill className="object-cover" />
          </div>
        )}
        <div className="text-sm text-charcoal-500">
          {article.author && <span className="font-medium text-charcoal-700">{article.author.name}</span>}
          {article.publishDate && (
            <span>
              {" "}
              ·{" "}
              {new Date(article.publishDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
        </div>
      </div>

      {article.heroImage && (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
          <Image src={article.heroImage.url} alt={article.heroImage.alt} fill priority className="object-cover" />
        </div>
      )}

      <div className="mt-10">
        <RichText document={article.body} />
      </div>

      {article.tags.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2 border-t border-charcoal-100 pt-6">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-charcoal-100 px-3 py-1 text-xs font-medium text-charcoal-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
