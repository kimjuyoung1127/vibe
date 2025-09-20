// page.tsx
// This is the project create page for Vibe Code
"use client";

import React from 'react';
import TopNav from '../../components/topnav';
import Navbar from '../../components/navbar';
import ProjectCreateForm from './ProjectCreateForm';

const ProjectCreatePage = () => {
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
          {/* Project create form */}
          <ProjectCreateForm />
        </main>
      </div>
    </div>
  );
};

export default ProjectCreatePage;