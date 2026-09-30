import path from "node:path";
import crypto from "node:crypto";
import { client, ctx, locale } from "./cma-client.mjs";
import { uploadAsset } from "./assets.mjs";

const EXPERIENCE_TYPE_ID = process.env.CONTENTFUL_EXPERIENCE_TYPE_ID;
const ENTRY_ID = "layout-about";

const BREAKPOINTS = [
  { id: "desktop", query: "*", displayName: "Desktop", displayIcon: "desktop" },
  { id: "tablet", query: "<992px", displayName: "Tablet", displayIcon: "tablet" },
  { id: "mobile", query: "<576px", displayName: "Mobile", displayIcon: "mobile" },
];

function genKey() {
  return crypto.randomBytes(6).toString("base64url");
}

// Node `id`s must match /^[a-zA-Z0-9]{1,8}$/ — unlike UnboundValue/BoundValue
// keys, which accept any string.
function genId() {
  return crypto.randomBytes(4).toString("hex");
}

function designValue(desktopValue) {
  return { type: "DesignValue", valuesByBreakpoint: { desktop: desktopValue } };
}

function addUnbound(unboundValues, value) {
  const key = genKey();
  unboundValues[key] = value === undefined ? {} : { value };
  return key;
}

function unboundVar(unboundValues, value) {
  return { type: "UnboundValue", key: addUnbound(unboundValues, value) };
}

function boundVar(dataSource, link, fieldId) {
  const key = genKey();
  dataSource[key] = link;
  return { type: "BoundValue", path: `/${key}/fields/${fieldId}/~locale` };
}

// Mirrors the variable set Studio itself writes onto every "Section" row
// dropped on the canvas (verified against a live Studio-authored entry).
function sectionVariables(unboundValues, { maxWidth = "none", backgroundColor = "rgba(0, 0, 0, 0)" } = {}) {
  return {
    cfVerticalAlignment: designValue("center"),
    cfHorizontalAlignment: designValue("center"),
    cfVisibility: designValue(true),
    cfMargin: designValue("0 0 0 0"),
    cfPadding: designValue("0 0 0 0"),
    cfBackgroundColor: designValue(backgroundColor),
    cfWidth: designValue("100%"),
    cfHeight: designValue("fit-content"),
    cfMaxWidth: designValue(maxWidth),
    cfFlexDirection: designValue("column"),
    cfFlexReverse: designValue(false),
    cfFlexWrap: designValue("nowrap"),
    cfBorder: designValue("0px solid rgba(0, 0, 0, 0)"),
    cfGap: designValue("0px"),
    cfHyperlink: unboundVar(unboundValues, ""),
    cfOpenInNewTab: unboundVar(unboundValues, false),
    cfBorderRadius: designValue("0px"),
    cfBackgroundImageUrl: unboundVar(unboundValues, ""),
    cfBackgroundImageOptions: designValue({
      scaling: "fill",
      alignment: "left top",
      targetSize: "2000px",
    }),
  };
}

// Mirrors the extra design variables Studio appends to every dropped
// component instance, regardless of its own registered variables. We also
// force cfWidth: 100% — the SDK only gives the per-component wrapper div a
// CSS width rule when cfWidth is explicitly present, and without it the
// wrapper shrink-wraps to the component's in-flow content (ignoring e.g. an
// absolutely-positioned background image), leaving full-bleed components
// like Hero/CTABanner rendering far narrower than the section around them.
function leafExtras() {
  return {
    cfVisibility: designValue(true),
    cfMargin: designValue("0 0 0 0"),
    cfWidth: designValue("100%"),
  };
}

function section(children, unboundValues, opts) {
  return {
    id: genId(),
    definitionId: "contentful-section",
    variables: sectionVariables(unboundValues, opts),
    children: [children],
  };
}

function richTextParagraph(body) {
  return JSON.stringify({
    nodeType: "document",
    data: {},
    content: [
      {
        nodeType: "paragraph",
        data: {},
        content: [{ nodeType: "text", value: body, marks: [], data: {} }],
      },
    ],
  });
}

// A single card for the "What we stand for" grid — a compact nto-rich-text-block
// nested inside nto-feature-grid's children, so it gets the same
// cfVisibility/cfMargin every dropped component instance gets.
function featureCard(unboundValues, { title, body }) {
  return {
    id: genId(),
    definitionId: "nto-rich-text-block",
    variables: {
      heading: unboundVar(unboundValues, title),
      content: unboundVar(unboundValues, richTextParagraph(body)),
      compact: unboundVar(unboundValues, true),
      ...leafExtras(),
    },
    children: [],
  };
}

