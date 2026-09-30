"use client";

import { useState, type FormEvent } from "react";

export interface NewsletterSignupProps {
  heading?: string;
  body?: string;
  placeholder?: string;
  submitLabel?: string;
  background?: "grey" | "white";
}

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterSignup({
  heading = "Stay on the trail",
  body,
  placeholder = "you@example.com",
  submitLabel = "Sign up",
  background = "grey",
}: NewsletterSignupProps) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const email = new FormData(form).get("email");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error();

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className={`w-full ${background === "white" ? "bg-white" : "bg-charcoal-100"}`}>
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-charcoal-800">{heading}</h2>
        {body && <p className="mt-4 text-charcoal-600">{body}</p>}

        {status === "success" ? (
          <p className="mt-6 text-sm font-semibold text-sky-700">Thanks — you&apos;re on the list.</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-wrap justify-center gap-3">
            <input
              name="email"
              type="email"
              required
              placeholder={placeholder}
              className="w-full max-w-sm rounded-full border border-charcoal-200 px-5 py-3 text-sm text-charcoal-800 outline-none focus:border-sky-500 sm:w-auto"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-charcoal-950 transition-colors hover:bg-sky-400 disabled:opacity-60"
            >
              {status === "submitting" ? "Signing up…" : submitLabel}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm font-medium text-red-600">Something went wrong. Please try again.</p>
        )}
      </div>
    </section>
  );
}
