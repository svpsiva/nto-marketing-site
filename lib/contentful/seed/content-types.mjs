const richTextValidations = [
  { enabledMarks: ["bold", "italic", "underline", "code"] },
  {
    enabledNodeTypes: [
      "heading-1",
      "heading-2",
      "heading-3",
      "ordered-list",
      "unordered-list",
      "hr",
      "blockquote",
      "embedded-asset-block",
      "hyperlink",
    ],
  },
];

export const CONTENT_TYPES = [
  {
    id: "siteSettings",
    name: "Site Settings",
    description: "Singleton: global brand name, nav, and footer links.",
    displayField: "brandName",
    fields: [
      { id: "brandName", name: "Brand Name", type: "Symbol", required: true },
      { id: "tagline", name: "Tagline", type: "Symbol" },
      { id: "logo", name: "Logo", type: "Link", linkType: "Asset" },
      { id: "nav", name: "Primary Nav (JSON: [{label, href}])", type: "Object" },
      { id: "footerLinks", name: "Footer Links (JSON: [{label, href}])", type: "Object" },
    ],
  },
  {
    id: "author",
    name: "Author",
    description: "Journal article author / NTO ambassador.",
    displayField: "name",
    fields: [
      { id: "name", name: "Name", type: "Symbol", required: true },
      { id: "bio", name: "Bio", type: "Text" },
      { id: "avatar", name: "Avatar", type: "Link", linkType: "Asset" },
    ],
  },
  {
    id: "product",
    name: "Product",
    description: "A single NTO product for the Gear section.",
    displayField: "name",
    fields: [
      { id: "name", name: "Name", type: "Symbol", required: true },
      {
        id: "slug",
        name: "Slug",
        type: "Symbol",
        required: true,
        validations: [{ unique: true }],
      },
      { id: "tagline", name: "Tagline", type: "Symbol" },
      { id: "description", name: "Description", type: "RichText", validations: richTextValidations },
      {
        id: "images",
        name: "Images",
        type: "Array",
        items: { type: "Link", linkType: "Asset" },
      },
      { id: "specs", name: "Specs (JSON)", type: "Object" },
      {
        id: "category",
        name: "Category",
        type: "Symbol",
        validations: [{ in: ["electronics", "gear", "women", "men"] }],
      },
      { id: "featured", name: "Featured", type: "Boolean" },
      { id: "externalStoreUrl", name: "External Store URL", type: "Symbol" },
    ],
  },
  {
    id: "collection",
    name: "Collection",
    description: "A curated group of products.",
    displayField: "name",
    fields: [
      { id: "name", name: "Name", type: "Symbol", required: true },
      {
        id: "slug",
        name: "Slug",
        type: "Symbol",
        required: true,
        validations: [{ unique: true }],
      },
      { id: "description", name: "Description", type: "Text" },
      { id: "heroImage", name: "Hero Image", type: "Link", linkType: "Asset" },
      {
        id: "products",
        name: "Products",
        type: "Array",
        items: {
          type: "Link",
          linkType: "Entry",
          validations: [{ linkContentType: ["product"] }],
        },
      },
    ],
  },
  {
    id: "article",
    name: "Article",
    description: "A Journal blog post.",
    displayField: "title",
    fields: [
      { id: "title", name: "Title", type: "Symbol", required: true },
      {
        id: "slug",
        name: "Slug",
        type: "Symbol",
        required: true,
        validations: [{ unique: true }],
      },
      { id: "excerpt", name: "Excerpt", type: "Text" },
      { id: "body", name: "Body", type: "RichText", validations: richTextValidations },
      { id: "heroImage", name: "Hero Image", type: "Link", linkType: "Asset" },
      {
        id: "author",
        name: "Author",
        type: "Link",
        linkType: "Entry",
        validations: [{ linkContentType: ["author"] }],
      },
      { id: "tags", name: "Tags", type: "Array", items: { type: "Symbol" } },
      { id: "publishDate", name: "Publish Date", type: "Date" },
    ],
  },
];

export async function ensureContentTypes(client, ctx) {
  for (const definition of CONTENT_TYPES) {
    const { id, name, description, displayField, fields } = definition;
    let existing;
    try {
      existing = await client.contentType.get({ ...ctx, contentTypeId: id });
    } catch {
      existing = undefined;
    }

    let contentType;
    if (existing) {
      contentType = await client.contentType.update(
        { ...ctx, contentTypeId: id },
        { ...existing, name, description, displayField, fields },
      );
    } else {
      contentType = await client.contentType.createWithId(
        { ...ctx, contentTypeId: id },
        { name, description, displayField, fields },
      );
    }
    contentType = await client.contentType.publish({ ...ctx, contentTypeId: id }, contentType);
    console.log(`content type ready: ${id}`);
  }
}
