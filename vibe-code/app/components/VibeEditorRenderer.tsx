// VibeEditorRenderer.tsx
// This component renders content with Vibe-specific formatting options (pop color highlights, 
// alert/info boxes, pixel art banners, colorful code blocks, and font selection)
// Updated to properly render TipTap-generated HTML content
"use client";

import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { ContentRendererProps } from '@/app/types/components';

const VibeEditorRenderer: React.FC<ContentRendererProps> = ({
  content,
  maxWidthClass = "max-w-[65ch]",
  containerClass = "max-w-[672px] md:max-w-[768px] lg:max-w-[896px] xl:max-w-[960px] mx-auto"
}) => {
  // Sanitize content to prevent XSS
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div className={`break-words px-4 pb-6 text-[#161118] dark:text-[#f5f7f8] ${containerClass} pt-6`}>
      <div 
        className={`content-container ${maxWidthClass} mx-auto`}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
      />
    </div>
  );
};

export default VibeEditorRenderer;