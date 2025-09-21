// page.tsx
// This is the dynamic route page for individual project showcase cards
"use client";

import React from 'react';
import TopNav from '../../components/topnav';
import Navbar from '../../components/navbar';
import ProjectShowcaseDetail from './ProjectShowcaseDetail';
import { useParams } from 'next/navigation';

const ProjectCardPage = () => {
  const params = useParams();
  const projectId = params.id;

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
          {/* Project showcase detail content */}
          <ProjectShowcaseDetail projectId={projectId} />
        </main>
      </div>
    </div>
  );
};

export default ProjectCardPage;