import { client, ctx, locale } from "./cma-client.mjs";
import { ARTICLES, AUTHORS } from "./data.mjs";
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

function assetLink(assetId) {
  return { sys: { type: "Link", linkType: "Asset", id: assetId } };
}

function articleCard(unboundValues, dataSource, article) {
  const author = AUTHORS.find((a) => a.id === article.authorId);
  return {
    id: genId(),
    definitionId: "nto-article-card",
    variables: {
      image: boundVar(dataSource, assetLink(`asset-${article.id}`), "file"),
      title: unboundVar(unboundValues, article.title),
      excerpt: unboundVar(unboundValues, article.excerpt),
      authorName: unboundVar(unboundValues, author?.name ?? ""),
      href: unboundVar(unboundValues, `/journal/${article.slug}`),
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
    children: ARTICLES.map((article) => articleCard(unboundValues, dataSource, article)),
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
