// CoreInfoSection.tsx
// This component contains the core information section of the project create form
"use client";

import React, { useState } from 'react';
import TaglineDropdown from '@/app/components/TaglineDropdown'; // Import the new TaglineDropdown component
import ImageUpload from '@/app/components/ImageUpload'; // Import the new ImageUpload component
import { supabase } from '@/app/lib/supabaseClient';

// Define the props interface
interface CoreInfoSectionProps {
  title: string;
  setTitle: (title: string) => void;
  tagline: string; // This will now be managed by TaglineDropdown
  setTagline: (tagline: string) => void; // This will now be managed by TaglineDropdown
  heroImageUrl: string;
  setHeroImageUrl: (url: string) => void;
  errors: Record<string, string>; // Added errors prop for validation
}

const CoreInfoSection = ({
  title,
  setTitle,
  tagline,
  setTagline,
  heroImageUrl,
  setHeroImageUrl,
  errors
}: CoreInfoSectionProps) => {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleUploadSuccess = (url: string) => {
    setHeroImageUrl(url);
    setUploadSuccess(true);
    setUploadError('');
    
    // Clear success message after 3 seconds
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  const handleUploadError = (error: string) => {
    setUploadError(error);
    setUploadSuccess(false);
    
    // Clear error message after 5 seconds
    setTimeout(() => setUploadError(''), 5000);
  };

  return (
    <div>
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Core Project Information</h2>
      
      {/* Project Title */}
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#161118] text-base font-medium leading-normal pb-2">Project Title *</p>
          <input
            placeholder="Enter project title"
            className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#161118] focus:outline-0 focus:ring-0 border-none bg-[#f3f0f5] focus:border-none h-14 placeholder:text-[#7c608a] p-4 text-base font-normal leading-normal ${
              errors.title ? 'border-2 border-red-500' : ''
            }`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </label>
      </div>
      
      {/* Project Tagline - Using the new TaglineDropdown component */}
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <TaglineDropdown
          selectedTagline={tagline}
          onSelect={setTagline}
          placeholder="Select or enter a one-line summary (Tagline)"
          title="One-line Summary (Tagline) *"
          error={errors.tagline}
        />
      </div>
      
      {/* Hero Image Upload */}
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#161118] text-base font-medium leading-normal pb-2">Project Thumbnail</p>
          <ImageUpload
            onUploadSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
            currentImageUrl={heroImageUrl}
            bucketName="project-images"
          />
        </label>
      </div>
      
      {/* Upload Status Messages */}
      {uploadSuccess && (
        <div className="px-4 py-2">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Success! </strong>
            <span className="block sm:inline">Image uploaded successfully.</span>
          </div>
        </div>
      )}
      
      {uploadError && (
        <div className="px-4 py-2">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{uploadError}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoreInfoSection;