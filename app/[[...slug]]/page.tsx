import { detachExperienceStyles } from "@contentful/experiences-sdk-react";
import { getExperience } from "@/lib/contentful/experiences";
import { Experience } from "@/components/studio/Experience";
import "@/studio/register-components";

export const revalidate = 3600;

const LOCALE = "en-US";

export default async function ExperiencePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug: slugParts } = await params;
  const slug = slugParts && slugParts.length > 0 ? slugParts.join("/") : "home";

  const { isPreview, expEditorMode } = await searchParams;
  const preview = isPreview === "true";
  const editorMode = expEditorMode === "true";

  const { experience, error } = await getExperience(slug, LOCALE, preview, editorMode);

  const isNotFoundError = error?.message.includes(`No experience entry with slug: ${slug} exists`);

  if (error && !isNotFoundError) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center text-charcoal-500">
        Couldn&apos;t load this page: {error.message}
      </div>
    );
  }

  if ((!experience || isNotFoundError) && !editorMode) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center text-charcoal-500">
        No published Experience found for &ldquo;{slug}&rdquo; yet. Build and publish it in
        Contentful Studio.
      </div>
    );
  }

  const stylesheet = experience ? detachExperienceStyles(experience) : null;
  const experienceJSON = experience ? JSON.stringify(experience) : null;

  return (
    <main style={{ width: "100%" }}>
      {stylesheet && <style>{stylesheet}</style>}
      <Experience experienceJSON={experienceJSON} locale={LOCALE} />
    </main>
  );
}
