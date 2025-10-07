// page.tsx
// This is the main page for creating new tool/tech reviews
"use client";

import React from 'react';
import ToolTechReviewForm from './ToolTechReviewForm';
import AuthGuard from '../../components/AuthGuard';

const NewToolTechReviewPage = () => {
  return (
    <div className="group/design-root relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Main content area with sidebar and main content */}
      <div className="flex flex-1">
        {/* Left sidebar navigation */}

        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto">
          {/* Protect the form with authentication guard */}
          <AuthGuard>
            <ToolTechReviewForm />
          </AuthGuard>
        </main>
      </div>
    </div>
  );
};

export default NewToolTechReviewPage;