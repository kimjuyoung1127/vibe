// ToolTechReviewDetail.tsx
// This component displays the detailed view of a tool/tech review
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import BackButton from './BackButton';
import Header from './Header';
import AuthorInfo from './AuthorInfo';
import ReviewImage from './ReviewImage';
import ReviewContent from './ReviewContent';
import Tags from './Tags';
import CommentsSection from './CommentsSection';
import { supabase } from '@/app/lib/supabaseClient';

interface ReviewData {
  id: string;
  title: string;
  tool_tech_name: string;
  overall_rating: number;
  one_liner_pros: string | null;
  one_liner_cons: string | null;
  content: string;
  hero_image_url: string | null;
  demo_video_url: string | null;
  font_preference: string;
  vibe_check_count: number;
  comment_count: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  author_name: string;
  author_username: string;
  author_avatar_url: string | null;
  categories: string[];
}

const ToolTechReviewDetail = () => {
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const reviewId = pathname?.split('/')[2]; // Extract review ID from URL

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch review data with author information
        const { data, error } = await supabase
          .from('tool_reviews')
          .select(`
            id,
            title,
            tool_tech_name,
            overall_rating,
            one_liner_pros,
            one_liner_cons,
            content,
            hero_image_url,
            demo_video_url,
            font_preference,
            vibe_check_count,
            comment_count,
            created_at,
            updated_at,
            user_id,
            user_profiles (
              display_name,
              username,
              avatar_url
            )
          `)
          .eq('id', reviewId)
          .single();

        if (error) throw error;

        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('review_categories')
          .select('category_name')
          .eq('review_id', reviewId);

        if (categoriesError) throw categoriesError;

        const categories = categoriesData.map((cat: any) => cat.category_name);

        // Format the data
        const formattedData: ReviewData = {
          ...data,
          author_name: data.user_profiles?.[0]?.display_name || 'Unknown Author',
          author_username: data.user_profiles?.[0]?.username || 'unknown',
          author_avatar_url: data.user_profiles?.[0]?.avatar_url || null,
          categories
        };

        setReviewData(formattedData);
      } catch (err: any) {
        console.error('Error fetching review data:', err);
        setError(err.message || 'Failed to load review data.');
      } finally {
        setLoading(false);
      }
    };

    if (reviewId) {
      fetchReviewData();
    }
  }, [reviewId]);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  if (loading) {
    return (
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1 p-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1 p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!reviewData) {
    return (
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1 p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">Review not found.</span>
        </div>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Format dates for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const publishDate = formatDate(reviewData.created_at);
  const lastUpdated = formatDate(reviewData.updated_at);
  const readTime = `${Math.max(1, Math.floor(reviewData.content.length / 1500))} min read`; // Rough estimate

  // Render star ratings
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center px-4 py-2">
        {[...Array(5)].map((_, i) => (
          <span 
            key={i} 
            className={`material-symbols-outlined text-base ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            star
          </span>
        ))}
        <span className="ml-2 text-[#161118] dark:text-[#f5f7f8] text-sm font-bold">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      {/* Back button */}
      <BackButton />
      
      {/* Page header */}
      <Header title={reviewData.title} category={reviewData.tool_tech_name} />
      
      {/* Rating display */}
      <div className="bg-background-light dark:bg-background-dark rounded-xl border border-primary/20 mb-4 max-w-max inline-block ml-4">
        {renderStars(reviewData.overall_rating)}
      </div>
      
      {/* Author information and metadata */}
      <AuthorInfo 
        author={reviewData.author_name}
        authorRole="Tool & Tech Reviewer"
        publishDate={publishDate}
        lastUpdated={lastUpdated}
        readTime={readTime}
        authorImageUrl={reviewData.author_avatar_url || ''}
        initialLikes={reviewData.vibe_check_count}
        onLike={handleLike}
        isLiked={isLiked}
      />
      
      {/* Review image */}
      {reviewData.hero_image_url && <ReviewImage imageUrl={reviewData.hero_image_url} />}
      
      {/* Review content */}
      <ReviewContent content={reviewData.content} />
      
      {/* One-liner Pros and Cons */}
      {(reviewData.one_liner_pros || reviewData.one_liner_cons) && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 ml-4">
          {reviewData.one_liner_pros && (
            <div className="bg-[#f5f7f8] dark:bg-[#0f0f1a] rounded-lg p-3 border border-primary/30 max-w-max inline-block">
              <h3 className="font-semibold mb-1 text-primary text-sm flex items-center">
                <span className="material-symbols-outlined text-base mr-2">thumb_up</span>
                Pros
              </h3>
              <p className="text-[#161118] dark:text-[#f5f7f8] text-sm">{reviewData.one_liner_pros}</p>
            </div>

          )}
          
          {reviewData.one_liner_cons && (
            <div className="bg-[#f5f7f8] dark:bg-[#0f0f1a] rounded-lg p-3 border border-primary/30 max-w-max inline-block">
              <h3 className="font-semibold mb-1 text-primary text-sm flex items-center">
                <span className="material-symbols-outlined text-base mr-2">thumb_down</span>
                Cons
              </h3>
              <p className="text-[#161118] dark:text-[#f5f7f8] text-sm">{reviewData.one_liner_cons}</p>
            </div>
          )}
        </div>
      )}
      
      {/* Tags */}
      <div className="pt-6">
        <Tags tags={reviewData.categories} />
      </div>
      
      {/* Comments section */}
      <div className="mt-12">
        <CommentsSection reviewId={reviewData.id} />
      </div>
    </div>
  );
};

export default ToolTechReviewDetail;