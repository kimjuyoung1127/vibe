// ToolTechReviewCard.tsx
// This component displays a single tool/tech review card
"use client";

import React from 'react';
import Link from 'next/link';
import { ReviewCardProps } from '@/app/types/gear';
import DOMPurify from 'isomorphic-dompurify';
import { useTranslations } from '@/app/hooks/useTranslations';

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
  const { t } = useTranslations();
  
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
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-t-xl flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">{t('common.noImage', 'No image')}</span>
          </div>
        )}
        
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
          
          <div 
            className="text-sm text-black/60 dark:text-white/60 mb-4 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
          />
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
              <span className="text-sm font-medium text-black dark:text-white">
                {author}
              </span>
            </div>
            <span className="text-xs text-black/50 dark:text-white/50">
              {new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ToolTechReviewCard;