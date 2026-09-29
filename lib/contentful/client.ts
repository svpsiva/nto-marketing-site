import { createClient } from "contentful";

const rawSpaceId = process.env.CONTENTFUL_SPACE_ID;
const environmentId = process.env.CONTENTFUL_ENVIRONMENT || "master";

if (!rawSpaceId) {
  throw new Error("Missing CONTENTFUL_SPACE_ID");
}
const spaceId: string = rawSpaceId;

function makeClient(accessToken: string | undefined, host?: string) {
  if (!accessToken) {
    throw new Error("Missing Contentful access token");
  }
  return createClient({ space: spaceId, environment: environmentId, accessToken, host });
}

export const contentfulDelivery = makeClient(process.env.CONTENTFUL_DELIVERY_TOKEN);

export const contentfulPreview = makeClient(
  process.env.CONTENTFUL_PREVIEW_TOKEN,
  "preview.contentful.com",
);

export function getContentfulClient(preview: boolean) {
  return preview ? contentfulPreview : contentfulDelivery;
}
