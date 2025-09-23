// SearchAndFilter.tsx
// This component provides search and filtering controls for the projects
"use client";

import React, { useState, useEffect } from 'react';
import { 
  getCommonCategoryTagsOptions, 
  getCommonDevToolsOptions,
  getCommonTechStackOptions
} from '@/app/projects/create/utils/suggestionUtils';

const SearchAndFilter = () => {
  // State for filter values
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTool, setSelectedTool] = useState('all');
  const [selectedTech, setSelectedTech] = useState('all');
  
  // Get options from suggestion utils
  const categoryOptions = getCommonCategoryTagsOptions();
  const toolOptions = getCommonDevToolsOptions();
  const techOptions = getCommonTechStackOptions();

  // Sorting options
  const sortOptions = [
    { value: 'newest', label: 'Sort by: Newest' },
    { value: 'popular', label: 'Sort by: Most Vibe Checks' },
    { value: 'trending', label: 'Sort by: Trending' },
    { value: 'recommended', label: 'Sort by: Recommended' }
  ];

  return (
    <div className="p-4 rounded-xl bg-background-light/50 dark:bg-background-dark/50 border border-primary/20 dark:border-primary/30 flex flex-wrap items-center justify-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      {/* Search input */}
      <div className="relative flex-grow max-w-xs">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">search</span>
        <input 
          className="w-full bg-transparent border-b-2 border-primary/40 focus:border-primary py-2 pl-10 pr-3 focus:outline-none transition-colors" 
          placeholder="Search projects..." 
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Sort by dropdown */}
      <div className="relative">
        <select 
          className="appearance-none bg-transparent border-2 border-primary/40 rounded-lg py-2 pl-4 pr-10 font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary">expand_more</span>
      </div>
      
      {/* Category filter dropdown */}
      <div className="relative">
        <select 
          className="appearance-none bg-transparent border-2 border-primary/40 rounded-lg py-2 pl-4 pr-10 font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">Category: All</option>
          {categoryOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary">expand_more</span>
      </div>
      
      {/* Tools filter dropdown */}
      <div className="relative">
        <select 
          className="appearance-none bg-transparent border-2 border-primary/40 rounded-lg py-2 pl-4 pr-10 font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
          value={selectedTool}
          onChange={(e) => setSelectedTool(e.target.value)}
        >
          <option value="all">Tools: All</option>
          {toolOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary">expand_more</span>
      </div>
      
      {/* Tech Stack filter dropdown */}
      <div className="relative">
        <select 
          className="appearance-none bg-transparent border-2 border-primary/40 rounded-lg py-2 pl-4 pr-10 font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
          value={selectedTech}
          onChange={(e) => setSelectedTech(e.target.value)}
        >
          <option value="all">Tech Stack: All</option>
          {techOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary">expand_more</span>
      </div>
    </div>
  );
};

export default SearchAndFilter;