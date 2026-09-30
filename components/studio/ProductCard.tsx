"use client";

import Image from "next/image";
import { isLinkToAsset, useInMemoryEntities } from "@contentful/experiences-sdk-react";
import { resolveMediaUrl } from "./media";

export interface ProductCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entry?: any;
}

export function ProductCard({ entry }: ProductCardProps) {
  const { maybeResolveLink } = useInMemoryEntities();

  if (!entry?.fields || entry.sys?.contentType?.sys?.id !== "product") {
    return null;
  }

  const f = entry.fields;
  const imageLink = f.images?.[0];
  const image = isLinkToAsset(imageLink) ? maybeResolveLink(imageLink) : imageLink;
  const imageUrl = resolveMediaUrl(image?.fields?.file);

  return (
    <a href={`/gear/${f.slug}`} className="group flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-charcoal-100">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={f.name}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-charcoal-800 group-hover:text-sky-700">{f.name}</h3>
        {f.tagline && <p className="text-xs text-charcoal-500">{f.tagline}</p>}
      </div>
    </a>
  );
}
