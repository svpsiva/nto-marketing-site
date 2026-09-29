"use client";

import { useState } from "react";
import Image from "next/image";
import type { Image as ProductImage } from "@/lib/contentful/queries";

export function ProductImageCarousel({
  images,
  alt,
}: {
  images: ProductImage[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) {
    return <div className="aspect-square rounded-2xl bg-charcoal-100" />;
  }

  const goTo = (next: number) => setIndex((next + images.length) % images.length);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-charcoal-100">
        <Image
          src={images[index].url}
          alt={images[index].alt || alt}
          fill
          className="object-contain"
          priority={index === 0}
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-charcoal-700 shadow-sm transition-colors hover:bg-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-charcoal-700 shadow-sm transition-colors hover:bg-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((image, i) => (
            <button
              key={image.url}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
              className={`relative aspect-square w-16 overflow-hidden rounded-lg bg-charcoal-100 ring-2 transition-colors ${
                i === index ? "ring-sky-500" : "ring-transparent hover:ring-charcoal-200"
              }`}
            >
              <Image src={image.url} alt="" fill className="object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
