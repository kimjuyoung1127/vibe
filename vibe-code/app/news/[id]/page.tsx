// page.tsx
// This is the dynamic route page for individual news article details
"use client";

import React, { useEffect } from 'react';
import NewsArticleDetail from './NewsArticleDetail';

const NewsArticleDetailPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* News article detail content */}
      <NewsArticleDetail />
    </>
  );
};

export default NewsArticleDetailPage;