import Link from "next/link";
import type { Product } from "@/lib/contentful/queries";
import { RichText } from "@/lib/richtext";
import { ProductImageCarousel } from "@/components/site/ProductImageCarousel";

export type FieldProps = (fieldId: string) => Record<string, string> | undefined;

const noFieldProps: FieldProps = () => undefined;

export function ProductDetail({
  product,
  fieldProps = noFieldProps,
}: {
  product: Product;
  fieldProps?: FieldProps;
}) {
  const specEntries = Object.entries(product.specs);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Link href="/gear" className="text-sm text-sky-700 hover:text-sky-800">
        ← Back to Gear
      </Link>

      <div className="mt-6 grid gap-12 sm:grid-cols-2">
        <ProductImageCarousel images={product.images} alt={product.name} />

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-700" {...fieldProps("category")}>
            {product.category}
          </p>
          <h1
            className="mt-2 text-3xl font-semibold tracking-tight text-charcoal-800"
            {...fieldProps("name")}
          >
            {product.name}
          </h1>
          {product.tagline && (
            <p className="mt-2 text-lg text-charcoal-500" {...fieldProps("tagline")}>
              {product.tagline}
            </p>
          )}

          <div className="mt-6" {...fieldProps("description")}>
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
