"use client";

import Image from "next/image";
import { resolveMediaUrl } from "./media";

export interface CTABannerProps {
  heading?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundImage?: unknown;
}

export function CTABanner({
  heading = "Ready to gear up?",
  body,
  ctaLabel = "Shop now",
  ctaHref,
  backgroundImage,
}: CTABannerProps) {
  const imageUrl = resolveMediaUrl(backgroundImage);

  return (
    <section className="relative overflow-hidden bg-charcoal-950">
      {imageUrl && (
        <Image src={imageUrl} alt="" fill className="object-cover opacity-40" />
      )}
      <div className="relative mx-auto max-w-6xl px-6 py-20 text-center text-white">
        <h2 className="text-3xl font-semibold tracking-tight">{heading}</h2>
        {body && <p className="mt-4 text-charcoal-100">{body}</p>}
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
