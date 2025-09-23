// page.tsx
// This is the projects management page
"use client";

import React from 'react';
import TopNav from '@/app/components/topnav';
import Navbar from '@/app/components/navbar';
import DraftsPage from './DraftsPage';

const ProjectsManagementPage = () => {
  return (
    <div className="group/design-root relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Top navigation bar */}
      <TopNav />
      
      {/* Main content area with sidebar and main content */}
      <div className="flex flex-1">
        {/* Left sidebar navigation */}
        <Navbar />
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto">
          <DraftsPage />
        </main>
      </div>
    </div>
  );
};

export default ProjectsManagementPage;