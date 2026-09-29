"use client";

import { ProductImageCarousel } from "@/components/site/ProductImageCarousel";
import { resolveMediaUrl } from "./media";

export interface ImageGalleryProps {
  heading?: string;
  image1?: unknown;
  image1Alt?: string;
  image2?: unknown;
  image2Alt?: string;
  image3?: unknown;
  image3Alt?: string;
}

export function ImageGallery({
  heading,
  image1,
  image1Alt,
  image2,
  image2Alt,
  image3,
  image3Alt,
}: ImageGalleryProps) {
  const images = [
    { url: resolveMediaUrl(image1), alt: image1Alt },
    { url: resolveMediaUrl(image2), alt: image2Alt },
    { url: resolveMediaUrl(image3), alt: image3Alt },
  ]
    .filter((img) => Boolean(img.url))
    .map((img) => ({ url: img.url as string, alt: img.alt || heading || "" }));

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      {heading && (
        <h2 className="mb-6 text-center text-3xl font-semibold tracking-tight text-charcoal-800">
          {heading}
        </h2>
      )}
      <div className="mx-auto max-w-md">
        <ProductImageCarousel images={images} alt={heading || "Gallery image"} />
      </div>
    </section>
  );
}
