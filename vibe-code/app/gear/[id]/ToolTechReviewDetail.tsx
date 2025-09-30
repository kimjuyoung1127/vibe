// ToolTechReviewDetail.tsx
// This component displays the detailed view of a tool/tech review
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import BackButton from './BackButton';
import Header from './Header';
import AuthorInfo from './AuthorInfo';
import ReviewImage from './ReviewImage';
import ToolTechReviewContent from './ToolTechReviewContent';
import Tags from './Tags';
import CommentSection from '@/app/components/commentSection';
import DropdownMenu from '@/app/components/DropdownMenu';
import ReportModal from '@/app/components/ReportModal';
import { supabase } from '@/app/lib/supabaseClient';
import { ReviewData } from '@/app/types/gear';

const ToolTechReviewDetail = () => {
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const reviewId = pathname?.split('/')[2]; // Extract review ID from URL

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('tool_reviews')
          .select(`
            id,
            title,
            tool_tech_name,
            overall_rating,
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

        const { data: categoriesData, error: categoriesError } = await supabase
          .from('review_categories')
          .select('category_name')
          .eq('review_id', reviewId);

        if (categoriesError) throw categoriesError;

        const categories = categoriesData.map((cat: any) => cat.category_name);

        const formattedData: ReviewData = {
          id: data.id,
          title: data.title,
          tool_tech_name: data.tool_tech_name,
          overall_rating: data.overall_rating,
          content: data.content,
          hero_image_url: data.hero_image_url ?? null,
          demo_video_url: data.demo_video_url ?? null,
          font_preference: data.font_preference,
          vibe_check_count: data.vibe_check_count,
          comment_count: data.comment_count,
          created_at: data.created_at,
          updated_at: data.updated_at,
          user_id: data.user_id,
          author_name: data.user_profiles?.[0]?.display_name || '',
          author_username: data.user_profiles?.[0]?.username || '',
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
        reviewId={reviewData.id}
        authorId={reviewData.user_id}
        contentType="tool_review"
        onReportClick={() => setIsReportModalOpen(true)}
      />
      {/* Review image */}
      {reviewData.hero_image_url && <ReviewImage imageUrl={reviewData.hero_image_url} />}
      {/* Review content */}
      <ToolTechReviewContent content={reviewData.content} />
      {/* Tags */}
      <div className="pt-6">
        <Tags tags={reviewData.categories} />
      </div>
      {/* Comments section */}
      <div className="mt-12">
        <CommentSection targetId={reviewData.id} postType="review" />
      </div>
      
      {/* Report Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        targetId={reviewData.id}
        targetType="tool_review"
      />
    </div>
  );
};

export default ToolTechReviewDetail;