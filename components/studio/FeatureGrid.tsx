"use client";

import type { ReactNode } from "react";

export interface FeatureGridProps {
  heading?: string;
  children?: ReactNode;
}

// Layout-only container — drop Contentful's built-in Image/Heading/Text
// components inside to compose each card.
export function FeatureGrid({ heading, children }: FeatureGridProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      {heading && (
        <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight text-charcoal-800">
          {heading}
        </h2>
      )}
      <div className="grid gap-10 sm:grid-cols-3">{children}</div>
    </section>
  );
}
