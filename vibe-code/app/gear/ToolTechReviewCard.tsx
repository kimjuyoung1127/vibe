// ToolTechReviewCard.tsx
// This component displays a single tool/tech review card
"use client";

import React from 'react';
import Link from 'next/link';

interface ReviewCardProps {
  id: number;
  title: string;
  category: string;
  description: string;
  author: string;
  date: string;
  rating: number;
  imageUrl: string;
}

const ToolTechReviewCard: React.FC<ReviewCardProps> = ({ 
  id, 
  title, 
  category, 
  description, 
  author, 
  date, 
  rating,
  imageUrl
}) => {
  // Render star ratings
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span 
            key={i} 
            className={`material-symbols-outlined text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            star
          </span>
        ))}
      </div>
    );
  };

  return (
    <Link href={`/gear/${id}`} className="block">
      <div className="overflow-hidden rounded-xl border border-primary/20 bg-background-light shadow-lg shadow-primary/10 dark:border-primary/30 dark:bg-background-dark hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Review image */}
        <div 
          className="w-full h-48 bg-cover bg-center" 
          style={{ backgroundImage: `url("${imageUrl}")` }}
        ></div>
        
        {/* Review content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 dark:bg-primary/20 rounded-full">
              {category}
            </span>
            {renderStars(rating)}
          </div>
          
          <h3 className="text-xl font-bold text-black dark:text-white mb-2 line-clamp-2">
            {title}
          </h3>
          
          <p className="text-sm text-black/60 dark:text-white/60 mb-4 line-clamp-3">
            {description}
          </p>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
              <span className="text-sm font-medium text-black dark:text-white">
                {author}
              </span>
            </div>
            <span className="text-xs text-black/50 dark:text-white/50">
              {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ToolTechReviewCard;