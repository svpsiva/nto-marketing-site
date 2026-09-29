import type { Metadata } from "next";
import { getAllArticles } from "@/lib/contentful/queries";
import { ArticleCard } from "@/components/site/ArticleCard";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Journal",
  description: "Stories from the trail — gear guides, ambassador notes, and field reports.",
};

export default async function JournalIndexPage() {
  const articles = await getAllArticles();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-charcoal-800">Journal</h1>
      <p className="mt-2 max-w-2xl text-charcoal-500">
        Stories from the trail, written by the people who test our gear.
      </p>

      <div className="mt-12 grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
