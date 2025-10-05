// page.tsx
// This is the main Coding Lounge page with feed format
"use client";

import React from 'react';
import CommunityHeader from './CommunityHeader';
import CommunityPosts from './CommunityPosts';

const CommunityPage = () => {
  return (
    <>
      {/* Community header */}
      <CommunityHeader />
      
      {/* Community posts feed */}
      <CommunityPosts />
    </>
  );
};

export default CommunityPage;