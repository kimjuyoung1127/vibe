
"use client";

import React, { useEffect } from 'react';
import MultiSelectButtonGroup from '../../components/MultiSelectButtonGroup';
import { getCommonCommunityTagsOptions, getProjectCategoryTagsOptions, getKeyFeaturesTagsOptions } from './utils/communitySuggestionUtils';
import { FormData, CommunityPostContentSectionProps } from '@/app/types/community';
import { useTranslations } from '@/app/hooks/useTranslations';

const CommunityPostContentSection: React.FC<CommunityPostContentSectionProps> = ({ formData, updateFormData }) => {
  const { t } = useTranslations();
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
          {t('community.create.postTitle', 'Post Title')}
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => updateFormData({ title: e.target.value })}
          className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-[#e2dbe6] dark:border-[#1a1a2e] rounded-lg text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={t('community.create.titlePlaceholder', 'Enter a title for your post')}
          required
        />
      </div>
      
      {/* Content field */}
      <div className="mb-6">
        <label htmlFor="content" className="block text-sm font-medium text-[#161118] dark:text-[#f5f7f8] mb-2">
          {t('community.create.postContent', 'Post Content')}
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
          placeholder={t('community.create.contentPlaceholder', 'Share your thoughts with the community...')}
          required
        ></textarea>
        <div className="text-right text-sm text-[#7c608a] dark:text-[#c5b3d1] mt-1">
          {t('community.create.characters', '{count}/{max} characters', { 
            count: formData.content.length, 
            max: maxContentLength 
          })}
        </div>
      </div>
      
      {/* Tags field */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#161118] dark:text-[#f5f7f8] mb-2">
          {t('community.create.tags', 'Tags')}
        </label>
        <div className="flex flex-col gap-3">
          <p className="text-[#161118] text-base font-medium leading-normal">{t('community.create.selectTags', 'Select relevant tags for your post')}</p>
          
          {/* Selected Tags */}
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((value) => {
              const option = getCommunityPostTagOptions().find(opt => opt.value === value);
              const displayLabel = option ? option.label : value;
              return (
                <span 
                  key={value} 
                  className="flex items-center gap-1 bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-1 rounded-full"
                >
                  {displayLabel}
                  <button 
                    type="button" 
                    onClick={() => updateFormData({ tags: formData.tags.filter(v => v !== value) })} 
                    className="focus:outline-none"
                  >
                    <span className="material-symbols-outlined text-xs">close</span>
                  </button>
                </span>
              );
            })}
          </div>

          {/* Tag Input */}
          <div className="relative">
            <input
              type="text"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ',') {
                  e.preventDefault();
                  const input = e.target as HTMLInputElement;
                  const newTag = input.value.trim();
                  if (newTag && !formData.tags.includes(newTag)) {
                    // Check if it's an existing tag
                    const existingTag = getCommunityPostTagOptions().find(opt => 
                      opt.value.toLowerCase() === newTag.toLowerCase() || 
                      opt.label.toLowerCase() === newTag.toLowerCase()
                    );
                    
                    if (existingTag && !formData.tags.includes(existingTag.value)) {
                      updateFormData({ tags: [...formData.tags, existingTag.value] });
                    } else if (!existingTag && !formData.tags.includes(newTag)) {
                      // Add as custom tag if it's not an existing one
                      updateFormData({ tags: [...formData.tags, newTag] });
                    }
                  }
                  input.value = '';
                }
              }}
              placeholder={t('community.create.addTagsPlaceholder', 'Search or add new tags (press Enter or comma to add)')}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#161118] focus:outline-0 focus:ring-2 focus:ring-indigo-500 border-gray-300 bg-[#f3f0f5] h-12 placeholder:text-[#7c608a] p-3 text-base font-normal leading-normal"
            />
          </div>

          {/* Tag Suggestions */}
          <div className="w-full rounded-lg bg-white border border-gray-200 max-h-60 overflow-y-auto">
            <div className="p-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {getCommunityPostTagOptions()
                  .filter(option => !formData.tags.includes(option.value))
                  .map((option) => (
                    <button
                      type="button"
                      key={option.value}
                      onClick={() => updateFormData({ tags: [...formData.tags, option.value] })}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        formData.tags.includes(option.value)
                          ? 'bg-indigo-500 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
              </div>
              {getCommunityPostTagOptions().filter(option => !formData.tags.includes(option.value)).length === 0 && (
                <p className="p-4 text-sm text-gray-500 text-center">{t('community.create.allTagsSelected', 'All available tags have been selected')}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPostContentSection;