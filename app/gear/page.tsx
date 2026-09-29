import Image from "next/image";
import type { Metadata } from "next";
import { getAllCollections } from "@/lib/contentful/queries";
import { ProductCard } from "@/components/site/ProductCard";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Gear",
  description: "Browse Northern Trail Outfitters gear, electronics, and apparel.",
};

export default async function GearIndexPage() {
  const collections = await getAllCollections();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-charcoal-800">Gear</h1>
      <p className="mt-2 max-w-2xl text-charcoal-500">
        Everything we make, built for the trail. Browse by collection below.
      </p>

      <div className="mt-12 flex flex-col gap-16">
        {collections.map((collection) => (
          <section key={collection.id}>
            <div className="relative mb-6 aspect-[21/5] overflow-hidden rounded-2xl bg-charcoal-100">
              {collection.heroImage && (
                <Image
                  src={collection.heroImage.url}
                  alt={collection.heroImage.alt}
                  fill
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 flex flex-col items-start justify-center bg-charcoal-950/30 px-8">
                <h2 className="text-2xl font-semibold text-white">{collection.name}</h2>
                {collection.description && (
                  <p className="mt-1 max-w-md text-sm text-charcoal-100">{collection.description}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
              {collection.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
