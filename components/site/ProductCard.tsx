import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/contentful/queries";

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];
  return (
    <Link href={`/gear/${product.slug}`} className="group flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-charcoal-100">
        {image && (
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-charcoal-800 group-hover:text-sky-700">
          {product.name}
        </h3>
        {product.tagline && <p className="text-xs text-charcoal-500">{product.tagline}</p>}
      </div>
    </Link>
  );
}
