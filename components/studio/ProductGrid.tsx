"use client";

import type { ReactNode } from "react";

export interface ProductGridProps {
  children?: ReactNode;
}

// Layout-only container — drop nto-product-card instances inside to build a
// responsive product grid for a collection.
export function ProductGrid({ children }: ProductGridProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-16">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">{children}</div>
    </div>
  );
}
