"use client";

import React from 'react';
import { getCommonCategoryTagsOptions } from '@/app/projects/create/utils/suggestionUtils';
import { CategorizationSectionProps } from '@/app/types/gear';

const CategorizationSection: React.FC<CategorizationSectionProps> = ({ formData, handleChange }) => {
  // Get category options
  const categoryOptions = getCommonCategoryTagsOptions();
  
  return (
    <div className="bg-background-light dark:bg-background-dark rounded-xl border border-primary/20 p-6">
      <h2 className="text-[#161118] dark:text-[#f5f7f8] text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
        Categorization
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-[#161118] dark:text-[#f5f7f8] text-sm font-medium mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-white dark:bg-[#0f0f1a] border border-[#e2dbe6] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select a category</option>
            {categoryOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CategorizationSection;