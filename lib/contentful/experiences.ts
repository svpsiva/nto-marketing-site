import { fetchBySlug } from "@contentful/experiences-sdk-react";
import { getContentfulClient } from "./client";

const experienceTypeId = process.env.CONTENTFUL_EXPERIENCE_TYPE_ID;

export async function getExperience(slug: string, localeCode: string, isPreview = false, isEditorMode = false) {
  if (!experienceTypeId) {
    throw new Error("Missing CONTENTFUL_EXPERIENCE_TYPE_ID");
  }
  const client = getContentfulClient(isPreview);
  try {
    const experience = await fetchBySlug({
      client,
      experienceTypeId,
      slug,
      localeCode,
      isEditorMode,
    });
    return { experience };
  } catch (error) {
    return { experience: undefined, error: error as Error };
  }
}
