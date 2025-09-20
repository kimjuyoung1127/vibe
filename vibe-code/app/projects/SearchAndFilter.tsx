// SearchAndFilter.tsx
// This component provides search and filtering controls for the projects
"use client";

import React from 'react';

const SearchAndFilter = () => {
  return (
    <div className="mb-8 p-4 rounded-xl bg-background-light/50 dark:bg-background-dark/50 border border-primary/20 dark:border-primary/30 flex flex-wrap items-center justify-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      {/* Search input */}
      <div className="relative flex-grow max-w-xs">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">search</span>
        <input 
          className="w-full bg-transparent border-b-2 border-primary/40 focus:border-primary py-2 pl-10 pr-3 focus:outline-none transition-colors" 
          placeholder="Search projects..." 
          type="text"
        />
      </div>
      
      {/* Sort by dropdown */}
      <div className="relative">
        <select className="appearance-none bg-transparent border-2 border-primary/40 rounded-lg py-2 pl-4 pr-10 font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer">
          <option>Sort by: Newest</option>
          <option>Sort by: Popular</option>
          <option>Sort by: Trending</option>
        </select>
        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary">expand_more</span>
      </div>
      
      {/* Category filter dropdown */}
      <div className="relative">
        <select className="appearance-none bg-transparent border-2 border-primary/40 rounded-lg py-2 pl-4 pr-10 font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer">
          <option>Category: All</option>
          <option>Category: Web</option>
          <option>Category: Mobile</option>
          <option>Category: AI</option>
        </select>
        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary">expand_more</span>
      </div>
      
      {/* Tools filter dropdown */}
      <div className="relative">
        <select className="appearance-none bg-transparent border-2 border-primary/40 rounded-lg py-2 pl-4 pr-10 font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer">
          <option>Tools: All</option>
          <option>Tools: React</option>
          <option>Tools: Vue</option>
          <option>Tools: Svelte</option>
        </select>
        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary">expand_more</span>
      </div>
    </div>
  );
};

export default SearchAndFilter;