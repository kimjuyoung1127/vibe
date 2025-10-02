"use client";

import React from 'react';
import { CoreInfoSectionProps } from '@/app/types/gear';

const CoreInfoSection: React.FC<CoreInfoSectionProps> = ({ formData, handleChange, setFormData }) => {
  return (
    <div className="bg-background-light dark:bg-background-dark rounded-xl border border-primary/20 p-6">
      <h2 className="text-[#161118] dark:text-[#f5f7f8] text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
        Core Information
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-[#161118] dark:text-[#f5f7f8] text-sm font-medium mb-1">
            Review Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full bg-white dark:bg-[#0f0f1a] border border-[#e2dbe6] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., RetroWave Syntax Theme for VS Code"
          />
        </div>
        
        <div>
          <label className="block text-[#161118] dark:text-[#f5f7f8] text-sm font-medium mb-1">
            Tool/Technology Name *
          </label>
          <input
            type="text"
            name="toolTechName"
            value={formData.toolTechName}
            onChange={handleChange}
            required
            className="w-full bg-white dark:bg-[#0f0f1a] border border-[#e2dbe6] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., VS Code, React, Docker"
          />
        </div>
        
        <div>
          <label className="block text-[#161118] dark:text-[#f5f7f8] text-sm font-medium mb-1">
            Overall Rating *
          </label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, overallRating: star }))}
                className="text-2xl focus:outline-none"
              >
                <span className={star <= formData.overallRating ? "text-yellow-400" : "text-gray-300"}>★</span>
              </button>
            ))}
            <span className="ml-2 text-[#161118] dark:text-[#f5f7f8]">
              {formData.overallRating} of 5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoreInfoSection;