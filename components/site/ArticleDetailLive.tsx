"use client";

import {
  ContentfulLivePreviewProvider,
  useContentfulLiveUpdates,
  useContentfulInspectorMode,
} from "@contentful/live-preview/react";
import { toArticle } from "@/lib/contentful/mappers";
import { ArticleDetail } from "@/components/site/ArticleDetail";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LiveArticle({ entry }: { entry: any }) {
  const updatedEntry = useContentfulLiveUpdates(entry, { locale: "en-US" });
  const article = toArticle(updatedEntry);
  const getInspectorProps = useContentfulInspectorMode({ entryId: article.id });

  return <ArticleDetail article={article} fieldProps={(fieldId) => getInspectorProps({ fieldId }) ?? undefined} />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ArticleDetailLive({ entry }: { entry: any }) {
  return (
    <ContentfulLivePreviewProvider locale="en-US" enableInspectorMode enableLiveUpdates>
      <LiveArticle entry={entry} />
    </ContentfulLivePreviewProvider>
  );
}
