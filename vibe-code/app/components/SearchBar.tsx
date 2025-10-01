// SearchBar.tsx
// This component displays the search bar
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  placeholder?: string;
  searchDelay?: number;
  suggestions?: string[];
  onSuggestionSelect?: (suggestion: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search", 
  searchDelay = 500,
  suggestions = [],
  onSuggestionSelect
}) => {
  const [query, setQuery] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.trim() !== '' && suggestions.length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSuggestionSelect?.(suggestion);
    // Navigate to search results page
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsLoading(true);
      // Navigate to search results page
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="relative flex items-center">
      <form onSubmit={handleSubmit} className="w-full" role="search">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-black/40 dark:text-white/40">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => query && suggestions.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="h-10 w-full max-w-xs rounded-lg border border-primary/30 bg-primary/10 pl-10 pr-10 text-sm text-black ring-primary/20 transition-all focus:ring-2 dark:bg-primary/20 dark:text-white dark:ring-primary/40"
            placeholder={placeholder}
            aria-label={placeholder}
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
              aria-label="Clear search"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
          {isLoading && (
            <span className="absolute right-3 text-primary animate-spin">
              <span className="material-symbols-outlined">sync</span>
            </span>
          )}
        </div>
      </form>
      
      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          className="absolute z-10 mt-1 w-full rounded-md bg-white dark:bg-[#0f0f1a] shadow-lg border border-primary/20 max-h-60 overflow-auto"
          role="listbox"
          aria-label="Search suggestions"
        >
          <ul className="py-1">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 cursor-pointer hover:bg-primary/10 dark:hover:bg-primary/20 text-black dark:text-white text-sm"
                role="option"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleSuggestionClick(suggestion);
                  }
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;