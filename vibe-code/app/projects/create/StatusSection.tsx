// StatusSection.tsx
// This component contains the status and actions section of the project create form
"use client";

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { StatusSectionProps } from '@/app/types/project';

const StatusSection = ({
  isVisible,
  setIsVisible,
  isSubmitting,
  onSaveDraft,
  saveDraftStatus
}: StatusSectionProps) => {
  const searchParams = useSearchParams();
  const isEditingDraft = searchParams.get('draftId') ? true : false;

  const handleVisibilityChange = () => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
  };

  const handleSaveDraft = async (e: React.MouseEvent) => {
    e.preventDefault();
    await onSaveDraft();
  };

  return (
    <div>
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        {isEditingDraft ? 'Edit Draft' : 'Status & Actions'}
      </h2>
      
      {/* Visibility Toggle */}
      <div className="flex items-center gap-4 bg-white px-4 min-h-14 justify-between">
        <p className="text-[#161118] text-base font-normal leading-normal flex-1 truncate">Visibility Settings</p>
        <div className="shrink-0">
          <label
            className={`relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none p-0.5 ${
              isVisible ? 'bg-[#af25f4] justify-end' : 'bg-[#f3f0f5] justify-start'
            }`}
          >
            <div 
              className="h-full w-[27px] rounded-full bg-white" 
              style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 3px 8px, rgba(0, 0, 0, 0.06) 0px 3px 1px' }}
            ></div>
            <input 
              type="checkbox" 
              className="invisible absolute" 
              checked={isVisible}
              onChange={handleVisibilityChange}
              disabled={isSubmitting}
            />
          </label>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-stretch">
        <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-end">
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f3f0f5] text-[#161118] text-sm font-bold leading-normal tracking-[0.015em]"
            type="button" // Changed to button type for save draft
            disabled={isSubmitting} // Disable during submission
            onClick={handleSaveDraft}
          >
            <span className="truncate">
              {saveDraftStatus === 'saving' ? 'Saving...' : 
               saveDraftStatus === 'saved' ? 'Saved' : 
               saveDraftStatus === 'error' ? 'Save Failed' : 
               isEditingDraft ? 'Update Draft' : 'Save Draft'}
            </span>
          </button>
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#af25f4] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#9c20e0] transition-colors"
            type="submit" // Keep as submit type for publish
            disabled={isSubmitting} // Disable during submission
          >
            <span className="truncate">
              {isSubmitting ? 'Publishing...' : 
               isEditingDraft ? 'Publish Draft' : 'Publish Project'}
            </span>
          </button>
        </div>
      </div>
      
      {/* Delete Button - Hidden in create mode, shown in edit mode */}
      {/* For now, we'll hide it in the create form */}
      {/* <div className="flex px-4 py-3 justify-end">
        <button
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f3f0f5] text-[#161118] text-sm font-bold leading-normal tracking-[0.015em]"
          type="button"
          disabled={isSubmitting} // Disable during submission
          onClick={handleDelete}
        >
          <span className="truncate">Delete Project</span>
        </button>
      </div> */}
    </div>
  );
};

export default StatusSection;