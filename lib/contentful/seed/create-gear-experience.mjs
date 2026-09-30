import { client, ctx, locale } from "./cma-client.mjs";
import { COLLECTIONS, PRODUCTS } from "./data.mjs";
import {
  BREAKPOINTS,
  genId,
  unboundVar,
  boundEntry,
  leafExtras,
  section,
  publishExperience,
} from "./experience-builder.mjs";

const EXPERIENCE_TYPE_ID = process.env.CONTENTFUL_EXPERIENCE_TYPE_ID;

function entryLink(entryId) {
  return { sys: { type: "Link", linkType: "Entry", id: entryId } };
}

function productCard(dataSource, product) {
  return {
    id: genId(),
    definitionId: "nto-product-card",
    variables: {
      entry: boundEntry(dataSource, entryLink(product.id)),
      ...leafExtras(),
    },
    children: [],
  };
}

async function main() {
  const dataSource = {};
  const unboundValues = {};

  const pageHeaderNode = {
    id: genId(),
    definitionId: "nto-page-header",
    variables: {
      heading: unboundVar(unboundValues, "Gear"),
      body: unboundVar(unboundValues, "Everything we make, built for the trail. Browse by collection below."),
      ...leafExtras(),
    },
    children: [],
  };

  const componentTree = {
    breakpoints: BREAKPOINTS,
    schemaVersion: "2023-09-28",
    children: [section(pageHeaderNode, unboundValues)],
  };

  for (const collection of COLLECTIONS) {
    const categoryHeaderNode = {
      id: genId(),
      definitionId: "nto-category-header",
      variables: {
        entry: boundEntry(dataSource, entryLink(collection.id)),
        ...leafExtras(),
      },
      children: [],
    };

    const products = collection.productIds
      .map((productId) => PRODUCTS.find((p) => p.id === productId))
      .filter(Boolean);

    const productGridNode = {
      id: genId(),
      definitionId: "nto-product-grid",
      variables: { ...leafExtras() },
      children: products.map((product) => productCard(dataSource, product)),
    };

    componentTree.children.push(
      section(categoryHeaderNode, unboundValues),
      section(productGridNode, unboundValues),
    );
  }

  await publishExperience(client, ctx, locale, EXPERIENCE_TYPE_ID, {
    slug: "gear",
    title: "Gear",
    fallbackEntryId: "layout-gear",
    componentTree,
    dataSource,
    unboundValues,
  });
}

main().catch((err) => {
  console.error("Failed to create Gear experience:", err.message ?? err);
  process.exit(1);
});
