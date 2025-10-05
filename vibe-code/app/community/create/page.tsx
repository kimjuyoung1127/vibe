// page.tsx
// This is the page for creating new community posts
"use client";

import React from 'react';
import TopNavWrapper from '../../components/TopNavWrapper';
import NavbarWrapper from '../../components/NavbarWrapper';
import CommunityPostForm from './CommunityPostForm';

const CreateCommunityPostPage = () => {
  return (
    <div className="group/design-root relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Top navigation bar */}

      
      {/* Main content area with sidebar and main content */}
      <div className="flex flex-1">
        {/* Left sidebar navigation */}
        
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto">
          {/* Community post form */}
          <CommunityPostForm />
        </main>
      </div>
    </div>
  );
};

export default CreateCommunityPostPage;