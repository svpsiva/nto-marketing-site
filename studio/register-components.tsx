import { defineComponents, defineBreakpoints, defineDesignTokens } from "@contentful/experiences-sdk-react";
import { Hero } from "@/components/studio/Hero";
import { FeatureGrid } from "@/components/studio/FeatureGrid";
import { FeatureCard } from "@/components/studio/FeatureCard";
import { ProductSpotlight } from "@/components/studio/ProductSpotlight";
import { CollectionShowcase } from "@/components/studio/CollectionShowcase";
import { Testimonial } from "@/components/studio/Testimonial";
import { CTABanner } from "@/components/studio/CTABanner";
import { NewsletterSignup } from "@/components/studio/NewsletterSignup";
import { RichTextBlock } from "@/components/studio/RichTextBlock";
import { ImageGallery } from "@/components/studio/ImageGallery";
import { TrailStatsBand } from "@/components/studio/TrailStatsBand";

const CATEGORY = "NTO Marketing";

// Every leaf node we author (see leafExtras() in lib/contentful/seed/experience-builder.mjs)
// carries a cfWidth: 100% DesignValue so full-bleed components aren't clipped to their
// in-flow content width. The SDK only reads a design variable in Studio's Preview/editor
// canvas when it's declared on the component definition (unlike the published-page
// renderer, which reads the raw node data directly) — so cfWidth must be requested here via
// builtInStyles, or components render narrower/taller than intended in Preview only.
const builtInStyles = (): ("cfWidth" | "cfMargin")[] => ["cfWidth", "cfMargin"];

