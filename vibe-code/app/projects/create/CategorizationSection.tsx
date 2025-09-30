// CategorizationSection.tsx
// This component contains the categorization and specifications section of the project create form
"use client";

import React, { useState, useEffect } from 'react';
import MultiSelectButtonGroup from '@/app/components/MultiSelectButtonGroup'; // Import the new component
import { 
  getCommonTechStackOptions, 
  getCommonDevToolsOptions, 
  getCommonCategoryTagsOptions,
  getCommonKeyFeaturesOptions
} from './utils/suggestionUtils'; // Import suggestion utilities
import { CategorizationSectionProps } from '@/app/types/project';

const CategorizationSection = ({
  features,
  setFeatures,
  techStack,
  setTechStack,
  devTools,
  setDevTools,
  categoryTags,
  setCategoryTags
}: CategorizationSectionProps) => {
  // State for selected values in button groups
  const [selectedKeyFeatures, setSelectedKeyFeatures] = useState<string[]>([]);
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
  const [selectedDevTools, setSelectedDevTools] = useState<string[]>([]);
  const [selectedCategoryTags, setSelectedCategoryTags] = useState<string[]>([]);

  // Initialize selected values from props when component mounts or props change
  // For features, we'll treat each line as a separate feature
  useEffect(() => {
    setSelectedKeyFeatures(features.split('\n').map(f => f.trim()).filter(f => f));
  }, [features]);

  useEffect(() => {
    setSelectedTechStack(techStack.split(',').map(t => t.trim()).filter(t => t));
  }, [techStack]);

  useEffect(() => {
    setSelectedDevTools(devTools.split(',').map(t => t.trim()).filter(t => t));
  }, [devTools]);

  useEffect(() => {
    setSelectedCategoryTags(categoryTags.split(',').map(t => t.trim()).filter(t => t));
  }, [categoryTags]);

  // Handle changes from MultiSelectButtonGroup and update the respective string
  const handleKeyFeaturesChange = (selected: string[]) => {
    setSelectedKeyFeatures(selected);
    // Convert array back to multi-line string
    setFeatures(selected.join('\n'));
  };

  const handleTechStackChange = (selected: string[]) => {
    setSelectedTechStack(selected);
    setTechStack(selected.join(', ')); // Update the prop with a comma-separated string
  };

  const handleDevToolsChange = (selected: string[]) => {
    setSelectedDevTools(selected);
    setDevTools(selected.join(', ')); // Update the prop with a comma-separated string
  };

  const handleCategoryTagsChange = (selected: string[]) => {
    setSelectedCategoryTags(selected);
    setCategoryTags(selected.join(', ')); // Update the prop with a comma-separated string
  };

  return (
    <div>
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Categorization & Specifications</h2>
      
      {/* Key Features */}
      <div className="flex flex-col gap-4 px-4 py-3">
        <MultiSelectButtonGroup
          title="Key Features"
          options={getCommonKeyFeaturesOptions()}
          selectedValues={selectedKeyFeatures}
          onChange={handleKeyFeaturesChange}
          placeholder="Select key features or enter your own"
        />
        {/* Keep the textarea for custom key features entry or for cases where button group is not enough */}
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#161118] text-base font-medium leading-normal pb-2">Key Features (One per line)</p>
          <textarea
            placeholder="List the key features of your project. You can add or remove as needed."
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#161118] focus:outline-0 focus:ring-0 border-none bg-[#f3f0f5] focus:border-none min-h-36 placeholder:text-[#7c608a] p-4 text-base font-normal leading-normal"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
          ></textarea>
        </label>
      </div>
      
      {/* Tech Stack */}
      <div className="flex flex-col gap-4 px-4 py-3">
        <MultiSelectButtonGroup
          title="Tech Stack"
          options={getCommonTechStackOptions()}
          selectedValues={selectedTechStack}
          onChange={handleTechStackChange}
          placeholder="Select tech stack or enter your own"
        />
        {/* Keep the input for custom tech stack entry or for cases where button group is not enough */}
        <input
          type="text"
          placeholder="Enter other tech stack separated by commas (e.g., Tensorflow, Kubernetes)"
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#161118] focus:outline-0 focus:ring-0 border-none bg-[#f3f0f5] focus:border-none h-14 placeholder:text-[#7c608a] p-4 text-base font-normal leading-normal"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)} // Direct input also updates the state
        />
      </div>
      
      {/* Development Tools */}
      <div className="flex flex-col gap-4 px-4 py-3">
        <MultiSelectButtonGroup
          title="Development Tools"
          options={getCommonDevToolsOptions()}
          selectedValues={selectedDevTools}
          onChange={handleDevToolsChange}
          placeholder="Select development tools or enter your own"
        />
        {/* Keep the input for custom dev tools entry */}
        <input
          type="text"
          placeholder="Enter other development tools separated by commas"
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#161118] focus:outline-0 focus:ring-0 border-none bg-[#f3f0f5] focus:border-none h-14 placeholder:text-[#7c608a] p-4 text-base font-normal leading-normal"
          value={devTools}
          onChange={(e) => setDevTools(e.target.value)} // Direct input also updates the state
        />
      </div>
      
      {/* Category Tags */}
      <div className="flex flex-col gap-4 px-4 py-3">
        <MultiSelectButtonGroup
          title="Category Tags"
          options={getCommonCategoryTagsOptions()}
          selectedValues={selectedCategoryTags}
          onChange={handleCategoryTagsChange}
          placeholder="Select category tags or enter your own"
        />
        {/* Keep the input for custom category tags entry */}
        <input
          type="text"
          placeholder="Enter other category tags separated by commas"
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#161118] focus:outline-0 focus:ring-0 border-none bg-[#f3f0f5] focus:border-none h-14 placeholder:text-[#7c608a] p-4 text-base font-normal leading-normal"
          value={categoryTags}
          onChange={(e) => setCategoryTags(e.target.value)} // Direct input also updates the state
        />
      </div>
    </div>
  );
};

export default CategorizationSection;