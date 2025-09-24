// QuickProsConsSection.tsx
// This component handles the quick pros/cons section of the tool/tech review form
import React from 'react';

interface QuickProsConsSectionProps {
  formData: {
    oneLinerPros: string;
    oneLinerCons: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const QuickProsConsSection: React.FC<QuickProsConsSectionProps> = ({ formData, handleChange }) => {
  return (
    <div className="bg-background-light dark:bg-background-dark rounded-xl border border-primary/20 p-6">
      <h2 className="text-[#161118] dark:text-[#f5f7f8] text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
        Quick Pros/Cons
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-[#161118] dark:text-[#f5f7f8] text-sm font-medium mb-1">
            One-liner Pro
          </label>
          <input
            type="text"
            name="oneLinerPros"
            value={formData.oneLinerPros}
            onChange={handleChange}
            className="w-full bg-white dark:bg-[#0f0f1a] border border-[#e2dbe6] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., Vibrant color scheme boosts productivity"
          />
        </div>
        
        <div>
          <label className="block text-[#161118] dark:text-[#f5f7f8] text-sm font-medium mb-1">
            One-liner Con
          </label>
          <input
            type="text"
            name="oneLinerCons"
            value={formData.oneLinerCons}
            onChange={handleChange}
            className="w-full bg-white dark:bg-[#0f0f1a] border border-[#e2dbe6] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., May be too bright for some users"
          />
        </div>
      </div>
    </div>
  );
};

export default QuickProsConsSection;