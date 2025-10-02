// page.tsx
// This is the main News page that displays a list of news articles
"use client";

import React from 'react';
import TopNavWrapper from '../components/TopNavWrapper';
import NavbarWrapper from '../components/NavbarWrapper';
import NewsHeader from './NewsHeader';
import NewsArticles from './NewsArticles';

const NewsPage = () => {
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
          {/* News header */}
          <NewsHeader />
          
          {/* News articles */}
          <NewsArticles />
        </main>
      </div>
    </div>
  );
};

export default NewsPage;