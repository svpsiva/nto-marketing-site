import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import type { Metadata } from "next";
import { getAllProducts, getProductBySlug, getRawProductBySlug } from "@/lib/contentful/queries";
import { ProductDetail } from "@/components/site/ProductDetail";
import { ProductDetailLive } from "@/components/site/ProductDetailLive";

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
  const { isEnabled } = await draftMode();
  const product = await getProductBySlug(slug, isEnabled);
  if (!product) return {};
  return { title: product.name, description: product.tagline };
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ contentfulPreviewSecret?: string }>;
}) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const { contentfulPreviewSecret } = await searchParams;
  // Contentful Studio's embedded preview panel loads this URL in a cross-site iframe, where the
  // draftMode cookie (SameSite=Lax) never arrives — so preview mode there is signaled via a query
  // param on the "Content preview" URL instead of the /api/preview redirect + cookie.
  const preview = isEnabled || contentfulPreviewSecret?.trim() === process.env.CONTENTFUL_PREVIEW_SECRET;

  if (preview) {
    const entry = await getRawProductBySlug(slug, true);
    if (!entry) notFound();
    // Strip SDK class instances so the entry can cross the server/client boundary as a plain prop.
    const plainEntry = JSON.parse(JSON.stringify(entry));
    return <ProductDetailLive entry={plainEntry} />;
  }

  const product = await getProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
