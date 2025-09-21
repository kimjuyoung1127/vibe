// SearchBar.tsx
// This component displays the search bar
"use client";

import React from 'react';

const SearchBar = () => {
  return (
    <div className="relative flex items-center">
      <span className="material-symbols-outlined absolute left-3 text-black/40 dark:text-white/40">search</span>
      <input 
        className="h-10 w-40 max-w-xs rounded-lg border-none bg-primary/10 pl-10 text-sm text-black ring-primary/20 transition-all focus:w-64 focus:ring-2 dark:bg-primary/20 dark:text-white dark:ring-primary/40" 
        placeholder="Search" 
      />
    </div>
  );
};

export default SearchBar;