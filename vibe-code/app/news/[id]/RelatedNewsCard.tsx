// RelatedNewsCard.tsx
// This component displays a related news card
"use client";

import React from 'react';
import Link from 'next/link';

interface RelatedNewsCardProps {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  imageUrl: string;
}

const RelatedNewsCard: React.FC<RelatedNewsCardProps> = ({ 
  id, 
  title, 
  category, 
  excerpt,
  imageUrl
}) => {
  return (
    <Link href={`/news/${id}`} className="block">
      <div className="overflow-hidden rounded-lg border border-primary/20 bg-background-light shadow-lg shadow-primary/10 dark:border-primary/30 dark:bg-background-dark hover:shadow-xl transition-all duration-300">
        {/* Article image */}
        <div 
          className="w-full h-32 bg-cover bg-center" 
          style={{ backgroundImage: `url("${imageUrl}")` }}
        ></div>
        
        {/* Article content */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-primary bg-primary/10 dark:bg-primary/20 rounded-full">
              {category}
            </span>
          </div>
          
          <h3 className="text-base font-bold text-black dark:text-white mb-2 line-clamp-2">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default RelatedNewsCard;