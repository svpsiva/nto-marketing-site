"use client";

import Image from "next/image";
import { resolveMediaUrl } from "./media";

export interface ProductSpotlightProps {
  eyebrow?: string;
  name?: string;
  tagline?: string;
  image?: unknown;
  ctaLabel?: string;
  ctaHref?: string;
}

export function ProductSpotlight({
  eyebrow,
  name = "Product name",
  tagline,
  image,
  ctaLabel = "Shop now",
  ctaHref,
}: ProductSpotlightProps) {
  const imageUrl = resolveMediaUrl(image);

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 sm:grid-cols-2">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-charcoal-100">
        {imageUrl && <Image src={imageUrl} alt={name} fill className="object-contain" />}
      </div>
      <div>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">{eyebrow}</p>
        )}
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-charcoal-800">{name}</h2>
        {tagline && <p className="mt-4 text-charcoal-600">{tagline}</p>}
        {ctaHref && (
          <a
            href={ctaHref}
            className="mt-8 inline-block rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-charcoal-950 transition-colors hover:bg-sky-400"
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </section>
  );
}
