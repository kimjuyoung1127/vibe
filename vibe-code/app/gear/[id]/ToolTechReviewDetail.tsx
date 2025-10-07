// ToolTechReviewDetail.tsx
// This component displays the detailed view of a tool/tech review
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import VibeCheckButton from '@/app/components/VibeCheckButton';
import DropdownMenu from '@/app/components/DropdownMenu';
import ReportModal from '@/app/components/ReportModal';
import CommentSection from '@/app/components/commentSection';
import VibeEditorRenderer from '@/app/components/VibeEditorRenderer';
import AuthorProfile from '@/app/components/AuthorProfile';
import { supabase } from '@/app/lib/supabaseClient';

type ReviewData = {
  id: string;
  title: string;
  tool_tech_name: string;
  overall_rating: number;
  content: string;
  hero_image_url: string | null;
  demo_video_url: string | null;
  vibe_check_count: number;
  comment_count: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  author_name: string;
  author_username: string;
  author_avatar_url: string | null;
  categories: string[];
};

const ToolTechReviewDetail = () => {
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const reviewId = params.id as string;

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch review details from Supabase
        const { data, error } = await supabase
          .from('tool_reviews')
          .select(`
            id,
            title,
            tool_tech_name,
            overall_rating,
            content,
            hero_image_url,
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

        const formattedData: ReviewData = {
          id: data.id,
          title: data.title,
          tool_tech_name: data.tool_tech_name,
          overall_rating: data.overall_rating,
          content: data.content,
          hero_image_url: data.hero_image_url ?? null,
          demo_video_url: null, // Not currently stored in the database
          vibe_check_count: data.vibe_check_count,
          comment_count: data.comment_count,
          created_at: data.created_at,
          updated_at: data.updated_at,
          user_id: data.user_id,
          author_name: data.user_profiles?.[0]?.display_name || '',
          author_username: data.user_profiles?.[0]?.username || '',
          author_avatar_url: data.user_profiles?.[0]?.avatar_url || null,
          categories: categoriesData.map((cat: any) => cat.category_name)
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
    // This case should be covered by the error state, but added for safety
    return (
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1 p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">Review data not found.</span>
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
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };
  
  const postedDate = formatDate(reviewData.created_at);
  const updatedDate = formatDate(reviewData.updated_at);

  // Render star ratings
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center px-2 py-1">
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
      {/* Page header */}
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-[#161118] tracking-light text-[32px] font-bold leading-tight">{reviewData.title}</p>
          <p className="text-[#7c608a] text-sm font-normal leading-normal">
            {reviewData.tool_tech_name}
          </p>
        </div>
        {/* Vibe Check button and Report menu - Mobile view */}
        <div className="flex items-center md:hidden">
          <VibeCheckButton 
            targetId={reviewData.id} 
            targetType="tool_review" 
            initialCount={reviewData.vibe_check_count} 
          />
          <div className="ml-2">
            <DropdownMenu targetId={reviewData.id} contentType="tool_review">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-[#161118] dark:text-[#f5f7f8] hover:bg-primary/10 dark:hover:bg-primary/20"
                onClick={(e) => {
                  e.preventDefault();
                  setIsReportModalOpen(true);
                }}
              >
                Report
              </button>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* 데스크탑 전용: 헤더 아래로 위치 */}
      <div className="hidden md:block px-4">
        <div className="flex items-center pb-4">
          <VibeCheckButton 
            targetId={reviewData.id} 
            targetType="tool_review" 
            initialCount={reviewData.vibe_check_count} 
          />
          <div className="ml-4">
            <DropdownMenu targetId={reviewData.id} contentType="tool_review">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-[#161118] dark:text-[#f5f7f8] hover:bg-primary/10 dark:hover:bg-primary/20"
                onClick={(e) => {
                  e.preventDefault();
                  setIsReportModalOpen(true);
                }}
              >
                Report
              </button>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {/* Report Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        targetId={reviewData.id}
        targetType="tool_review"
      />
      
      {/* Review image */}
      {reviewData.hero_image_url && (
        <div className="px-4 py-6">
          <img
            src={reviewData.hero_image_url}
            alt={reviewData.tool_tech_name}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
          />
        </div>
      )}
      
      {/* Review content */}
      <div className="px-4 py-6">
        <VibeEditorRenderer 
          content={reviewData.content || ''} 
          maxWidthClass="max-w-[65ch]" 
          containerClass="max-w-[672px] md:max-w-[768px] lg:max-w-[896px] xl:max-w-[960px] mx-auto"
        />
      </div>
      
      {/* Star rating section */}
      <div className="px-4 py-3 bg-[#f8f5fa] dark:bg-[#2a2a3e] rounded-lg mx-4 mb-4 max-w-max">
        <h2 className="text-[#161118] dark:text-[#f5f7f8] text-lg font-semibold mb-2">Overall Rating</h2>
        {renderStars(reviewData.overall_rating)}
      </div>
      
      {/* Category tags section */}
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Categories & Tags</h2>
      <div className="px-4 flex flex-wrap gap-2">
        {reviewData.categories.length > 0 ? (
          reviewData.categories.map((tag, index) => (
            <span 
              key={index} 
              className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm"
            >
              {tag}
            </span>
          ))
        ) : (
          <p className="text-[#7c608a] text-sm">No categories specified</p>
        )}
      </div>
      
      {/* Author information section */}
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Author Information</h2>
      <div className="p-4">
        <AuthorProfile userId={reviewData.user_id} showFullProfile={false} />
      </div>
      
      {/* Comments section */}
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Comments</h2>
      <CommentSection targetId={reviewData.id} postType="review" />
    </div>
  );
};

export default ToolTechReviewDetail;