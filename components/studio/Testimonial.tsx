"use client";

import Image from "next/image";
import { resolveMediaUrl } from "./media";

export interface TestimonialProps {
  quote?: string;
  authorName?: string;
  authorRole?: string;
  authorAvatar?: unknown;
}

export function Testimonial({ quote, authorName, authorRole, authorAvatar }: TestimonialProps) {
  const avatarUrl = resolveMediaUrl(authorAvatar);

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-20 text-center">
      {quote && (
        <blockquote className="text-2xl font-medium leading-relaxed text-charcoal-800">
          &ldquo;{quote}&rdquo;
        </blockquote>
      )}
      {(authorName || authorRole) && (
        <div className="mt-6 flex items-center justify-center gap-3">
          {avatarUrl && (
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image src={avatarUrl} alt={authorName || ""} fill className="object-cover" />
            </div>
          )}
          <div className="text-left">
            {authorName && <p className="text-sm font-semibold text-charcoal-800">{authorName}</p>}
            {authorRole && <p className="text-sm text-charcoal-500">{authorRole}</p>}
          </div>
        </div>
      )}
    </section>
  );
}
