// Placeholder site settings, shaped to match the future Contentful `siteSettings`
// content type (see plan). Swap this for a real Contentful fetch in lib/contentful/queries.ts
// once the space is wired up — nothing that consumes `SiteSettings` should need to change.

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  nav: NavItem[];
  footerLinks: NavItem[];
}

export const siteSettings: SiteSettings = {
  brandName: "Northern Trail Outfitters",
  tagline: "Outfitted for freedom.",
  nav: [
    { label: "Gear", href: "/gear" },
    { label: "Journal", href: "/journal" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footerLinks: [
    { label: "Gear", href: "/gear" },
    { label: "Journal", href: "/journal" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};
