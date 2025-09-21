// page.tsx
// This is the dynamic route page for individual news article details
"use client";

import React from 'react';
import TopNav from '../../components/topnav';
import Navbar from '../../components/navbar';
import NewsArticleDetail from './NewsArticleDetail';

const NewsArticleDetailPage = () => {
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
          {/* News article detail content */}
          <NewsArticleDetail />
        </main>
      </div>
    </div>
  );
};

export default NewsArticleDetailPage;