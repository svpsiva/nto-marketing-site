import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getArticleBySlug, getProductBySlug } from "@/lib/contentful/queries";

const BASE_PATH_BY_CONTENT_TYPE: Record<string, string> = {
  article: "/journal",
  product: "/gear",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const contentType = searchParams.get("contentType");
  const slug = searchParams.get("slug");

  if (!secret || secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  const basePath = contentType ? BASE_PATH_BY_CONTENT_TYPE[contentType] : undefined;
  if (!basePath || !slug) {
    return new Response("Invalid contentType or slug", { status: 400 });
  }

  // Look the entry up via the Preview API before enabling Draft Mode, so an
  // unknown/mistyped slug fails here instead of redirecting into a 404.
  const entry =
    contentType === "article" ? await getArticleBySlug(slug, true) : await getProductBySlug(slug, true);

  if (!entry) {
    return new Response("Entry not found", { status: 404 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(`${basePath}/${entry.slug}`);
}
