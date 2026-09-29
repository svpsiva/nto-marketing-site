"use client";

import Image from "next/image";
import { resolveMediaUrl } from "./media";

export interface HeroProps {
  heading?: string;
  subheading?: string;
  backgroundImage?: unknown;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

export function Hero({
  heading = "Outfitted for freedom.",
  subheading,
  backgroundImage,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
}: HeroProps) {
  const imageUrl = resolveMediaUrl(backgroundImage);

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-charcoal-950">
      {imageUrl && (
        <Image src={imageUrl} alt="" fill priority className="object-cover opacity-80" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-charcoal-950/40" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">{heading}</h1>
        {subheading && <p className="mt-4 text-lg text-charcoal-100 sm:text-xl">{subheading}</p>}
        {(primaryCtaLabel || secondaryCtaLabel) && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {primaryCtaLabel && (
              <a
                href={primaryCtaHref || "#"}
                className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-charcoal-950 transition-colors hover:bg-sky-400"
              >
                {primaryCtaLabel}
              </a>
            )}
            {secondaryCtaLabel && (
              <a
                href={secondaryCtaHref || "#"}
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {secondaryCtaLabel}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
