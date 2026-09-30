"use client";

export interface PageHeaderProps {
  heading?: string;
  body?: string;
}

export function PageHeader({ heading = "Page heading", body }: PageHeaderProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 pt-16">
      <h1 className="text-3xl font-semibold tracking-tight text-charcoal-800">{heading}</h1>
      {body && <p className="mt-2 max-w-2xl text-charcoal-500">{body}</p>}
    </div>
  );
}
