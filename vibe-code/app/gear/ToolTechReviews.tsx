// ToolTechReviews.tsx
// This component displays the grid of tool/tech reviews
"use client";

import React, { useState, useEffect } from 'react';
import ToolTechReviewCard from './ToolTechReviewCard';
import { supabase } from '@/app/lib/supabaseClient';
import { ToolReview } from '@/app/types/gear';

const ToolTechReviews = () => {
  const [reviews, setReviews] = useState<ToolReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from('tool_reviews')
          .select(`
            id,
            title,
            tool_tech_name,
            overall_rating,
            content,
            hero_image_url,
            created_at,
            updated_at,
            user_profiles (display_name)
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setReviews(data || []);
      } catch (error: any) {
        console.error('Error fetching tool reviews:', error);
        setError(error.message || 'Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="px-4 pb-8 md:px-6 lg:px-8 flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 pb-8 md:px-6 lg:px-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-8 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <ToolTechReviewCard
            key={review.id}
            id={review.id}
            title={review.title}
            category={review.tool_tech_name}
            description={review.content.replace(/<[^>]*>/g, '').substring(0, 150) + (review.content.length > 150 ? '...' : '')}
            author={review.user_profiles?.[0]?.display_name || 'Unknown Author'}
            date={review.created_at}
            rating={review.overall_rating}
            imageUrl={review.hero_image_url || 'https://placehold.co/600x400?text=No+Image'}
          />
        ))}
      </div>
    </div>
  );
};

export default ToolTechReviews;