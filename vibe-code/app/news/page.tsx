// page.tsx
// This is the main News page that displays a list of news articles
"use client";

import React from 'react';
import NewsHeader from './NewsHeader';
import NewsArticles from './NewsArticles';

const NewsPage = () => {
  return (
    <>
      {/* News header */}
      <NewsHeader />
      
      {/* News articles */}
      <NewsArticles />
    </>
  );
};

export default NewsPage;