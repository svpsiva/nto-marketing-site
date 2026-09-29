import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProducts, getProductBySlug } from "@/lib/contentful/queries";
import { RichText } from "@/lib/richtext";

export const revalidate = 3600;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return { title: product.name, description: product.tagline };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const specEntries = Object.entries(product.specs);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Link href="/gear" className="text-sm text-sky-700 hover:text-sky-800">
        ← Back to Gear
      </Link>

      <div className="mt-6 grid gap-12 sm:grid-cols-2">
        <div className="flex flex-col gap-4">
          {product.images.length > 0 ? (
            product.images.map((image, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-2xl bg-charcoal-100">
                <Image src={image.url} alt={image.alt} fill className="object-contain" priority={i === 0} />
              </div>
            ))
          ) : (
            <div className="aspect-square rounded-2xl bg-charcoal-100" />
          )}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
            {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-charcoal-800">
            {product.name}
          </h1>
          {product.tagline && <p className="mt-2 text-lg text-charcoal-500">{product.tagline}</p>}

          <div className="mt-6">
            <RichText document={product.description} />
          </div>

          {specEntries.length > 0 && (
            <dl className="mt-8 grid grid-cols-1 gap-3 border-t border-charcoal-100 pt-6 sm:grid-cols-2">
              {specEntries.map(([key, value]) => (
                <div key={key}>
                  <dt className="text-xs uppercase tracking-wide text-charcoal-400">
                    {key.replace(/_/g, " ")}
                  </dt>
                  <dd className="text-sm text-charcoal-700">{value}</dd>
                </div>
              ))}
            </dl>
          )}

          {product.externalStoreUrl && (
            <a
              href={product.externalStoreUrl}
              className="mt-8 inline-block rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-charcoal-950 hover:bg-sky-400"
            >
              Shop this product
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
