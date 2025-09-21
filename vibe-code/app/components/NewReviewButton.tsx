// NewReviewButton.tsx
// This component displays a button for creating new tool/tech reviews
"use client";

import React from 'react';
import Link from 'next/link';

const NewReviewButton = () => {
  return (
    <div className="flex justify-center">
      <Link 
        href="/gear/create" 
        className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-white shadow-md transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <span className="material-symbols-outlined">add</span>
        <span>New Tool/Tech Review</span>
      </Link>
    </div>
  );
};

export default NewReviewButton;