import { createClient } from "contentful-management";

const required = [
  "CONTENTFUL_SPACE_ID",
  "CONTENTFUL_MANAGEMENT_TOKEN",
];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required env var ${key}. Run via: node --env-file=.env.local lib/contentful/seed/run.mjs`);
  }
}

export const spaceId = process.env.CONTENTFUL_SPACE_ID;
export const environmentId = process.env.CONTENTFUL_ENVIRONMENT || "master";
export const locale = "en-US";

export const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

export const ctx = { spaceId, environmentId };
