import Link from "next/link";
import Image from "next/image";
import type { SiteSettings } from "@/lib/site-settings";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="bg-charcoal-950 text-charcoal-200">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-3">
          <Image src="/footer-logo.svg" alt={settings.brandName} width={100} height={35} />
          <p className="max-w-xs text-sm text-charcoal-400">{settings.tagline}</p>
        </div>

        <nav>
          <ul className="flex flex-wrap gap-6 sm:gap-8">
            {settings.footerLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm hover:text-sky-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-charcoal-800 px-6 py-4 text-xs text-charcoal-500">
        <div className="mx-auto max-w-6xl">
          &copy; {new Date().getFullYear()} {settings.brandName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
