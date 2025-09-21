// ExploreMoreSection.tsx
// This component displays the explore more section with source links and sharing options
"use client";

import React, { useState } from 'react';

interface ExploreMoreSectionProps {
  sourceUrl: string;
}

const ExploreMoreSection: React.FC<ExploreMoreSectionProps> = ({ sourceUrl }) => {
  const [copiedSource, setCopiedSource] = useState(false);
  
  const handleCopySource = () => {
    navigator.clipboard.writeText(sourceUrl);
    setCopiedSource(true);
    setTimeout(() => setCopiedSource(false), 2000);
  };

  return (
    <div className="px-4 pb-8">
      <h2 className="text-[#161118] dark:text-[#f5f7f8] text-[22px] font-bold leading-tight tracking-[-0.015em] pb-4">
        Explore More
      </h2>
      <div className="border-t border-[#e2dbe6] dark:border-[#1a1a2e] pt-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm mb-2">Source</p>
            <div className="flex">
              <input 
                type="text" 
                value={sourceUrl} 
                readOnly 
                className="flex-1 px-3 py-2 bg-background-light dark:bg-background-dark border border-[#e2dbe6] dark:border-[#1a1a2e] rounded-l-lg text-[#161118] dark:text-[#f5f7f8] text-sm truncate"
              />
              <button 
                onClick={handleCopySource}
                className="px-3 py-2 bg-primary text-white rounded-r-lg hover:bg-primary/90 transition-colors text-sm flex items-center"
              >
                {copiedSource ? (
                  <>
                    <span className="material-symbols-outlined text-base mr-1">check</span>
                    Copied
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-base mr-1">content_copy</span>
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm mb-2">Share</p>
            <div className="flex gap-2">
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1877f2] text-white hover:bg-[#1877f2]/90">
                <span className="material-symbols-outlined text-base">share</span>
              </button>
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1da1f2] text-white hover:bg-[#1da1f2]/90">
                <span className="material-symbols-outlined text-base">share</span>
              </button>
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0a66c2] text-white hover:bg-[#0a66c2]/90">
                <span className="material-symbols-outlined text-base">share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreMoreSection;