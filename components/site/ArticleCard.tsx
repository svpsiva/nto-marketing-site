import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/contentful/queries";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/journal/${article.slug}`} className="group flex flex-col gap-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        {article.heroImage && (
          <Image
            src={article.heroImage.url}
            alt={article.heroImage.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div>
        <h3 className="text-base font-semibold text-charcoal-800 group-hover:text-sky-700">
          {article.title}
        </h3>
        {article.excerpt && <p className="mt-1 text-sm text-charcoal-500">{article.excerpt}</p>}
        {article.author && (
          <p className="mt-2 text-xs font-medium text-charcoal-400">By {article.author.name}</p>
        )}
      </div>
    </Link>
  );
}
