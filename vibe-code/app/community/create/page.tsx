// page.tsx
// This is the page for creating new community posts
"use client";

import React from 'react';
import NavbarWrapper from '../../components/NavbarWrapper';
import CommunityPostForm from './CommunityPostForm';
import AuthGuard from '../../components/AuthGuard';

const CreateCommunityPostPage = () => {
  return (
    <div className="group/design-root relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Main content area with sidebar and main content */}
      <div className="flex flex-1">
        {/* Left sidebar navigation */}
        <NavbarWrapper />
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto">
          {/* Protect the form with authentication guard */}
          <AuthGuard>
            <CommunityPostForm />
          </AuthGuard>
        </main>
      </div>
    </div>
  );
};

export default CreateCommunityPostPage;