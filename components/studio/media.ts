// Media-type Experience variables resolve to either a plain URL string or an
// asset object with a `url` field — mirrors the normalization used by
// Contentful's own built-in Image component.
export function resolveMediaUrl(value: unknown): string | undefined {
  if (typeof value === "string" && value.length > 0) return value;
  if (value && typeof value === "object" && "url" in value) {
    const url = (value as { url?: unknown }).url;
    if (typeof url === "string" && url.length > 0) return url;
  }
  return undefined;
}
