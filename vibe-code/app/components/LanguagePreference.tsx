// LanguagePreference.tsx
// A reusable component for language selection
"use client";

import React from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Locale } from '@/app/i18n/i18n-types';
import { useTranslations } from '@/app/hooks/useTranslations';

interface LanguagePreferenceProps {
  className?: string;
}

const LanguagePreference: React.FC<LanguagePreferenceProps> = ({ className = '' }) => {
  const { locale, switchLanguage } = useLanguage();
  const { t } = useTranslations();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value as Locale;
    switchLanguage(newLanguage);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      
      <select
        id="language-select"
        value={locale}
        onChange={handleLanguageChange}
        className="px-2 py-1 bg-background-light dark:bg-background-dark border border-[#e2dbe6] dark:border-[#1a1a2e] rounded-lg text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-1 focus:ring-primary text-xs min-w-[100px]"
      >
        <option value="en">{t('common.english', 'English')}</option>
        <option value="ko">{t('common.korean', '한국어')}</option>
      </select>
    </div>
  );
};

export default LanguagePreference;