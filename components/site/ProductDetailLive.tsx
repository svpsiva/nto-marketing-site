"use client";

import {
  ContentfulLivePreviewProvider,
  useContentfulLiveUpdates,
  useContentfulInspectorMode,
} from "@contentful/live-preview/react";
import { toProduct } from "@/lib/contentful/mappers";
import { ProductDetail } from "@/components/site/ProductDetail";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LiveProduct({ entry }: { entry: any }) {
  const updatedEntry = useContentfulLiveUpdates(entry, { locale: "en-US" });
  const product = toProduct(updatedEntry);
  const getInspectorProps = useContentfulInspectorMode({ entryId: product.id });

  return <ProductDetail product={product} fieldProps={(fieldId) => getInspectorProps({ fieldId }) ?? undefined} />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProductDetailLive({ entry }: { entry: any }) {
  return (
    <ContentfulLivePreviewProvider locale="en-US" enableInspectorMode enableLiveUpdates>
      <LiveProduct entry={entry} />
    </ContentfulLivePreviewProvider>
  );
}
