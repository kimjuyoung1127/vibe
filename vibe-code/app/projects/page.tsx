
"use client";

import React from 'react';


import ProjectsShowcase from './ProjectsShowcase';

const ProjectsPage = () => {
  return (
    <div className="group/design-root relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Top navigation bar */}

      
      {/* Main content area with sidebar and main content */}
      <div className="flex flex-1">
        {/* Left sidebar navigation */}

        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto">
          {/* Projects showcase content */}
          <ProjectsShowcase />
        </main>
      </div>
    </div>
  );
};

export default ProjectsPage;