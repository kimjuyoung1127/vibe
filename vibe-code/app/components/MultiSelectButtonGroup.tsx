// MultiSelectButtonGroup.tsx
// A reusable component for multi-select using buttons
"use client";

import React from 'react';

interface MultiSelectButtonGroupProps {
  /**
   * Array of available options to select from.
   * Each option should have a `value` (unique identifier) and a `label` (display text).
   */
  options: { value: string; label: string }[];
  /**
   * Array of currently selected values.
   */
  selectedValues: string[];
  /**
   * Callback function triggered when a selection changes.
   * @param selected - The updated array of selected values.
   */
  onChange: (selected: string[]) => void;
  /**
   * Optional title or label for the group.
   */
  title?: string;
  /**
   * Optional placeholder text when no items are selected.
   */
  placeholder?: string;
}

/**
 * A UI component that allows users to select multiple options by clicking buttons.
 * Selected buttons are visually distinct.
 */
const MultiSelectButtonGroup: React.FC<MultiSelectButtonGroupProps> = ({
  options,
  selectedValues,
  onChange,
  title,
  placeholder = "Select options",
}) => {
  /**
   * Handles the click event on a button.
   * Toggles the selection state of the clicked option.
   * @param value - The value of the clicked option.
   */
  const handleButtonClick = (value: string) => {
    if (selectedValues.includes(value)) {
      // If already selected, remove it (deselect)
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      // If not selected, add it (select)
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Optional title */}
      {title && <p className="text-[#161118] text-base font-medium leading-normal">{title}</p>}
      
      {/* Buttons container */}
      <div className="flex flex-wrap gap-2">
        {options.length > 0 ? (
          options.map((option) => {
            const isSelected = selectedValues.includes(option.value);
            return (
              <button
                key={option.value}
                type="button" // Important: prevent form submission
                onClick={() => handleButtonClick(option.value)}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors duration-200 ease-in-out ${
                  isSelected
                    ? 'bg-[#af25f4] text-white border border-[#af25f4]' // Selected state
                    : 'bg-[#f3f0f5] text-[#161118] border border-[#e2dbe6] hover:bg-[#e2dbe6]' // Unselected state
                }`}
              >
                {option.label}
              </button>
            );
          })
        ) : (
          // If no options are provided
          <p className="text-[#7c608a] text-sm">{placeholder}</p>
        )}
      </div>
    </div>
  );
};

export default MultiSelectButtonGroup;