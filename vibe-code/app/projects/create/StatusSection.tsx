// StatusSection.tsx
// This component contains the status and actions section of the project create form
"use client";

import React, { useState } from 'react';

const StatusSection = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleSaveDraft = () => {
    // In a real app, this would save the project as a draft
    console.log('Saving draft...');
  };

  const handlePublish = () => {
    // In a real app, this would publish the project
    console.log('Publishing project...');
  };

  const handleDelete = () => {
    // In a real app, this would delete the project
    console.log('Deleting project...');
  };

  return (
    <div>
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Status &amp; Actions</h2>
      
      {/* Visibility Toggle */}
      <div className="flex items-center gap-4 bg-white px-4 min-h-14 justify-between">
        <p className="text-[#161118] text-base font-normal leading-normal flex-1 truncate">Visibility</p>
        <div className="shrink-0">
          <label
            className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-[#f3f0f5] p-0.5 has-[:checked]:justify-end has-[:checked]:bg-[#af25f4]"
          >
            <div className="h-full w-[27px] rounded-full bg-white" style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 3px 8px, rgba(0, 0, 0, 0.06) 0px 3px 1px' }}></div>
            <input 
              type="checkbox" 
              className="invisible absolute" 
              checked={isVisible}
              onChange={() => setIsVisible(!isVisible)}
            />
          </label>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-stretch">
        <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-end">
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f3f0f5] text-[#161118] text-sm font-bold leading-normal tracking-[0.015em]"
            onClick={handleSaveDraft}
          >
            <span className="truncate">Save Draft</span>
          </button>
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#af25f4] text-white text-sm font-bold leading-normal tracking-[0.015em]"
            onClick={handlePublish}
          >
            <span className="truncate">Publish Project</span>
          </button>
        </div>
      </div>
      
      {/* Delete Button */}
      <div className="flex px-4 py-3 justify-end">
        <button
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f3f0f5] text-[#161118] text-sm font-bold leading-normal tracking-[0.015em]"
          onClick={handleDelete}
        >
          <span className="truncate">Delete Project</span>
        </button>
      </div>
    </div>
  );
};

export default StatusSection;