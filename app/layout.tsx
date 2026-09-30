import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PreviewBanner } from "@/components/site/PreviewBanner";
import { siteSettings as fallbackSiteSettings } from "@/lib/site-settings";
import { getSiteSettings } from "@/lib/contentful/queries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${fallbackSiteSettings.brandName} | ${fallbackSiteSettings.tagline}`,
    template: `%s | ${fallbackSiteSettings.brandName}`,
  },
  description:
    "Northern Trail Outfitters — gear and apparel for the outdoor lifestyle. Outfitted for freedom.",
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/icons/apple-icon-180x180.png",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings().catch((err) => {
    console.warn("Falling back to static site settings:", err.message);
    return fallbackSiteSettings;
  });

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PreviewBanner />
        <Nav settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
