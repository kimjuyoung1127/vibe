
"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/app/lib/supabaseClient';
import { NewsArticle } from '@/app/news/admin/types';
import ContentRenderer from '@/app/components/ContentRenderer';
import ExploreMoreSection from './ExploreMoreSection';
import RelatedNewsSection from './RelatedNewsSection';

const NewsArticleDetail = () => {
  const { id } = useParams();
  const [articleData, setArticleData] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
              style={{ backgroundImage: `url("${articleData.hero_image_url || ''}")` }}
            ></div>
            <div className="flex flex-col justify-center">
              <p className="text-[#161118] dark:text-[#f5f7f8] text-[18px] font-bold leading-tight tracking-[-0.015em]">
                {articleData.source_name || 'Vibe News'}
              </p>
              <p className="text-[#7c608a] dark:text-[#c5b3d1] text-base font-normal leading-normal">
                {articleData.published_at 
                  ? new Date(articleData.published_at).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }) 
                  : new Date(articleData.created_at).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })} · 5 min read
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
      <div className="@container mb-6">
        <div className="px-4">
          <div
            className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-white dark:bg-[#0f0f1a] rounded-lg min-h-80"
            style={{ backgroundImage: `url("${articleData.hero_image_url || ''}")` }}
          ></div>
        </div>
      </div>
      
      {/* Article content */}
      <ContentRenderer content={articleData.content} />
      
      {/* Explore More Section */}
      <ExploreMoreSection sourceUrl={articleData.source_url} />
      
      {/* Related News Section */}
      <RelatedNewsSection />
    </div>
  );
};

export default NewsArticleDetail;