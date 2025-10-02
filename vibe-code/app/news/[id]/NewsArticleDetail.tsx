
"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/app/lib/supabaseClient';
import VibeEditorRenderer from '@/app/components/VibeEditorRenderer';
import ExploreMoreSection from './ExploreMoreSection';
import RelatedNewsSection from './RelatedNewsSection';

// Define the NewsArticle interface locally since admin directory is excluded
interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  source_name: string;
  source_url: string;
  crawled_at: string;
  published_at: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  admin_id: string | null;
  hero_image_url: string | null;
  vibe_check_count: number;
  comment_count: number;
}

const NewsArticleDetail = () => {
  const { id } = useParams();
  const [articleData, setArticleData] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    // 7일 이상 지났으면 전체 날짜 표시
    if (seconds > 60 * 60 * 24 * 7) {
      return past.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    
    let interval = seconds / 86400; // days
    if (interval > 1) {
      const days = Math.floor(interval);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    interval = seconds / 3600; // hours
    if (interval > 1) {
      const hours = Math.floor(interval);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    interval = seconds / 60; // minutes
    if (interval > 1) {
      const minutes = Math.floor(interval);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
    return 'just now';
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data, error } = await supabase
          .from('news_articles')
          .select('*')
          .eq('id', id)
          .eq('is_published', true)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        if (data) {
          setArticleData(data);
        }
      } catch (err) {
        console.error('Error fetching news article:', err);
        setError('Failed to load news article');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1 flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !articleData) {
    return (
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1 px-4 py-10 text-center">
        <p className="text-red-500">{error || 'Article not found'}</p>
        <Link 
          href="/news" 
          className="mt-4 text-primary hover:underline"
        >
          Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      {/* Back button */}
      <div className="px-4 py-6">
        <Link 
          href="/news" 
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span>Back to News</span>
        </Link>
      </div>
      
      {/* Page header */}
      <div className="px-4 pb-6">
        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#161118] dark:text-[#f5f7f8] tracking-light text-[32px] font-bold leading-tight">
              {articleData.title}
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 dark:bg-primary/20 rounded-full">
                Technology News
              </span>
            </div>
          </div>
        </div>
      </div>
      
     
      
      {/* Author information and metadata */}
      <div className="flex px-4 pb-6 @container">
        <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
          <div className="flex gap-4">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-16 w-16"
              style={{ backgroundImage: 'url("https://placehold.co/64x64/4f46e5/white?text=VN")' }}
            ></div>
            <div className="flex flex-col justify-center">
              <p className="text-[#161118] dark:text-[#f5f7f8] text-[18px] font-bold leading-tight tracking-[-0.015em]">
                {articleData.source_name || 'Vibe News'}
              </p>
              <p className="text-[#7c608a] dark:text-[#c5b3d1] text-base font-normal leading-normal">
                {formatTimeAgo(articleData.published_at || articleData.created_at)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 px-3 py-1 text-[#7c608a] dark:text-[#c5b3d1] hover:text-[#161118] dark:hover:text-[#f5f7f8] rounded-full hover:bg-primary/10 dark:hover:bg-primary/20">
              <span className="material-symbols-outlined">share</span>
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

       {/* Article image */}
      {articleData.hero_image_url && (
        <div className="px-4 py-6">
          <img
            src={articleData.hero_image_url}
            alt={articleData.title}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
          />
        </div>
      )}
      
      {/* Article content */}
      <VibeEditorRenderer 
        content={articleData.content || ''} 
        maxWidthClass="max-w-[65ch]" 
        containerClass="max-w-[672px] md:max-w-[768px] lg:max-w-[896px] xl:max-w-[960px] mx-auto"
      />
      
      {/* Explore More Section */}
      <ExploreMoreSection sourceUrl={articleData.source_url} />
      
      {/* Related News Section */}
      <RelatedNewsSection />
    </div>
  );
};

export default NewsArticleDetail;