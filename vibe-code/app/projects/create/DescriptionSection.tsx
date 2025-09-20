// DescriptionSection.tsx
// This component contains the detailed description section of the project create form
"use client";

import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

const DescriptionSection = () => {
  const [description, setDescription] = useState('');

  return (
    <div>
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Detailed Project Description</h2>
      
      {/* Full Description */}
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#161118] text-base font-medium leading-normal pb-2">Full Description (Markdown Supported)</p>
          <TextareaAutosize
            minRows={6}
            placeholder="Describe your project in detail. Use markdown for formatting. Add pop color highlights, alert/info boxes, pixel art banners, colorful code blocks, and select a font for your post. Upload images/GIFs and add additional screenshots/GIFs with drag-and-drop."
            className="form-input flex w-full min-w-0 flex-3 size-none overflow-hidden rounded-lg text-[#161118] focus:outline-0 focus:ring-0 border-none bg-[#f3f0f5] focus:border-none placeholder:text-[#7c608a] p-4 text-base font-normal leading-normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

export default DescriptionSection;