import path from "node:path";
import { client, ctx, locale } from "./cma-client.mjs";
import { ensureContentTypes } from "./content-types.mjs";
import { uploadAsset } from "./assets.mjs";
import { loadManifest, pickLargeImages, resolveImagePath, IMAGES_ROOT } from "./manifest.mjs";
import { richText } from "./rich-text.mjs";
import { PRODUCTS, COLLECTIONS, AUTHORS, ARTICLES, SITE_SETTINGS } from "./data.mjs";

async function upsertEntry(contentTypeId, entryId, fields) {
  let existing;
  try {
    existing = await client.entry.get({ ...ctx, entryId });
  } catch {
    existing = undefined;
  }

  let entry;
  if (existing) {
    entry = await client.entry.update(
      { ...ctx, entryId },
      { ...existing, fields: { ...existing.fields, ...fields } },
    );
  } else {
    entry = await client.entry.createWithId({ ...ctx, entryId, contentTypeId }, { fields });
  }
  await client.entry.publish({ ...ctx, entryId }, entry);
  console.log(`entry ready: ${contentTypeId}/${entryId}`);
  return { sys: { type: "Link", linkType: "Entry", id: entryId } };
}

async function uploadCategoryArtAsset(assetId, relativeFile, title) {
  return uploadAsset(client, ctx, {
    assetId,
    filePath: resolveImagePath(relativeFile),
    fileName: path.basename(relativeFile),
    title,
  });
}

async function main() {
  console.log("== 1/6 content types ==");
  await ensureContentTypes(client, ctx);

  console.log("== 2/6 site settings ==");
  const logoAsset = await uploadCategoryArtAsset(
    "asset-nto-logo",
    SITE_SETTINGS.logoFile,
    "Northern Trail Outfitters logo",
  );
  await upsertEntry("siteSettings", SITE_SETTINGS.id, {
    brandName: { [locale]: SITE_SETTINGS.brandName },
    tagline: { [locale]: SITE_SETTINGS.tagline },
    logo: { [locale]: logoAsset },
    nav: { [locale]: SITE_SETTINGS.nav },
    footerLinks: { [locale]: SITE_SETTINGS.footerLinks },
  });

  console.log("== 3/6 authors ==");
  for (const author of AUTHORS) {
    const avatarAsset = await uploadCategoryArtAsset(
      `asset-${author.id}`,
      author.avatarFile,
      `${author.name} avatar`,
    );
    await upsertEntry("author", author.id, {
      name: { [locale]: author.name },
      bio: { [locale]: author.bio },
      avatar: { [locale]: avatarAsset },
    });
  }

  console.log("== 4/6 products ==");
  const manifest = loadManifest();
  const productRefs = {};
  for (const product of PRODUCTS) {
    const rows = manifest.get(product.csvGroup) || [];
    const imageRows = pickLargeImages(rows, 3);
    if (imageRows.length === 0) {
      console.warn(`  no large images found for ${product.csvGroup}, skipping images`);
    }
    const imageAssets = [];
    for (const [i, row] of imageRows.entries()) {
      const asset = await uploadAsset(client, ctx, {
        assetId: `asset-${product.id}-${i}`,
        filePath: resolveImagePath(row.localPath),
        fileName: path.basename(row.localPath),
        mime: row.mime,
        title: `${product.name} photo ${i + 1}`,
      });
      imageAssets.push(asset);
    }

    const ref = await upsertEntry("product", product.id, {
      name: { [locale]: product.name },
      slug: { [locale]: product.slug },
      tagline: { [locale]: product.tagline },
      description: { [locale]: richText(product.description) },
      images: { [locale]: imageAssets },
      specs: { [locale]: product.specs },
      category: { [locale]: product.category },
      featured: { [locale]: Boolean(product.featured) },
    });
    productRefs[product.id] = ref;
  }

  console.log("== 5/6 collections ==");
  for (const collection of COLLECTIONS) {
    const heroAsset = await uploadCategoryArtAsset(
      `asset-${collection.id}`,
      collection.heroImageFile,
      `${collection.name} hero`,
    );
    await upsertEntry("collection", collection.id, {
      name: { [locale]: collection.name },
      slug: { [locale]: collection.slug },
      description: { [locale]: collection.description },
      heroImage: { [locale]: heroAsset },
      products: { [locale]: collection.productIds.map((id) => productRefs[id]) },
    });
  }

  console.log("== 6/6 articles ==");
  for (const article of ARTICLES) {
    const heroAsset = await uploadCategoryArtAsset(
      `asset-${article.id}`,
      article.heroImageFile,
      `${article.title} hero`,
    );
    await upsertEntry("article", article.id, {
      title: { [locale]: article.title },
      slug: { [locale]: article.slug },
      excerpt: { [locale]: article.excerpt },
      body: { [locale]: richText(article.body) },
      heroImage: { [locale]: heroAsset },
      author: { [locale]: { sys: { type: "Link", linkType: "Entry", id: article.authorId } } },
      tags: { [locale]: article.tags },
      publishDate: { [locale]: article.publishDate },
    });
  }

  console.log(`\nDone. Images sourced from ${IMAGES_ROOT}`);
}

main().catch((err) => {
  console.error("Seed failed:", err.message ?? err);
  process.exit(1);
});
