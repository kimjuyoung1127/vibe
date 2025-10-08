// CommunityHeader.tsx
// This component displays the header section for the Coding Lounge page
"use client";

import React from 'react';
import NewPostButton from '../components/NewPostButton';
import { useTranslations } from '../hooks/useTranslations';

const CommunityHeader = () => {
  const { t } = useTranslations();
  
  return (
    <div className="px-4 py-6 md:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tighter text-primary">
            {t('community.codingLounge')}
          </h1>
          <NewPostButton />
        </div>
        <p className="text-base text-[#101c22]/70 dark:text-[#f5f7f8]/70">
          {t('community.loungeDescription')}
        </p>
      </div>
    </div>
  );
};

export default CommunityHeader;