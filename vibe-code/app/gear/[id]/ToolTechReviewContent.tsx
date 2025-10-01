// ToolTechReviewContent.tsx
// This component displays the main content of the tool/tech review with proper formatting and styling
"use client";

import React from 'react';
import VibeEditorRenderer from '@/app/components/VibeEditorRenderer';

interface ToolTechReviewContentProps {
  content: string;
}

const ToolTechReviewContent: React.FC<ToolTechReviewContentProps> = ({ content }) => {
  return (
    <VibeEditorRenderer content={content} />
  );
};

export default ToolTechReviewContent;