// page.tsx
// This is the project create page for Vibe Code
"use client";

import React from 'react';
import ProjectCreateForm from './ProjectCreateForm';
import AuthGuard from '../../components/AuthGuard';

const ProjectCreatePage = () => {
  return (
    <div className="group/design-root relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Main content area with sidebar and main content */}
      <div className="flex flex-1">
        {/* Left sidebar navigation */}
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto">
          {/* Protect the form with authentication guard */}
          <AuthGuard>
            <ProjectCreateForm />
          </AuthGuard>
        </main>
      </div>
    </div>
  );
};

export default ProjectCreatePage;