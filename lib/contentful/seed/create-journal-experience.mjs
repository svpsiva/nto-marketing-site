import { client, ctx, locale } from "./cma-client.mjs";
import { ARTICLES } from "./data.mjs";
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

function articleCard(dataSource, article) {
  return {
    id: genId(),
    definitionId: "nto-article-card",
    variables: {
      entry: boundEntry(dataSource, entryLink(article.id)),
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
      heading: unboundVar(unboundValues, "Journal"),
      body: unboundVar(unboundValues, "Stories from the trail, written by the people who test our gear."),
      ...leafExtras(),
    },
    children: [],
  };

  const articleGridNode = {
    id: genId(),
    definitionId: "nto-article-grid",
    variables: { ...leafExtras() },
    children: ARTICLES.map((article) => articleCard(dataSource, article)),
  };

  const componentTree = {
    breakpoints: BREAKPOINTS,
    schemaVersion: "2023-09-28",
    children: [section(pageHeaderNode, unboundValues), section(articleGridNode, unboundValues)],
  };

  await publishExperience(client, ctx, locale, EXPERIENCE_TYPE_ID, {
    slug: "journal",
    title: "Journal",
    fallbackEntryId: "layout-journal",
    componentTree,
    dataSource,
    unboundValues,
  });
}

main().catch((err) => {
  console.error("Failed to create Journal experience:", err.message ?? err);
  process.exit(1);
});
