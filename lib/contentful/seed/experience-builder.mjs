import crypto from "node:crypto";

export const BREAKPOINTS = [
  { id: "desktop", query: "*", displayName: "Desktop", displayIcon: "desktop" },
  { id: "tablet", query: "<992px", displayName: "Tablet", displayIcon: "tablet" },
  { id: "mobile", query: "<576px", displayName: "Mobile", displayIcon: "mobile" },
];

export function genKey() {
  return crypto.randomBytes(6).toString("base64url");
}

// Node `id`s must match /^[a-zA-Z0-9]{1,8}$/ — unlike UnboundValue/BoundValue
// keys, which accept any string.
export function genId() {
  return crypto.randomBytes(4).toString("hex");
}

export function designValue(desktopValue) {
  return { type: "DesignValue", valuesByBreakpoint: { desktop: desktopValue } };
}

export function addUnbound(unboundValues, value) {
  const key = genKey();
  unboundValues[key] = value === undefined ? {} : { value };
  return key;
}

export function unboundVar(unboundValues, value) {
  return { type: "UnboundValue", key: addUnbound(unboundValues, value) };
}

export function boundVar(dataSource, link, fieldId) {
  const key = genKey();
  dataSource[key] = link;
  return { type: "BoundValue", path: `/${key}/fields/${fieldId}/~locale` };
}

// Mirrors the variable set Studio itself writes onto every "Section" row
// dropped on the canvas (verified against a live Studio-authored entry).
export function sectionVariables(unboundValues, { maxWidth = "none", backgroundColor = "rgba(0, 0, 0, 0)" } = {}) {
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
export function leafExtras() {
  return {
    cfVisibility: designValue(true),
    cfMargin: designValue("0 0 0 0"),
    cfWidth: designValue("100%"),
  };
}

export function section(children, unboundValues, opts) {
  return {
    id: genId(),
    definitionId: "contentful-section",
    variables: sectionVariables(unboundValues, opts),
    children: [children],
  };
}

export function richTextParagraph(body) {
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

// Publishes componentTree/dataSource/unboundValues onto a `layout` Experience
// entry, resolving the entry by slug (Studio-authored entries don't have a
// predictable id) and falling back to createWithId(fallbackEntryId) when no
// entry with that slug exists yet.
export async function publishExperience(
  client,
  ctx,
  locale,
  experienceTypeId,
  { slug, title, fallbackEntryId, componentTree, dataSource, unboundValues },
) {
  const fields = {
    title: { [locale]: title },
    slug: { [locale]: slug },
    componentTree: { [locale]: componentTree },
    dataSource: { [locale]: dataSource },
    unboundValues: { [locale]: unboundValues },
  };

  const existingBySlug = await client.entry.getMany({
    ...ctx,
    query: { content_type: experienceTypeId, "fields.slug": slug },
  });
  const existing = existingBySlug.items[0];

  let entry;
  if (existing) {
    entry = await client.entry.update(
      { ...ctx, entryId: existing.sys.id },
      { ...existing, fields },
    );
    await client.entry.publish({ ...ctx, entryId: existing.sys.id }, entry);
  } else {
    entry = await client.entry.createWithId(
      { ...ctx, entryId: fallbackEntryId, contentTypeId: experienceTypeId },
      { fields },
    );
    await client.entry.publish({ ...ctx, entryId: fallbackEntryId }, entry);
  }
  console.log(`Experience ready: ${experienceTypeId}/${existing?.sys.id ?? fallbackEntryId} (slug: ${slug})`);
}
