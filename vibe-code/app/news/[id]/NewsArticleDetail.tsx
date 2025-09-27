// NewsArticleDetail.tsx
// This component displays the detailed view of a news article with source links and related news
"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/app/lib/supabaseClient';
import { NewsArticle } from '@/app/news/admin/types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
      <div className="px-4 pb-6 text-[#161118] dark:text-[#f5f7f8] max-w-none">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-10 mb-6 text-primary dark:text-primary/90 border-b border-primary/20 pb-2" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-5 text-primary dark:text-primary/90 border-b border-primary/10 pb-1.5" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-6 mb-4 text-[#161118] dark:text-[#f5f7f8]" {...props} />,
            p: ({node, ...props}) => <p className="mb-5 leading-relaxed text-base text-[#161118] dark:text-[#f5f7f8]" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc list-inside mb-5 space-y-3 pl-5" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-5 space-y-3 pl-5" {...props} />,
            li: ({node, ...props}) => <li className="pl-2 text-[#161118] dark:text-[#f5f7f8]" {...props} />,
            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 italic bg-primary/5 dark:bg-primary/10 p-5 rounded-r-lg text-[#161118] dark:text-[#f5f7f8]" {...props} />,
            code: ({node, ...props}) => <code className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/90 px-2.5 py-1 rounded text-sm font-mono" {...props} />,
            pre: ({node, ...props}) => <pre className="bg-[#1a1a2e] p-5 rounded-lg overflow-x-auto my-6 text-sm" {...props} />,
            a: ({node, ...props}) => <a className="text-primary hover:underline font-medium" {...props} />,
            strong: ({node, ...props}) => <strong className="font-bold text-[#161118] dark:text-[#f5f7f8]" {...props} />,
            em: ({node, ...props}) => <em className="italic" {...props} />,
            hr: ({node, ...props}) => <hr className="my-8 border-t border-primary/20" {...props} />,
            table: ({node, ...props}) => <table className="min-w-full border-collapse my-6" {...props} />,
            thead: ({node, ...props}) => <thead className="bg-primary/10 dark:bg-primary/20" {...props} />,
            tbody: ({node, ...props}) => <tbody {...props} />,
            tr: ({node, ...props}) => <tr className="border-b border-primary/10" {...props} />,
            th: ({node, ...props}) => <th className="px-4 py-2 text-left font-semibold text-[#161118] dark:text-[#f5f7f8]" {...props} />,
            td: ({node, ...props}) => <td className="px-4 py-3 text-[#161118] dark:text-[#f5f7f8]" {...props} />,
          }}
        >
          {articleData.content}
        </ReactMarkdown>
      </div>
      
      {/* Explore More Section */}
      <ExploreMoreSection sourceUrl={articleData.source_url} />
      
      {/* Related News Section */}
      <RelatedNewsSection />
    </div>
  );
};

export default NewsArticleDetail;