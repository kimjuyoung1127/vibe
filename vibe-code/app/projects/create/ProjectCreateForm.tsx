// ProjectCreateForm.tsx
// This component contains the form for creating/editing projects
"use client";

import React, { useState } from 'react';
import CoreInfoSection from './CoreInfoSection';
import DescriptionSection from './DescriptionSection';
import CategorizationSection from './CategorizationSection';
import LinksSection from './LinksSection';
import StatusSection from './StatusSection';

const ProjectCreateForm = () => {
  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would validate the form and submit the data
    console.log('Submitting project...');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        {/* Page header */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#161118] tracking-light text-[32px] font-bold leading-tight">Create/Edit Project Showcase</p>
            <p className="text-[#7c608a] text-sm font-normal leading-normal">
              Share your project with the Vibe Code community. Fill out the details below to create or update your project showcase.
            </p>
          </div>
        </div>
        
        {/* Core information section */}
        <CoreInfoSection />
        
        {/* Detailed description section */}
        <DescriptionSection />
        
        {/* Categorization & specifications section */}
        <CategorizationSection />
        
        {/* Project links section */}
        <LinksSection />
        
        {/* Status & actions section */}
        <StatusSection />
      </div>
    </form>
  );
};

export default ProjectCreateForm;