async function main() {
  const dataSource = {};
  const unboundValues = {};

  const fourCampersAsset = await uploadAsset(client, ctx, {
    assetId: "asset-about-four-campers",
    filePath: path.resolve("public/images/home/four-campers.jpg"),
    fileName: "four-campers.jpg",
    title: "Northern Trail Outfitters community around a campsite",
  });
  const twoBikersAsset = await uploadAsset(client, ctx, {
    assetId: "asset-about-two-bikers",
    filePath: path.resolve("public/images/home/two-bikers.jpg"),
    fileName: "two-bikers.jpg",
    title: "Two riders on a gravel trail",
  });

  const heroNode = {
    id: genId(),
    definitionId: "nto-hero",
    variables: {
      heading: unboundVar(unboundValues, "Our story"),
      subheading: unboundVar(
        unboundValues,
        "Northern Trail Outfitters started with a simple idea: gear should earn its place in your pack by working, not by looking good on a shelf.",
      ),
      backgroundImage: boundVar(dataSource, fourCampersAsset, "file"),
      minHeight: unboundVar(unboundValues, "45vh"),
      ...leafExtras(),
    },
    children: [],
  };

  const collectionShowcaseNode = {
    id: genId(),
    definitionId: "nto-collection-showcase",
    variables: {
      name: unboundVar(unboundValues, "From one trailhead to every trail"),
      description: unboundVar(
        unboundValues,
        "NTO began as a small crew of hikers, riders, and campers who were tired of choosing between gear that performed and gear that lasted — so we started building our own, tested on real trails by the people who'd actually wear it. That same crew, now a network of ambassadors sharing routes and reviews in the Journal, still shapes everything we make.",
      ),
      heroImage: boundVar(dataSource, twoBikersAsset, "file"),
      ctaLabel: unboundVar(unboundValues, "Read stories from the trail"),
      ctaHref: unboundVar(unboundValues, "/journal"),
      imagePosition: unboundVar(unboundValues, "right"),
      ...leafExtras(),
    },
    children: [],
  };

  const featureGridNode = {
    id: genId(),
    definitionId: "nto-feature-grid",
    variables: {
      heading: unboundVar(unboundValues, "What we stand for"),
      ...leafExtras(),
    },
    children: [
      featureCard(unboundValues, {
        title: "Trail-tested, not lab-tested",
        body: "Every piece of gear we sell has logged real miles with the people who design it, before it ever reaches a shelf.",
      }),
      featureCard(unboundValues, {
        title: "Built for the long haul",
        body: "We design for durability first — gear that gets better with wear, not gear you replace every season.",
      }),
      featureCard(unboundValues, {
        title: "A community, not a catalog",
        body: "Our ambassadors and the Journal exist because the best gear recommendations come from people who actually use it.",
      }),
    ],
  };

  const ctaBannerNode = {
    id: genId(),
    definitionId: "nto-cta-banner",
    variables: {
      heading: unboundVar(unboundValues, "Ready to gear up?"),
      body: unboundVar(unboundValues, "Browse the collections our ambassadors helped shape."),
      ctaLabel: unboundVar(unboundValues, "Shop the gear"),
      ctaHref: unboundVar(unboundValues, "/gear"),
      dark: unboundVar(unboundValues, false),
      ...leafExtras(),
    },
    children: [],
  };

  const componentTree = {
    breakpoints: BREAKPOINTS,
    schemaVersion: "2023-09-28",
    children: [
      section(heroNode, unboundValues),
      section(collectionShowcaseNode, unboundValues),
      section(featureGridNode, unboundValues, { backgroundColor: "#ededed" }),
      section(ctaBannerNode, unboundValues),
    ],
  };

  const fields = {
    title: { [locale]: "About" },
    slug: { [locale]: "about" },
    componentTree: { [locale]: componentTree },
    dataSource: { [locale]: dataSource },
    unboundValues: { [locale]: unboundValues },
  };

  let existing;
  try {
    existing = await client.entry.get({ ...ctx, entryId: ENTRY_ID });
  } catch {
    existing = undefined;
  }

  let entry;
  if (existing) {
    entry = await client.entry.update({ ...ctx, entryId: ENTRY_ID }, { ...existing, fields });
  } else {
    entry = await client.entry.createWithId(
      { ...ctx, entryId: ENTRY_ID, contentTypeId: EXPERIENCE_TYPE_ID },
      { fields },
    );
  }
  await client.entry.publish({ ...ctx, entryId: ENTRY_ID }, entry);
  console.log(`Experience ready: ${EXPERIENCE_TYPE_ID}/${ENTRY_ID} (slug: about)`);
}

main().catch((err) => {
  console.error("Failed to create About experience:", err.message ?? err);
  process.exit(1);
});
