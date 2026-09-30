import { Resend } from "resend";

const AUDIENCE_NAME = "NTO Newsletter";

if (!process.env.RESEND_API_KEY) {
  throw new Error(
    "Missing required env var RESEND_API_KEY. Run via: node --env-file=.env.local lib/resend/setup-audience.mjs",
  );
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Resend renamed "Audiences" to "Segments" in the API (the SDK's `audiences`
// property is a deprecated alias for the same `segments` client) — this
// script is idempotent so it's safe to re-run if RESEND_AUDIENCE_ID is lost.
async function main() {
  const { data: list, error: listError } = await resend.segments.list();
  if (listError) throw new Error(listError.message);

  const existing = list.data.find((segment) => segment.name === AUDIENCE_NAME);
  if (existing) {
    console.log(`Audience already exists: ${existing.name} (${existing.id})`);
    console.log(`Add to .env.local: RESEND_AUDIENCE_ID=${existing.id}`);
    return;
  }

  const { data: created, error: createError } = await resend.segments.create({ name: AUDIENCE_NAME });
  if (createError) throw new Error(createError.message);

  console.log(`Created audience: ${AUDIENCE_NAME} (${created.id})`);
  console.log(`Add to .env.local: RESEND_AUDIENCE_ID=${created.id}`);
}

main().catch((err) => {
  console.error("Failed to set up Resend audience:", err.message ?? err);
  process.exit(1);
});
