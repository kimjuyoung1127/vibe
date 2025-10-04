// C:\Users\gmdqn\vibe\vibe-code\app\components\AdvancedSelect.tsx
"use client";

import React, { useState, useMemo } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon, XMarkIcon } from '@heroicons/react/20/solid';

// Define the shape of each option
export interface Option {
  value: string;
  label: string;
  category?: string; // To group options
  popular?: boolean; // To feature popular options
}

// Props for the AdvancedSelect component
interface AdvancedSelectProps {
  title: string;
  options: Option[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

const AdvancedSelect: React.FC<AdvancedSelectProps> = ({
  title,
  options,
  selectedValues,
  onChange,
  placeholder = "Search or add new...",
}) => {
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState<Record<string, boolean>>({});

  const handleSelect = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(newSelectedValues);
  };

  const handleCustomAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query && !selectedValues.includes(query)) {
      e.preventDefault();
      onChange([...selectedValues, query]);
      setQuery("");
    }
  };

  const filteredOptions = useMemo(() => {
    return query
      ? options.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase())
        )
      : options;
  }, [query, options]);

  const groupedOptions = useMemo(() => {
    return filteredOptions.reduce((acc, option) => {
      const category = option.category || 'General';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(option);
      return acc;
    }, {} as Record<string, Option[]>);
  }, [filteredOptions]);

  const toggleShowAll = (category: string) => {
    setShowAll(prev => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[#161118] text-base font-medium leading-normal">{title}</p>
      
      {/* Selected Items */}
      <div className="flex flex-wrap gap-2">
        {selectedValues.map((value) => (
          <span key={value} className="flex items-center gap-1 bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-1 rounded-full">
            {options.find(opt => opt.value === value)?.label || value}
            <button onClick={() => handleSelect(value)} className="focus:outline-none">
              <XMarkIcon className="h-4 w-4 text-indigo-500 hover:text-indigo-800" />
            </button>
          </span>
        ))}
      </div>

      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleCustomAdd}
        placeholder={placeholder}
        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#161118] focus:outline-0 focus:ring-2 focus:ring-indigo-500 border-gray-300 bg-[#f3f0f5] h-12 placeholder:text-[#7c608a] p-3 text-base font-normal leading-normal"
      />

      {/* Options */}
      <div className="w-full rounded-lg bg-white border border-gray-200 max-h-96 overflow-y-auto">
        {Object.entries(groupedOptions).map(([category, items]) => (
          <Disclosure key={category} as="div" className="border-b" defaultOpen>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-t-lg bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                  <span>{category}</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-gray-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel as="div" className="p-4 text-sm text-gray-500">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {(showAll[category] ? items : items.slice(0, 6)).map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSelect(option.value)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          selectedValues.includes(option.value)
                            ? 'bg-indigo-500 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  {items.length > 6 && (
                    <button
                      onClick={() => toggleShowAll(category)}
                      className="text-indigo-600 hover:text-indigo-900 text-sm font-medium mt-3"
                    >
                      {showAll[category] ? 'Show Less' : `Show More (${items.length - 6} more)`}
                    </button>
                  )}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
        {Object.keys(groupedOptions).length === 0 && query && (
            <p className="p-4 text-sm text-gray-500">No results found. Press Enter to add as a custom item.</p>
        )}
      </div>
    </div>
  );
};

export default AdvancedSelect;