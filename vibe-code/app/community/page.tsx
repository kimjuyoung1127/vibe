// page.tsx
// This is the main Coding Lounge page with feed format
"use client";

import React from 'react';
import TopNavWrapper from '../components/TopNavWrapper';
import NavbarWrapper from '../components/NavbarWrapper';
import CommunityHeader from './CommunityHeader';
import CommunityPosts from './CommunityPosts';

const CommunityPage = () => {
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
          {/* Community header */}
          <CommunityHeader />
          
          {/* Community posts feed */}
          <CommunityPosts />
        </main>
      </div>
    </div>
  );
};

export default CommunityPage;