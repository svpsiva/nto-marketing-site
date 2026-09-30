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
  publishExperience,
} from "./experience-builder.mjs";

const EXPERIENCE_TYPE_ID = process.env.CONTENTFUL_EXPERIENCE_TYPE_ID;

function featureCard(unboundValues, dataSource, asset, { heading, body }) {
  return {
    id: genId(),
    definitionId: "nto-feature-card",
    variables: {
      image: boundVar(dataSource, asset, "file"),
      heading: unboundVar(unboundValues, heading),
      body: unboundVar(unboundValues, body),
      ...leafExtras(),
    },
    children: [],
  };
}

async function main() {
  const dataSource = {};
  const unboundValues = {};

  const heroPoster = await uploadAsset(client, ctx, {
    assetId: "asset-home-hero-poster",
    filePath: path.resolve("public/images/home/nto360-hero-poster.jpg"),
    fileName: "nto360-hero-poster.jpg",
    title: "Northern Trail Outfitters — outdoor lifestyle",
  });
  const contentOne = await uploadAsset(client, ctx, {
    assetId: "asset-home-content-one",
    filePath: path.resolve("public/images/home/content-one.jpg"),
    fileName: "content-one.jpg",
    title: "Built for the trail",
  });
  const contentTwo = await uploadAsset(client, ctx, {
    assetId: "asset-home-content-two",
    filePath: path.resolve("public/images/home/content-two.jpg"),
    fileName: "content-two.jpg",
    title: "Ride, hike, camp, repeat",
  });
  const contentThree = await uploadAsset(client, ctx, {
    assetId: "asset-home-content-three",
    filePath: path.resolve("public/images/home/content-three.jpg"),
    fileName: "content-three.jpg",
    title: "Gear that lasts",
  });
  const outfittedForFreedom = await uploadAsset(client, ctx, {
    assetId: "asset-home-outfitted-for-freedom",
    filePath: path.resolve("public/images/home/Outfitted_for_Freedom.jpg"),
    fileName: "Outfitted_for_Freedom.jpg",
    title: "Outfitted for freedom",
  });

  const heroNode = {
    id: genId(),
    definitionId: "nto-hero",
    variables: {
      heading: unboundVar(unboundValues, "Outfitted for freedom."),
      subheading: unboundVar(
        unboundValues,
        "Gear and apparel for the outdoor lifestyle — built for the trail, the summit, and everywhere beyond.",
      ),
      backgroundImage: boundVar(dataSource, heroPoster, "file"),
      primaryCtaLabel: unboundVar(unboundValues, "Shop the gear"),
      primaryCtaHref: unboundVar(unboundValues, "/gear"),
      secondaryCtaLabel: unboundVar(unboundValues, "Our story"),
      secondaryCtaHref: unboundVar(unboundValues, "/about"),
      ...leafExtras(),
    },
    children: [],
  };

  const featureGridNode = {
    id: genId(),
    definitionId: "nto-feature-grid",
    variables: {
      ...leafExtras(),
    },
    children: [
      featureCard(unboundValues, dataSource, contentOne, {
        heading: "Built for the trail",
        body: "Technical apparel and gear engineered for cold mornings, long climbs, and everything in between.",
      }),
      featureCard(unboundValues, dataSource, contentTwo, {
        heading: "Ride, hike, camp, repeat",
        body: "From singletrack to summit, NTO gear moves with you across every season and every terrain.",
      }),
      featureCard(unboundValues, dataSource, contentThree, {
        heading: "Gear that lasts",
        body: "Durable materials and considered design, made to be broken in — not broken down.",
      }),
    ],
  };

  const collectionShowcaseNode = {
    id: genId(),
    definitionId: "nto-collection-showcase",
    variables: {
      name: unboundVar(unboundValues, "Outfitted for freedom"),
      description: unboundVar(
        unboundValues,
        "Northern Trail Outfitters exists for the people who'd rather be outside. We design gear that disappears on the trail — so you can focus on the miles, the climb, and the view at the top.",
      ),
      heroImage: boundVar(dataSource, outfittedForFreedom, "file"),
      ctaLabel: unboundVar(unboundValues, "Learn more about NTO"),
      ctaHref: unboundVar(unboundValues, "/about"),
      imagePosition: unboundVar(unboundValues, "left"),
      ...leafExtras(),
    },
    children: [],
  };

  const componentTree = {
    breakpoints: BREAKPOINTS,
    schemaVersion: "2023-09-28",
    children: [
      section(heroNode, unboundValues),
      section(featureGridNode, unboundValues),
      section(collectionShowcaseNode, unboundValues, { backgroundColor: "#ededed" }),
    ],
  };

  await publishExperience(client, ctx, locale, EXPERIENCE_TYPE_ID, {
    slug: "home",
    title: "Home",
    fallbackEntryId: "layout-home",
    componentTree,
    dataSource,
    unboundValues,
  });
}

main().catch((err) => {
  console.error("Failed to create Home experience:", err.message ?? err);
  process.exit(1);
});
