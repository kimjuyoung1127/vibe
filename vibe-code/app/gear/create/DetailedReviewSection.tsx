"use client";

import React, { useState } from 'react';
import { DetailedReviewSectionProps } from '@/app/types/gear';
import VibeTipTapEditor from '@/app/components/VibeTipTapEditor';
import { useTranslations } from '@/app/hooks/useTranslations';

const DetailedReviewSection: React.FC<DetailedReviewSectionProps> = ({ formData, setFormData }) => {
  const { t } = useTranslations();
  
  const handleContentChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content
    }));
  };

  return (
    <div className="bg-background-light dark:bg-background-dark rounded-xl border border-primary/20 p-6">
      <h2 className="text-[#161118] dark:text-[#f5f7f8] text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
        {t('common.detailedReview', 'Detailed Review')} *
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-[#161118] dark:text-[#f5f7f8] text-sm font-medium mb-1">
            {t('common.reviewContent', 'Review Content')}
          </label>
          <VibeTipTapEditor
            initialContent={formData.content}
            onContentChange={handleContentChange}
            maxWidthClass="max-w-[65ch]"
            containerClass="max-w-[672px] md:max-w-[768px] lg:max-w-[896px] xl:max-w-[960px] mx-auto"
            content={''}          />
        </div>
      </div>
    </div>
  );
};

export default DetailedReviewSection;