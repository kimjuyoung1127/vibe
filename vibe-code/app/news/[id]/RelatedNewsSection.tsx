// RelatedNewsSection.tsx
// This component displays the related news section
"use client";

import React from 'react';
import RelatedNewsCard from './RelatedNewsCard';

interface RelatedNewsItem {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  imageUrl: string;
}

interface RelatedNewsSectionProps {
  relatedNews: RelatedNewsItem[];
}

const RelatedNewsSection: React.FC<RelatedNewsSectionProps> = ({ relatedNews }) => {
  return (
    <div className="px-4 pb-8">
      <h2 className="text-[#161118] dark:text-[#f5f7f8] text-[22px] font-bold leading-tight tracking-[-0.015em] pb-4">
        Related News
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedNews.map((news) => (
          <RelatedNewsCard
            key={news.id}
            id={news.id}
            title={news.title}
            category={news.category}
            excerpt={news.excerpt}
            imageUrl={news.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedNewsSection;