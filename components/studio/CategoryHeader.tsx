"use client";

import Image from "next/image";
import { resolveMediaUrl } from "./media";

export interface CategoryHeaderProps {
  name?: string;
  description?: string;
  heroImage?: unknown;
}

export function CategoryHeader({ name = "Category name", description, heroImage }: CategoryHeaderProps) {
  const imageUrl = resolveMediaUrl(heroImage);

  return (
    <div className="mx-auto w-full max-w-6xl px-6">
      <div className="relative aspect-[21/5] overflow-hidden rounded-2xl bg-charcoal-100">
        {imageUrl && <Image src={imageUrl} alt={name} fill className="object-cover" />}
        <div className="absolute inset-0 flex flex-col items-start justify-center bg-charcoal-950/30 px-8">
          <h2 className="text-2xl font-semibold text-white">{name}</h2>
          {description && <p className="mt-1 max-w-md text-sm text-charcoal-100">{description}</p>}
        </div>
      </div>
    </div>
  );
}
