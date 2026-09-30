"use client";

import Image from "next/image";
import { resolveMediaUrl } from "./media";

export interface ArticleCardProps {
  image?: unknown;
  title?: string;
  excerpt?: string;
  authorName?: string;
  href?: string;
}

export function ArticleCard({ image, title = "Article title", excerpt, authorName, href }: ArticleCardProps) {
  const imageUrl = resolveMediaUrl(image);

  const content = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div>
        <h3 className="text-base font-semibold text-charcoal-800 group-hover:text-sky-700">{title}</h3>
        {excerpt && <p className="mt-1 text-sm text-charcoal-500">{excerpt}</p>}
        {authorName && <p className="mt-2 text-xs font-medium text-charcoal-400">By {authorName}</p>}
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} className="group flex flex-col gap-3">
        {content}
      </a>
    );
  }

  return <div className="flex flex-col gap-3">{content}</div>;
}
