// CommunityPostForm.tsx
// This component contains the form for creating community posts
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import CommunityPostContentSection from './CommunityPostContentSection';

const CommunityPostForm = () => {
  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would validate the form and submit the data
    console.log('Submitting community post...');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        {/* Back button */}
        <div className="px-4 py-4">
          <Link 
            href="/community" 
            className="flex items-center gap-2 text-primary hover:underline"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span>Back to Coding Lounge</span>
          </Link>
        </div>
        
        {/* Page header */}
        <div className="flex flex-wrap justify-between gap-3 px-4 py-4 border-b border-primary/10 dark:border-primary/20">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#161118] dark:text-[#f5f7f8] tracking-light text-xl font-bold leading-tight">
              Create Community Post
            </p>
            <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm font-normal leading-normal">
              Share your thoughts with the Vibe Code community
            </p>
          </div>
        </div>
        
        {/* Community post content section */}
        <CommunityPostContentSection />
      </div>
    </form>
  );
};

export default CommunityPostForm;