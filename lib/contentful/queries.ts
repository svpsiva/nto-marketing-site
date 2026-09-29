import type { Asset } from "contentful";
import type { Document } from "@contentful/rich-text-types";
import { getContentfulClient } from "./client";
import type { NavItem, SiteSettings } from "@/lib/site-settings";

export interface Image {
  url: string;
  width?: number;
  height?: number;
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  description: Document;
  images: Image[];
  specs: Record<string, string>;
  category: "electronics" | "gear" | "women" | "men";
  featured: boolean;
  externalStoreUrl?: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description?: string;
  heroImage?: Image;
  products: Product[];
}

export interface Author {
  id: string;
  name: string;
  bio?: string;
  avatar?: Image;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  body: Document;
  heroImage?: Image;
  author?: Author;
  tags: string[];
  publishDate?: string;
}

function toImage(asset: Asset | undefined, alt: string): Image | undefined {
  const file = asset?.fields?.file;
  if (!file?.url) return undefined;
  const details = file.details as { image?: { width: number; height: number } } | undefined;
  return {
    url: `https:${file.url}`,
    width: details?.image?.width,
    height: details?.image?.height,
    alt,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toProduct(entry: any): Product {
  const f = entry.fields;
  return {
    id: entry.sys.id,
    name: f.name,
    slug: f.slug,
    tagline: f.tagline,
    description: f.description,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    images: (f.images ?? []).map((img: any) => toImage(img, f.name)).filter(Boolean),
    specs: f.specs ?? {},
    category: f.category,
    featured: Boolean(f.featured),
    externalStoreUrl: f.externalStoreUrl,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toAuthor(entry: any): Author | undefined {
  if (!entry?.fields) return undefined;
  const f = entry.fields;
  return {
    id: entry.sys.id,
    name: f.name,
    bio: f.bio,
    avatar: toImage(f.avatar, f.name),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toArticle(entry: any): Article {
  const f = entry.fields;
  return {
    id: entry.sys.id,
    title: f.title,
    slug: f.slug,
    excerpt: f.excerpt,
    body: f.body,
    heroImage: toImage(f.heroImage, f.title),
    author: toAuthor(f.author),
    tags: f.tags ?? [],
    publishDate: f.publishDate,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toCollection(entry: any): Collection {
  const f = entry.fields;
  return {
    id: entry.sys.id,
    name: f.name,
    slug: f.slug,
    description: f.description,
    heroImage: toImage(f.heroImage, f.name),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    products: (f.products ?? []).filter((p: any) => p?.fields).map(toProduct),
  };
}

export async function getAllProducts(preview = false): Promise<Product[]> {
  const client = getContentfulClient(preview);
  const res = await client.getEntries({ content_type: "product", order: ["fields.name"] });
  return res.items.map(toProduct);
}

export async function getProductBySlug(slug: string, preview = false): Promise<Product | null> {
  const client = getContentfulClient(preview);
  const res = await client.getEntries({ content_type: "product", "fields.slug": slug, limit: 1 });
  return res.items[0] ? toProduct(res.items[0]) : null;
}

export async function getAllCollections(preview = false): Promise<Collection[]> {
  const client = getContentfulClient(preview);
  const res = await client.getEntries({ content_type: "collection", include: 2, order: ["fields.name"] });
  return res.items.map(toCollection);
}

export async function getCollectionBySlug(slug: string, preview = false): Promise<Collection | null> {
  const client = getContentfulClient(preview);
  const res = await client.getEntries({
    content_type: "collection",
    "fields.slug": slug,
    include: 2,
    limit: 1,
  });
  return res.items[0] ? toCollection(res.items[0]) : null;
}

export async function getAllArticles(preview = false): Promise<Article[]> {
  const client = getContentfulClient(preview);
  const res = await client.getEntries({
    content_type: "article",
    include: 1,
    order: ["-fields.publishDate"],
  });
  return res.items.map(toArticle);
}

export async function getArticleBySlug(slug: string, preview = false): Promise<Article | null> {
  const client = getContentfulClient(preview);
  const res = await client.getEntries({
    content_type: "article",
    "fields.slug": slug,
    include: 1,
    limit: 1,
  });
  return res.items[0] ? toArticle(res.items[0]) : null;
}

export async function getSiteSettings(preview = false): Promise<SiteSettings> {
  const client = getContentfulClient(preview);
  const res = await client.getEntries({ content_type: "siteSettings", limit: 1 });
  const entry = res.items[0];
  if (!entry) {
    throw new Error("No siteSettings entry found in Contentful");
  }
  const f = entry.fields as unknown as {
    brandName: string;
    tagline?: string;
    nav?: NavItem[];
    footerLinks?: NavItem[];
  };
  return {
    brandName: f.brandName,
    tagline: f.tagline ?? "",
    nav: f.nav ?? [],
    footerLinks: f.footerLinks ?? [],
  };
}
