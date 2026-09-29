import fs from "node:fs";
import path from "node:path";
import { locale } from "./cma-client.mjs";

const MIME_TO_CONTENT_TYPE = {
  "image/jpeg": "image/jpeg",
  "image/png": "image/png",
  "image/svg+xml": "image/svg+xml",
};

function assetLink(assetId) {
  return { sys: { type: "Link", linkType: "Asset", id: assetId } };
}

// Idempotent: reuses (and re-processes/publishes) an asset if `assetId` already exists,
// so re-running the seed script doesn't create duplicate assets.
export async function uploadAsset(client, ctx, { assetId, filePath, fileName, mime, title }) {
  const contentType = mime || MIME_TO_CONTENT_TYPE[path.extname(filePath)] || "application/octet-stream";
  const fileBuffer = fs.readFileSync(filePath);

  let existing;
  try {
    existing = await client.asset.get({ ...ctx, assetId });
  } catch {
    existing = undefined;
  }
  if (existing?.fields?.file?.[locale]?.url) {
    return assetLink(assetId);
  }

  const upload = await client.upload.create(ctx, { file: fileBuffer });
  const fileField = {
    contentType,
    fileName,
    uploadFrom: { sys: { type: "Link", linkType: "Upload", id: upload.sys.id } },
  };

  let asset;
  if (existing) {
    asset = await client.asset.update(
      { ...ctx, assetId },
      {
        ...existing,
        fields: {
          title: { [locale]: title },
          file: { [locale]: fileField },
        },
      },
    );
  } else {
    asset = await client.asset.createWithId(
      { ...ctx, assetId },
      {
        fields: {
          title: { [locale]: title },
          file: { [locale]: fileField },
        },
      },
    );
  }

  asset = await client.asset.processForAllLocales(ctx, asset, { processingCheckRetries: 10 });
  await client.asset.publish({ ...ctx, assetId }, asset);
  console.log(`asset ready: ${assetId} (${fileName})`);
  return assetLink(assetId);
}
