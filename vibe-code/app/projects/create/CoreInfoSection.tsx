// CoreInfoSection.tsx
// This component contains the core information section of the project create form
"use client";

import React, { useState } from 'react';

const CoreInfoSection = () => {
  const [title, setTitle] = useState('');
  const [heroImageUrl, setHeroImageUrl] = useState('');

  return (
    <div>
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Project Core Information</h2>
      
      {/* Project Title */}
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#161118] text-base font-medium leading-normal pb-2">Project Title</p>
          <input
            placeholder="Enter project title"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#161118] focus:outline-0 focus:ring-0 border-none bg-[#f3f0f5] focus:border-none h-14 placeholder:text-[#7c608a] p-4 text-base font-normal leading-normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>
      
      {/* Hero Image/Video URL */}
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#161118] text-base font-medium leading-normal pb-2">Hero Image/Video URL</p>
          <input
            placeholder="Enter URL for hero image or video"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#161118] focus:outline-0 focus:ring-0 border-none bg-[#f3f0f5] focus:border-none h-14 placeholder:text-[#7c608a] p-4 text-base font-normal leading-normal"
            value={heroImageUrl}
            onChange={(e) => setHeroImageUrl(e.target.value)}
          />
        </label>
      </div>
      
      {/* Hero Image Preview */}
      {heroImageUrl && (
        <div className="@container">
          <div className="@[480px]:px-4 @[480px]:py-3">
            <div
              className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-white @[480px]:rounded-lg min-h-[218px]"
              style={{ backgroundImage: `url("${heroImageUrl}")` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoreInfoSection;