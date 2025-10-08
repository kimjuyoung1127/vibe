// CategorizationSection.tsx
// This component contains the categorization and specifications section of the project create form.
// It now uses the AdvancedSelect component for an improved UX.
"use client";

import React, { useMemo } from "react";
import AdvancedSelect from "@/app/components/AdvancedSelect";
import {
  getCommonTechStackOptions,
  getCommonDevToolsOptions,
  getCommonCategoryTagsOptions,
  getCommonKeyFeaturesOptions,
} from "./utils/suggestionUtils";
import { CategorizationSectionProps } from "@/app/types/project";
import { useTranslations } from '@/app/hooks/useTranslations';

const CategorizationSection = ({
  features,
  setFeatures,
  techStack,
  setTechStack,
  devTools,
  setDevTools,
  categoryTags,
  setCategoryTags,
}: CategorizationSectionProps) => {
  const { t } = useTranslations();
  // Memoize options to prevent re-computation on every render
  const keyFeaturesOptions = useMemo(getCommonKeyFeaturesOptions, []);
  const techStackOptions = useMemo(getCommonTechStackOptions, []);
  const devToolsOptions = useMemo(getCommonDevToolsOptions, []);
  const categoryTagsOptions = useMemo(getCommonCategoryTagsOptions, []);

  // Convert string props to string arrays for the AdvancedSelect component
  const toArray = (str: string, delimiter: string | RegExp = /[, \n]/) =>
    str ? str.split(delimiter).map((s) => s.trim()).filter(Boolean) : [];

  // Generic handler to join arrays into strings with custom delimiters
  const handleChange =
    (setter: (val: string) => void, delimiter: string) =>
    (selected: string[]) =>
      setter(selected.join(delimiter));

  return (
    <div className="flex flex-col gap-8">
      <h2 className="px-4 pt-5 pb-0 text-[22px] font-bold leading-tight tracking-[-0.015em] text-[#161118]">
        {t('projects.categorization.title', 'Categorization & Specifications')}
      </h2>

      <div className="flex flex-col gap-6 px-4">
        <AdvancedSelect
          title={t('projects.categorization.keyFeatures', 'Key Features')}
          options={keyFeaturesOptions}
          selectedValues={toArray(features, /\n/)}
          onChange={handleChange(setFeatures, "\n")}
          placeholder={t('projects.categorization.featuresPlaceholder', 'Search features or add your own (e.g., Real-time Collaboration)')}
        />

        <AdvancedSelect
          title={t('projects.categorization.techStack', 'Tech Stack')}
          options={techStackOptions}
          selectedValues={toArray(techStack)}
          onChange={handleChange(setTechStack, ", ")}
          placeholder={t('projects.categorization.techStackPlaceholder', 'Search tech stack or add your own (e.g., React, Python)')}
        />

        <AdvancedSelect
          title={t('projects.categorization.devTools', 'Development Tools')}
          options={devToolsOptions}
          selectedValues={toArray(devTools)}
          onChange={handleChange(setDevTools, ", ")}
          placeholder={t('projects.categorization.devToolsPlaceholder', 'Search tools or add your own (e.g., VS Code, Docker)')}
        />

        <AdvancedSelect
          title={t('projects.categorization.categoryTags', 'Category Tags')}
          options={categoryTagsOptions}
          selectedValues={toArray(categoryTags)}
          onChange={handleChange(setCategoryTags, ", ")}
          placeholder={t('projects.categorization.categoryTagsPlaceholder', 'Search categories or add your own (e.g., Web App, AI/ML)')}
        />
      </div>
    </div>
  );
};

export default CategorizationSection;