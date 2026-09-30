import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/contentful/queries";
import { RichText } from "@/lib/richtext";

export type FieldProps = (fieldId: string) => Record<string, string> | undefined;

const noFieldProps: FieldProps = () => undefined;

export function ArticleDetail({
  article,
  fieldProps = noFieldProps,
}: {
  article: Article;
  fieldProps?: FieldProps;
}) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/journal" className="text-sm text-sky-700 hover:text-sky-800">
        ← Back to Journal
      </Link>

      <h1
        className="mt-6 text-3xl font-semibold tracking-tight text-charcoal-800 sm:text-4xl"
        {...fieldProps("title")}
      >
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

      <div className="mt-10" {...fieldProps("body")}>
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
