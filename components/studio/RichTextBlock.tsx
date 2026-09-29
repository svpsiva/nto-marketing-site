"use client";

import type { Document } from "@contentful/rich-text-types";
import { RichText } from "@/lib/richtext";

export interface RichTextBlockProps {
  heading?: string;
  content?: string;
}

export function RichTextBlock({ heading, content }: RichTextBlockProps) {
  let document: Document | undefined;
  if (content) {
    try {
      document = JSON.parse(content) as Document;
    } catch {
      document = undefined;
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      {heading && (
        <h2 className="mb-6 text-3xl font-semibold tracking-tight text-charcoal-800">{heading}</h2>
      )}
      {document && <RichText document={document} />}
    </section>
  );
}
