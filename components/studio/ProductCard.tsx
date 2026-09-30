"use client";

import Image from "next/image";
import { resolveMediaUrl } from "./media";

export interface ProductCardProps {
  image?: unknown;
  name?: string;
  tagline?: string;
  href?: string;
}

export function ProductCard({ image, name = "Product name", tagline, href }: ProductCardProps) {
  const imageUrl = resolveMediaUrl(image);

  const content = (
    <>
      <div className="relative aspect-square overflow-hidden rounded-xl bg-charcoal-100">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-charcoal-800 group-hover:text-sky-700">{name}</h3>
        {tagline && <p className="text-xs text-charcoal-500">{tagline}</p>}
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
