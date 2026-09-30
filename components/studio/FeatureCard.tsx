"use client";

import Image from "next/image";
import { resolveMediaUrl } from "./media";

export interface FeatureCardProps {
  image?: unknown;
  heading?: string;
  body?: string;
}

// A single image + title + body card — meant to be nested inside
// nto-feature-grid's children to build a 3-column feature grid.
export function FeatureCard({ image, heading, body }: FeatureCardProps) {
  const imageUrl = resolveMediaUrl(image);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        {imageUrl && <Image src={imageUrl} alt={heading || ""} fill className="object-cover" />}
      </div>
      {heading && <h3 className="text-lg font-semibold text-charcoal-800">{heading}</h3>}
      {body && <p className="text-sm text-charcoal-500">{body}</p>}
    </div>
  );
}