defineComponents([
  {
    component: Hero,
    definition: {
      id: "nto-hero",
      name: "Hero",
      category: CATEGORY,
      builtInStyles: builtInStyles(),
      variables: {
        heading: { displayName: "Heading", type: "Text", defaultValue: "Outfitted for freedom." },
        subheading: { displayName: "Subheading", type: "Text" },
        backgroundImage: { displayName: "Background image", type: "Media" },
        primaryCtaLabel: { displayName: "Primary CTA label", type: "Text" },
        primaryCtaHref: { displayName: "Primary CTA link", type: "Hyperlink" },
        secondaryCtaLabel: { displayName: "Secondary CTA label", type: "Text" },
        secondaryCtaHref: { displayName: "Secondary CTA link", type: "Hyperlink" },
        minHeight: {
          displayName: "Minimum height",
          type: "Text",
          defaultValue: "clamp(400px, 70vh, 760px)",
        },
      },
    },
  },
  {
    component: FeatureGrid,
    definition: {
      id: "nto-feature-grid",
      name: "Feature Grid",
      category: CATEGORY,
      builtInStyles: builtInStyles(),
      children: true,
      variables: {
        heading: { displayName: "Heading", type: "Text" },
      },
    },
  },
  {
    component: FeatureCard,
    definition: {
      id: "nto-feature-card",
      name: "Feature Card",
      category: CATEGORY,
      builtInStyles: builtInStyles(),
      variables: {
        image: { displayName: "Image", type: "Media" },
        heading: { displayName: "Heading", type: "Text" },
        body: { displayName: "Body", type: "Text" },
      },
    },
  },
  {
    component: ProductSpotlight,
    definition: {
      id: "nto-product-spotlight",
      name: "Product Spotlight",
      category: CATEGORY,
      builtInStyles: builtInStyles(),
      variables: {
        eyebrow: { displayName: "Eyebrow", type: "Text" },
        name: { displayName: "Product name", type: "Text" },
        tagline: { displayName: "Tagline", type: "Text" },
        image: { displayName: "Image", type: "Media" },
        ctaLabel: { displayName: "CTA label", type: "Text", defaultValue: "Shop now" },
        ctaHref: { displayName: "CTA link", type: "Hyperlink" },
      },
    },
  },
  {
    component: CollectionShowcase,
    definition: {
      id: "nto-collection-showcase",
      name: "Collection Showcase",
      category: CATEGORY,
      builtInStyles: builtInStyles(),
      variables: {
        name: { displayName: "Collection name", type: "Text" },
        description: { displayName: "Description", type: "Text" },
        heroImage: { displayName: "Hero image", type: "Media" },
        ctaLabel: { displayName: "CTA label", type: "Text", defaultValue: "Shop the collection" },
        ctaHref: { displayName: "CTA link", type: "Hyperlink" },
        imagePosition: {
          displayName: "Image position",
          type: "Text",
          defaultValue: "right",
          validations: {
            in: [
              { value: "left", displayName: "Image on left" },
              { value: "right", displayName: "Image on right" },
            ],
          },
        },
      },
    },
  },
  {
    component: Testimonial,
    definition: {
      id: "nto-testimonial",
      name: "Testimonial",
      category: CATEGORY,
      builtInStyles: builtInStyles(),
      variables: {
        quote: { displayName: "Quote", type: "Text" },
        authorName: { displayName: "Author name", type: "Text" },
        authorRole: { displayName: "Author role", type: "Text" },
        authorAvatar: { displayName: "Author avatar", type: "Media" },
      },
    },
  },
  {
    component: CTABanner,
    definition: {
      id: "nto-cta-banner",
      name: "CTA Banner",
      category: CATEGORY,
      builtInStyles: builtInStyles(),
      variables: {
        heading: { displayName: "Heading", type: "Text", defaultValue: "Ready to gear up?" },
        body: { displayName: "Body", type: "Text" },
        ctaLabel: { displayName: "CTA label", type: "Text", defaultValue: "Shop now" },
        ctaHref: { displayName: "CTA link", type: "Hyperlink" },
        backgroundImage: { displayName: "Background image", type: "Media" },
        dark: { displayName: "Dark background", type: "Boolean", defaultValue: true },
      },
    },
  },
  {
    component: NewsletterSignup,
    definition: {
      id: "nto-newsletter-signup",
      name: "Newsletter Signup",
      category: CATEGORY,
      builtInStyles: builtInStyles(),
      variables: {
        heading: { displayName: "Heading", type: "Text", defaultValue: "Stay on the trail" },
        body: { displayName: "Body", type: "Text" },
        placeholder: { displayName: "Input placeholder", type: "Text", defaultValue: "you@example.com" },
        submitLabel: { displayName: "Submit label", type: "Text", defaultValue: "Sign up" },
      },
    },
  },
  {
    component: RichTextBlock,
    definition: {
      id: "nto-rich-text-block",
      name: "Rich Text Block",
      category: CATEGORY,
      builtInStyles: builtInStyles(),
      variables: {
        heading: { displayName: "Heading", type: "Text" },
        content: { displayName: "Content", type: "RichText" },
        compact: { displayName: "Compact (card) style", type: "Boolean", defaultValue: false },
      },
    },
  },
  {
    component: ImageGallery,
    definition: {
      id: "nto-image-gallery",
      name: "Image Gallery",
      category: CATEGORY,
      builtInStyles: builtInStyles(),
      variables: {
        heading: { displayName: "Heading", type: "Text" },
        image1: { displayName: "Image 1", type: "Media" },
        image1Alt: { displayName: "Image 1 alt text", type: "Text" },
        image2: { displayName: "Image 2", type: "Media" },
        image2Alt: { displayName: "Image 2 alt text", type: "Text" },
        image3: { displayName: "Image 3", type: "Media" },
        image3Alt: { displayName: "Image 3 alt text", type: "Text" },
      },
    },
  },
  {
    component: TrailStatsBand,
    definition: {
      id: "nto-trail-stats-band",
      name: "Trail Stats Band",
      category: CATEGORY,
      builtInStyles: builtInStyles(),
      variables: {
        stat1Number: { displayName: "Stat 1 number", type: "Text" },
        stat1Label: { displayName: "Stat 1 label", type: "Text" },
        stat2Number: { displayName: "Stat 2 number", type: "Text" },
        stat2Label: { displayName: "Stat 2 label", type: "Text" },
        stat3Number: { displayName: "Stat 3 number", type: "Text" },
        stat3Label: { displayName: "Stat 3 label", type: "Text" },
      },
    },
  },
]);

defineBreakpoints([
  { id: "desktop", query: "*", displayName: "Desktop", displayIcon: "desktop" },
  { id: "tablet", query: "<992px", displayName: "Tablet", displayIcon: "tablet" },
  { id: "mobile", query: "<576px", displayName: "Mobile", displayIcon: "mobile" },
]);

defineDesignTokens({
  spacing: { XS: "4px", S: "16px", M: "32px", L: "64px", XL: "96px" },
  borderRadius: { sm: "8px", md: "16px", lg: "24px", full: "9999px" },
  color: {
    Charcoal50: "#f7f7f7",
    Charcoal100: "#ededed",
    Charcoal200: "#d9d9d9",
    Charcoal400: "#8c8c8c",
    Charcoal600: "#393939",
    Charcoal800: "#1c1c1c",
    Charcoal950: "#0a0a0a",
    Sky400: "#82d4f2",
    Sky500: "#6ccdf0",
    Sky700: "#16a2d5",
    White: "#ffffff",
  },
  textColor: {
    Charcoal600: "#393939",
    Charcoal800: "#1c1c1c",
    Sky700: "#16a2d5",
    White: "#ffffff",
  },
});
