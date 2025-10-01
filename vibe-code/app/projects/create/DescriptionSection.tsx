// DescriptionSection.tsx
// This component contains the detailed description section of the project create form with Vibe formatting options
"use client";

import React from 'react';
import VibeTipTapEditor from '@/app/components/VibeTipTapEditor';
import { DescriptionSectionProps } from '@/app/types/project';

const DescriptionSection = ({
  description,
  setDescription,
  errors,
  fontPreference,
  setFontPreference
}: DescriptionSectionProps) => {
  return (
    <div>
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Detailed Project Description</h2>
      
      {/* Vibe TipTap Editor */}
      <VibeTipTapEditor 
        initialContent={description}
        onContentChange={setDescription}
        maxWidthClass="max-w-[65ch]"
        containerClass="max-w-[672px] md:max-w-[768px] lg:max-w-[896px] xl:max-w-[960px] mx-auto"
        initialFontPreference={fontPreference}
        onFontChange={setFontPreference} content={''}      />
      
      {/* Display errors if any */}
      {errors.description && <p className="text-red-500 text-sm mt-1 ml-4">{errors.description}</p>}
    </div>
  );
};

export default DescriptionSection;