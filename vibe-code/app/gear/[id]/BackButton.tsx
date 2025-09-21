// BackButton.tsx
// This component displays a back button to return to the main tool & tech page
"use client";

import React from 'react';
import Link from 'next/link';

const BackButton = () => {
  return (
    <div className="px-4 py-6">
      <Link 
        href="/gear" 
        className="flex items-center gap-2 text-primary hover:underline"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        <span>Back to Tool & Tech Reviews</span>
      </Link>
    </div>
  );
};

export default BackButton;