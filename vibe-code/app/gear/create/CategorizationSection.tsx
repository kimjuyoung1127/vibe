"use client";

import React, { useMemo } from 'react';
import AdvancedSelect from '@/app/components/AdvancedSelect';
import { 
  getCommonGearCategoryOptions,
  getCommonGearTagsOptions 
} from './utils/suggestionUtils';
import { CategorizationSectionProps } from '@/app/types/gear';
import { useTranslations } from '@/app/hooks/useTranslations';

const CategorizationSection: React.FC<CategorizationSectionProps> = ({ 
  formData, 
  handleChange,
  setFormData 
}) => {
  const { t } = useTranslations(); 
  
  // Memoize options to prevent re-computation on every render
  const gearCategoryOptions = useMemo(getCommonGearCategoryOptions, []);
  const gearTagsOptions = useMemo(getCommonGearTagsOptions, []);

  // Convert string props to string arrays for the AdvancedSelect component
  const toArray = (str: string, delimiter: string | RegExp = /[, \n]/) =>
    str ? str.split(delimiter).map((s) => s.trim()).filter(Boolean) : [];

  // Generic handler to join arrays into strings with custom delimiters
  const handleCategoryChange = (selected: string[]) => {
    setFormData(prev => ({
      ...prev,
      category: selected.join(', ')
    }));
  };

  const handleTagsChange = (selected: string[]) => {
    setFormData(prev => ({
      ...prev,
      categoryTags: selected.join(', ')
    }));
  };

  return (
    <div className="bg-background-light dark:bg-background-dark rounded-xl border border-primary/20 p-6">
      <h2 className="text-[#161118] dark:text-[#f5f7f8] text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
        {t('common.categorization', 'Categorization')}
      </h2>
      
      <div className="space-y-6">
        <AdvancedSelect
          title={t('common.gearCategory', 'Gear Category')}
          options={gearCategoryOptions}
          selectedValues={toArray(formData.category)}
          onChange={handleCategoryChange}
          placeholder={t('common.searchOrSelectCategory', 'Search or select a category (e.g., Laptop, IDE, AI Tool)')}
        />
        
        <AdvancedSelect
          title={t('common.tags', 'Tags')}
          options={gearTagsOptions}
          selectedValues={toArray(formData.categoryTags)}
          onChange={handleTagsChange}
          placeholder={t('common.searchOrAddTags', 'Search or add tags (e.g., Budget, Portable, High Performance)')}
        />
      </div>
    </div>
  );
};

export default CategorizationSection;