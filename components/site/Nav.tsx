"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { SiteSettings } from "@/lib/site-settings";

export function Nav({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal-100 bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image src="/logo.svg" alt={settings.brandName} width={140} height={30} priority />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {settings.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-charcoal-600 transition-colors hover:text-sky-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center text-charcoal-600 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle menu</span>
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-charcoal-100 px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {settings.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-charcoal-600 hover:text-sky-700"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
