import { getContentfulClient } from "./client";
import type { NavItem, SiteSettings } from "@/lib/site-settings";
import { toArticle, toCollection, toProduct } from "./mappers";
import type { Article, Collection, Product } from "./mappers";

export type { Article, Author, Collection, Image, Product } from "./mappers";
export { toArticle, toProduct } from "./mappers";

export async function getAllProducts(preview = false): Promise<Product[]> {
  const client = getContentfulClient(preview);
  const res = await client.getEntries({ content_type: "product", order: ["fields.name"] });
  return res.items.map(toProduct);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getRawProductBySlug(slug: string, preview = false): Promise<any | null> {
  const client = getContentfulClient(preview);
  const res = await client.getEntries({ content_type: "product", "fields.slug": slug, limit: 1 });
  return res.items[0] ?? null;
}

export async function getProductBySlug(slug: string, preview = false): Promise<Product | null> {
  const entry = await getRawProductBySlug(slug, preview);
  return entry ? toProduct(entry) : null;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getRawArticleBySlug(slug: string, preview = false): Promise<any | null> {
  const client = getContentfulClient(preview);
  const res = await client.getEntries({
    content_type: "article",
    "fields.slug": slug,
    include: 1,
    limit: 1,
  });
  return res.items[0] ?? null;
}

export async function getArticleBySlug(slug: string, preview = false): Promise<Article | null> {
  const entry = await getRawArticleBySlug(slug, preview);
  return entry ? toArticle(entry) : null;
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
