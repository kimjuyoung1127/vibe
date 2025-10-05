// page.tsx
// This is the main page for creating new tool/tech reviews
"use client";

import React from 'react';
import TopNavWrapper from '../../components/TopNavWrapper';
import ToolTechReviewForm from './ToolTechReviewForm';

const NewToolTechReviewPage = () => {
  return (
    <div className="group/design-root relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Top navigation bar */}

      
      {/* Main content area with sidebar and main content */}
      <div className="flex flex-1">
        {/* Left sidebar navigation */}

        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto">
          {/* Tool/tech review form */}
          <ToolTechReviewForm />
        </main>
      </div>
    </div>
  );
};

export default NewToolTechReviewPage;