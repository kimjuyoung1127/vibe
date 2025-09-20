// CategorizationSection.tsx
// This component contains the categorization and specifications section of the project create form
"use client";

import React, { useState } from 'react';

const CategorizationSection = () => {
  const [features, setFeatures] = useState('');
  const [techStack, setTechStack] = useState('');
  const [devTools, setDevTools] = useState('');
  const [categoryTags, setCategoryTags] = useState('');

  return (
    <div>
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Categorization &amp; Specifications</h2>
      
      {/* Key Features */}
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#161118] text-base font-medium leading-normal pb-2">Key Features (One per line)</p>
          <textarea
            placeholder="List key features of your project. Add or remove features as needed."
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#161118] focus:outline-0 focus:ring-0 border-none bg-[#f3f0f5] focus:border-none min-h-36 placeholder:text-[#7c608a] p-4 text-base font-normal leading-normal"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
          ></textarea>
        </label>
      </div>
      
      {/* Tech Stack */}
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#161118] text-base font-medium leading-normal pb-2">Tech Stack</p>
          <input
            placeholder="Enter technologies used (comma separated)"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#161118] focus:outline-0 focus:ring-0 border-none bg-[#f3f0f5] focus:border-none h-14 placeholder:text-[#7c608a] p-4 text-base font-normal leading-normal"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
          />
        </label>
      </div>
      
      {/* Development Tools */}
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#161118] text-base font-medium leading-normal pb-2">Development Tools</p>
          <input
            placeholder="Enter development tools used (comma separated)"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#161118] focus:outline-0 focus:ring-0 border-none bg-[#f3f0f5] focus:border-none h-14 placeholder:text-[#7c608a] p-4 text-base font-normal leading-normal"
            value={devTools}
            onChange={(e) => setDevTools(e.target.value)}
          />
        </label>
      </div>
      
      {/* Category Tags */}
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#161118] text-base font-medium leading-normal pb-2">Category Tags</p>
          <input
            placeholder="Enter category tags (comma separated)"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#161118] focus:outline-0 focus:ring-0 border-none bg-[#f3f0f5] focus:border-none h-14 placeholder:text-[#7c608a] p-4 text-base font-normal leading-normal"
            value={categoryTags}
            onChange={(e) => setCategoryTags(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

export default CategorizationSection;