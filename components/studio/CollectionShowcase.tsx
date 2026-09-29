"use client";

import Image from "next/image";
import { resolveMediaUrl } from "./media";

export interface CollectionShowcaseProps {
  name?: string;
  description?: string;
  heroImage?: unknown;
  ctaLabel?: string;
  ctaHref?: string;
}

export function CollectionShowcase({
  name = "Collection name",
  description,
  heroImage,
  ctaLabel = "Shop the collection",
  ctaHref,
}: CollectionShowcaseProps) {
  const imageUrl = resolveMediaUrl(heroImage);

  return (
    <section className="relative overflow-hidden bg-charcoal-100">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 sm:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          {imageUrl && <Image src={imageUrl} alt={name} fill className="object-cover" />}
        </div>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-charcoal-800">{name}</h2>
          {description && <p className="mt-4 text-charcoal-600">{description}</p>}
          {ctaHref && (
            <a
              href={ctaHref}
              className="mt-6 inline-block text-sm font-semibold text-sky-700 hover:text-sky-800"
            >
              {ctaLabel} →
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
