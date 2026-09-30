"use client";

import Image from "next/image";
import { isLinkToAsset, useInMemoryEntities } from "@contentful/experiences-sdk-react";
import { resolveMediaUrl } from "./media";

export interface CategoryHeaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entry?: any;
}

export function CategoryHeader({ entry }: CategoryHeaderProps) {
  const { maybeResolveLink } = useInMemoryEntities();

  if (!entry?.fields || entry.sys?.contentType?.sys?.id !== "collection") {
    return null;
  }

  const f = entry.fields;
  const heroImageLink = f.heroImage;
  const heroImage = isLinkToAsset(heroImageLink) ? maybeResolveLink(heroImageLink) : heroImageLink;
  const imageUrl = resolveMediaUrl(heroImage?.fields?.file);

  return (
    <div className="mx-auto w-full max-w-6xl px-6">
      <div className="relative aspect-[21/5] overflow-hidden rounded-2xl bg-charcoal-100">
        {imageUrl && <Image src={imageUrl} alt={f.name} fill className="object-cover" />}
        <div className="absolute inset-0 flex flex-col items-start justify-center bg-charcoal-950/30 px-8">
          <h2 className="text-2xl font-semibold text-white">{f.name}</h2>
          {f.description && <p className="mt-1 max-w-md text-sm text-charcoal-100">{f.description}</p>}
        </div>
      </div>
    </div>
  );
}
