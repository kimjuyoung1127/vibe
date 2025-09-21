// NewsHeader.tsx
// This component displays the header section for the News page
"use client";

import React from 'react';

const NewsHeader = () => {
  return (
    <div className="px-4 py-8 md:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-primary mb-4">
          Vibe News
        </h1>
        <p className="text-xl text-[#101c22]/70 dark:text-[#f5f7f8]/70 max-w-3xl mx-auto">
          Stay up-to-date with the latest in tech, AI, and development. 
          Curated articles and insights for the Vibe Code community.
        </p>
      </div>
    </div>
  );
};

export default NewsHeader;