"use client";

import React from 'react';
import TopNavWrapper from '../../components/TopNavWrapper';
import NavbarWrapper from '../../components/NavbarWrapper';
import ToolTechReviewDetail from './ToolTechReviewDetail';

const ToolTechReviewDetailPage = () => {
  return (
    <div className="group/design-root relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Top navigation bar */}
      <TopNavWrapper />
      
      {/* Main content area with sidebar and main content */}
      <div className="flex flex-1">
        {/* Left sidebar navigation */}
        <NavbarWrapper />
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto">
          {/* Tool/tech review detail content */}
          <ToolTechReviewDetail />
        </main>
      </div>
    </div>
  );
};

export default ToolTechReviewDetailPage;