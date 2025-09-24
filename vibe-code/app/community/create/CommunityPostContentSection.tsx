
"use client";

import React, { useEffect } from 'react';
import MultiSelectButtonGroup from '../../components/MultiSelectButtonGroup';
import { getCommonCommunityTagsOptions, getProjectCategoryTagsOptions, getKeyFeaturesTagsOptions } from './utils/communitySuggestionUtils';

interface FormData {
  title: string;
  content: string;
  tags: string[];
}

interface CommunityPostContentSectionProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const CommunityPostContentSection: React.FC<CommunityPostContentSectionProps> = ({ formData, updateFormData }) => {
  const maxContentLength = 500; // Limit content to 500 characters

  // Function to generate community post tag options
  const getCommunityPostTagOptions = (): { value: string; label: string }[] => {
    // Use common community tags as well as project-related tags from suggestionUtils
    const commonCommunityTags = getCommonCommunityTagsOptions();
    const projectCategoryTags = getProjectCategoryTagsOptions();
    const keyFeaturesTags = getKeyFeaturesTagsOptions();
    
    return [
      ...commonCommunityTags,
      ...projectCategoryTags,
      ...keyFeaturesTags,
    ];
  };

  // Update the parent form when local state changes
  /*
  useEffect(() => {
    updateFormData({
      title: formData.title,
      content: formData.content,
      tags: formData.tags
    });
  }, [formData.title, formData.content, formData.tags, updateFormData]);
  */

  return (
    <div className="p-4">
      {/* Title field */}
      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-medium text-[#161118] dark:text-[#f5f7f8] mb-2">
          Post Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => updateFormData({ title: e.target.value })}
          className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-[#e2dbe6] dark:border-[#1a1a2e] rounded-lg text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter a title for your post"
          required
        />
      </div>
      
      {/* Content field */}
      <div className="mb-6">
        <label htmlFor="content" className="block text-sm font-medium text-[#161118] dark:text-[#f5f7f8] mb-2">
          Post Content
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) => {
            if (e.target.value.length <= maxContentLength) {
              updateFormData({ content: e.target.value });
            }
          }}
          rows={10}
          className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-[#e2dbe6] dark:border-[#1a1a2e] rounded-lg text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Share your thoughts with the community..."
          required
        ></textarea>
        <div className="text-right text-sm text-[#7c608a] dark:text-[#c5b3d1] mt-1">
          {formData.content.length}/{maxContentLength} characters
        </div>
      </div>
      
      {/* Tags field */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#161118] dark:text-[#f5f7f8] mb-2">
          Tags
        </label>
        <MultiSelectButtonGroup
          options={getCommunityPostTagOptions()}
          selectedValues={formData.tags}
          onChange={(selectedTags) => updateFormData({ tags: selectedTags })}
          title="Select relevant tags for your post"
          placeholder="No tags selected"
        />
      </div>
    </div>
  );
};

export default CommunityPostContentSection;