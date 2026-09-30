"use client";

import type { Document } from "@contentful/rich-text-types";
import { RichText } from "@/lib/richtext";

export interface RichTextBlockProps {
  heading?: string;
  content?: string;
  compact?: boolean;
}

// `compact` drops the standalone section's max-width/padding and shrinks the
// heading, so this same component can double as a card inside a grid (e.g.
// nested in nto-feature-grid) instead of only ever rendering full-width.
export function RichTextBlock({ heading, content, compact = false }: RichTextBlockProps) {
  let document: Document | undefined;
  if (content) {
    try {
      document = JSON.parse(content) as Document;
    } catch {
      document = undefined;
    }
  }

  return (
    <section className={compact ? "w-full" : "mx-auto w-full max-w-3xl px-6 py-16"}>
      {heading && (
        <h2
          className={
            compact
              ? "mb-2 text-lg font-semibold tracking-tight text-charcoal-800"
              : "mb-6 text-3xl font-semibold tracking-tight text-charcoal-800"
          }
        >
          {heading}
        </h2>
      )}
      {document && <RichText document={document} />}
    </section>
  );
}
