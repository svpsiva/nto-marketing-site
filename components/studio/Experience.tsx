"use client";

import { ExperienceRoot } from "@contentful/experiences-sdk-react";
import "@/studio/register-components";

export function Experience({
  experienceJSON,
  locale,
}: {
  experienceJSON: string | null;
  locale: string;
}) {
  return <ExperienceRoot experience={experienceJSON} locale={locale} />;
}
