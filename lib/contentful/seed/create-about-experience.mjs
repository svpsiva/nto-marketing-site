import path from "node:path";
import { client, ctx, locale } from "./cma-client.mjs";
import { uploadAsset } from "./assets.mjs";
import {
  BREAKPOINTS,
  genId,
  unboundVar,
  boundVar,
  leafExtras,
  section,
  richTextParagraph,
  publishExperience,
} from "./experience-builder.mjs";

const EXPERIENCE_TYPE_ID = process.env.CONTENTFUL_EXPERIENCE_TYPE_ID;

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
      minHeight: unboundVar(unboundValues, "clamp(280px, 45vh, 500px)"),
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

  await publishExperience(client, ctx, locale, EXPERIENCE_TYPE_ID, {
    slug: "about",
    title: "About",
    fallbackEntryId: "layout-about",
    componentTree,
    dataSource,
    unboundValues,
  });
}

main().catch((err) => {
  console.error("Failed to create About experience:", err.message ?? err);
  process.exit(1);
});
