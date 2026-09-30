"use client";

import Image from "next/image";
import { isLinkToAsset, isLinkToEntry, useInMemoryEntities } from "@contentful/experiences-sdk-react";
import { resolveMediaUrl } from "./media";

export interface ArticleCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entry?: any;
}

export function ArticleCard({ entry }: ArticleCardProps) {
  const { maybeResolveLink } = useInMemoryEntities();

  if (!entry?.fields || entry.sys?.contentType?.sys?.id !== "article") {
    return null;
  }

  const f = entry.fields;
  const heroImageLink = f.heroImage;
  const heroImage = isLinkToAsset(heroImageLink) ? maybeResolveLink(heroImageLink) : heroImageLink;
  const imageUrl = resolveMediaUrl(heroImage?.fields?.file);

  const authorLink = f.author;
  const author = isLinkToEntry(authorLink) ? maybeResolveLink(authorLink) : authorLink;
  const authorName = author?.fields?.name;

  return (
    <a href={`/journal/${f.slug}`} className="group flex flex-col gap-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={f.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div>
        <h3 className="text-base font-semibold text-charcoal-800 group-hover:text-sky-700">{f.title}</h3>
        {f.excerpt && <p className="mt-1 text-sm text-charcoal-500">{f.excerpt}</p>}
        {authorName && <p className="mt-2 text-xs font-medium text-charcoal-400">By {authorName}</p>}
      </div>
    </a>
  );
}
