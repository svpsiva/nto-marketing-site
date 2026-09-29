import fs from "node:fs";
import path from "node:path";

const MANIFEST_PATH = path.resolve(
  process.cwd(),
  "nto-brand-assets/nto-images/MANIFEST-catalog-original.csv",
);
export const IMAGES_ROOT = path.resolve(process.cwd(), "nto-brand-assets/nto-images");

// Minimal CSV split — the manifest has no quoted/escaped commas in its columns.
function parseCsvLine(line) {
  return line.split(",");
}

// The catalog was reorganized after the manifest was generated: per-product
// subfolders (products/<category>/<slug>/<file>) were flattened into one
// folder per top-level category (see REORG-undo-log.tsv). Filenames kept
// their product-ID suffix, so they stay unique within the flat folder.
const FLAT_PRODUCT_FOLDER = {
  electronics: "products-electronics",
  gear: "products-gear",
  men: "products-apparel",
  women: "products-apparel",
};

export function loadManifest() {
  const raw = fs.readFileSync(MANIFEST_PATH, "utf8");
  const lines = raw.split("\n").filter(Boolean);
  const header = parseCsvLine(lines[0]);
  const groupIdx = header.indexOf("group");
  const kindIdx = header.indexOf("kind");
  const localPathIdx = header.indexOf("local_path");
  const mimeIdx = header.indexOf("mime");
  const statusIdx = header.indexOf("status");

  const byGroup = new Map();
  for (const line of lines.slice(1)) {
    const cols = parseCsvLine(line);
    if (cols[statusIdx] !== "OK") continue;
    const group = cols[groupIdx];
    const kind = cols[kindIdx];
    let localPath = cols[localPathIdx];
    if (kind === "product") {
      const topCategory = group.split("/")[0];
      const folder = FLAT_PRODUCT_FOLDER[topCategory];
      if (folder) {
        localPath = path.join(folder, path.basename(localPath));
      }
    }
    const entry = { localPath, mime: cols[mimeIdx] };
    if (!byGroup.has(group)) byGroup.set(group, []);
    byGroup.get(group).push(entry);
  }
  return byGroup;
}

// Product galleries mix swatch/small/large variants of the same shot; we only
// want the full-size "large_" files, deduped, capped to `max`.
export function pickLargeImages(rows, max = 3) {
  const large = rows.filter((row) => path.basename(row.localPath).startsWith("large_"));
  return large.slice(0, max);
}

export function resolveImagePath(localPath) {
  return path.join(IMAGES_ROOT, localPath);
}
