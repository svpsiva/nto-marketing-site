// Media-type Experience variables resolve to either a plain URL string or an
// asset object with a `url` field — mirrors the normalization used by
// Contentful's own built-in Image component. Contentful asset URLs are
// protocol-relative ("//images.ctfassets.net/..."), which next/image rejects,
// so we always coerce to https:// before returning.
export function resolveMediaUrl(value: unknown): string | undefined {
  const raw =
    typeof value === "string" && value.length > 0
      ? value
      : value && typeof value === "object" && "url" in value
        ? (value as { url?: unknown }).url
        : undefined;

  if (typeof raw !== "string" || raw.length === 0) return undefined;
  return raw.startsWith("//") ? `https:${raw}` : raw;
}
