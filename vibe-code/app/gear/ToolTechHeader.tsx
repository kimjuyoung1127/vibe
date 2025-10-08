// ToolTechHeader.tsx
// This component displays the header section for the Tool & Tech Review page
"use client";

import React from 'react';
import NewReviewButton from '../components/NewReviewButton';
import { useTranslations } from '@/app/hooks/useTranslations';

const ToolTechHeader = () => {
  const { t } = useTranslations();

  return (
    <div className="px-4 py-8 md:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-primary mb-4">
          {t('common.techReviews', 'Tech Reviews')}
        </h1>
        <p className="text-xl text-[#101c22]/70 dark:text-[#f5f7f8]/70 max-w-3xl mx-auto mb-6">
          {t('common.techReviews.description', 'Discover and share reviews of the latest tools and technologies. From IDEs to frameworks, find out what works best for your coding project.')}
        </p>
        <NewReviewButton />
      </div>
    </div>
  );
};

export default ToolTechHeader;