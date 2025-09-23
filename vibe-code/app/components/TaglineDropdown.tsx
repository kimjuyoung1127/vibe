// app/components/TaglineDropdown.tsx
// A custom dropdown component for selecting project taglines
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ProjectTagline } from '@/app/projects/create/types';
import { projectTaglines } from '@/app/projects/create/data/projectTaglines';

interface TaglineDropdownProps {
  /**
   * The currently selected tagline text.
   */
  selectedTagline: string;
  /**
   * Callback function triggered when a tagline is selected or changed.
   * @param tagline - The selected or entered tagline text.
   */
  onSelect: (tagline: string) => void;
  /**
   * Optional placeholder text for the input.
   */
  placeholder?: string;
  /**
   * Optional title or label for the dropdown.
   */
  title?: string;
  /**
   * Optional error message to display.
   */
  error?: string;
}

/**
 * A custom dropdown component for selecting project taglines.
 * It displays a list of predefined taglines and allows the user to select one or enter a custom one.
 */
const TaglineDropdown: React.FC<TaglineDropdownProps> = ({
  selectedTagline,
  onSelect,
  placeholder = "한 줄 요약 (Tagline)을 선택하거나 입력하세요",
  title,
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(selectedTagline); // Use selectedTagline as initial searchTerm
  const [filteredTaglines, setFilteredTaglines] = useState<ProjectTagline[]>(projectTaglines);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter taglines based on search term
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredTaglines(projectTaglines);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = projectTaglines.filter(tagline =>
        tagline.text.toLowerCase().includes(term) ||
        tagline.category.toLowerCase().includes(term) ||
        tagline.id.toLowerCase().includes(term)
      );
      setFilteredTaglines(filtered);
    }
  }, [searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    // If the user is typing, the selected tagline is the typed value
    onSelect(value);
  };

  // Handle tagline selection from the dropdown
  const handleTaglineSelect = (tagline: ProjectTagline) => {
    setSearchTerm(tagline.text);
    onSelect(tagline.text);
    setIsOpen(false);
  };

  // Group taglines by category for better organization in the dropdown
  const groupTaglinesByCategory = (taglines: ProjectTagline[]) => {
    return taglines.reduce((groups: Record<string, ProjectTagline[]>, tagline) => {
      const category = tagline.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(tagline);
      return groups;
    }, {});
  };

  const groupedTaglines = groupTaglinesByCategory(filteredTaglines);

  // Get category label in Korean
  const getCategoryLabel = (category: string): string => {
    const labels: Record<string, string> = {
      'innovation': '혁신/새로움',
      'utility': '유틸리티/실용성',
      'design': '디자인/미학',
      'community': '커뮤니티/협업',
      'retroVibe': '레트로 바이브',
      'efficiency': '효율성',
      'simplicity': '간결함',
      'fun': '재미/개성',
      'challenge': '도전/성장',
      'meme': '밈/재치'
    };
    return labels[category] || category;
  };

  return (
    <div className="flex flex-col gap-1 w-full" ref={dropdownRef}>
      {/* Optional title */}
      {title && <p className="text-[#161118] text-base font-medium leading-normal">{title}</p>}
      
      {/* Custom input that behaves like a dropdown */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-lg text-[#161118] focus:outline-none focus:ring-2 focus:ring-[#af25f4] border ${
            error ? 'border-red-500' : 'border-[#e2dbe6] bg-[#f3f0f5]'
          } placeholder:text-[#7c608a]`}
        />
        
        {/* Dropdown arrow button */}
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center px-2 text-[#7c608a] hover:text-[#161118]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="material-symbols-outlined">
            {isOpen ? 'expand_less' : 'expand_more'}
          </span>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-[#e2dbe6] rounded-lg shadow-lg max-h-60 overflow-auto">
            {filteredTaglines.length === 0 ? (
              <div className="px-4 py-2 text-[#7c608a] text-sm">검색 결과가 없습니다.</div>
            ) : (
              Object.entries(groupedTaglines).map(([category, taglines]) => (
                <div key={category}>
                  <div className="px-4 py-2 text-xs font-semibold text-[#7c608a] bg-[#f9f7fa] sticky top-0">
                    {getCategoryLabel(category)}
                  </div>
                  {taglines.map((tagline) => (
                    <button
                      key={tagline.id}
                      type="button"
                      className="w-full px-4 py-2 text-left text-[#161118] hover:bg-[#f0e6f5] flex items-center gap-2"
                      onClick={() => handleTaglineSelect(tagline)}
                    >
                      {/* Display emoji or icon if available */}
                      {tagline.emoji && <span>{tagline.emoji}</span>}
                      {tagline.icon && (
                        <span className="material-symbols-outlined text-sm">{tagline.icon}</span>
                      )}
                      <span>{tagline.text}</span>
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>
        )}
      </div>
      
      {/* Display error message if provided */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TaglineDropdown;