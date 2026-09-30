"use client";

import type { ReactNode } from "react";

export interface ArticleGridProps {
  children?: ReactNode;
}

// Layout-only container — drop nto-article-card instances inside to build a
// responsive article grid for the Journal.
export function ArticleGrid({ children }: ArticleGridProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-16">
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">{children}</div>
    </div>
  );
}
