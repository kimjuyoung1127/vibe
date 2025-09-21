// NewPostButton.tsx
// This component displays a button for creating new community posts
"use client";

import React from 'react';
import Link from 'next/link';

const NewPostButton = () => {
  return (
    <Link 
      href="/community/create" 
      className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      <span className="material-symbols-outlined text-base">add</span>
      <span>New Post</span>
    </Link>
  );
};

export default NewPostButton;