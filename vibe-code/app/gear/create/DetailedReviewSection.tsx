// DetailedReviewSection.tsx
// This component handles the detailed review section of the tool/tech review form
import React from 'react';

interface DetailedReviewSectionProps {
  formData: {
    content: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const DetailedReviewSection: React.FC<DetailedReviewSectionProps> = ({ formData, handleChange }) => {
  return (
    <div className="bg-background-light dark:bg-background-dark rounded-xl border border-primary/20 p-6">
      <h2 className="text-[#161118] dark:text-[#f5f7f8] text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
        Detailed Review *
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-[#161118] dark:text-[#f5f7f8] text-sm font-medium mb-1">
            Review Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={10}
            className="w-full bg-white dark:bg-[#0f0f1a] border border-[#e2dbe6] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Write your detailed review here..."
          />
        </div>
      </div>
    </div>
  );
};

export default DetailedReviewSection;