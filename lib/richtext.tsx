import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import type { Document } from "@contentful/rich-text-types";

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node: unknown, children: React.ReactNode) => (
      <p className="text-charcoal-600 leading-relaxed">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (_node: unknown, children: React.ReactNode) => (
      <h2 className="mt-8 text-2xl font-semibold text-charcoal-800">{children}</h2>
    ),
    [BLOCKS.HEADING_2]: (_node: unknown, children: React.ReactNode) => (
      <h3 className="mt-6 text-xl font-semibold text-charcoal-800">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (_node: unknown, children: React.ReactNode) => (
      <ul className="list-disc space-y-1 pl-5 text-charcoal-600">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node: unknown, children: React.ReactNode) => (
      <ol className="list-decimal space-y-1 pl-5 text-charcoal-600">{children}</ol>
    ),
    [BLOCKS.QUOTE]: (_node: unknown, children: React.ReactNode) => (
      <blockquote className="border-l-2 border-sky-500 pl-4 italic text-charcoal-500">
        {children}
      </blockquote>
    ),
  },
};

export function RichText({ document }: { document: Document }) {
  return <div className="space-y-4">{documentToReactComponents(document, options)}</div>;
}
