

// Tags.tsx
// This component displays the tags for the review
"use client";

import React from 'react';

interface TagsProps {
  tags: string[];
}

const Tags: React.FC<TagsProps> = ({ tags }) => {
  return (
    <div className="px-4 pb-6">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className="inline-block px-3 py-1 text-xs font-semibold text-[#7c608a] dark:text-[#c5b3d1] bg-[#e2dbe6] dark:bg-[#1a1a2e] rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Tags;