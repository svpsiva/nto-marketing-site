"use client";

import { useState, type FormEvent } from "react";

export interface NewsletterSignupProps {
  heading?: string;
  body?: string;
  placeholder?: string;
  submitLabel?: string;
}

// Presentational only until Phase 5 wires up a real /api/newsletter route.
export function NewsletterSignup({
  heading = "Stay on the trail",
  body,
  placeholder = "you@example.com",
  submitLabel = "Sign up",
}: NewsletterSignupProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="w-full bg-charcoal-100">
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-charcoal-800">{heading}</h2>
        {body && <p className="mt-4 text-charcoal-600">{body}</p>}

        {submitted ? (
          <p className="mt-6 text-sm font-semibold text-sky-700">Thanks — you&apos;re on the list.</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-wrap justify-center gap-3">
            <input
              type="email"
              required
              placeholder={placeholder}
              className="w-full max-w-sm rounded-full border border-charcoal-200 px-5 py-3 text-sm text-charcoal-800 outline-none focus:border-sky-500 sm:w-auto"
            />
            <button
              type="submit"
              className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-charcoal-950 transition-colors hover:bg-sky-400"
            >
              {submitLabel}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
