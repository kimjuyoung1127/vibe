// RelatedNewsSection.tsx
// This component displays the related news section
"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/app/lib/supabaseClient';
import RelatedNewsCard from './RelatedNewsCard';

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

// NewsArticle 전체가 아닌, 관련 카드에 필요한 필드만 가진 타입
type RelatedNewsItem = Pick<
  NewsArticle,
  'id' | 'title' | 'summary' | 'source_name' | 'hero_image_url' | 'created_at'
> & { content?: string };

const RelatedNewsSection: React.FC = () => {
  const { id } = useParams();
  const [relatedNews, setRelatedNews] = useState<RelatedNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedNews = async () => {
      if (!id) return;

      try {
        // Fetch the current article to get its source_name for finding related articles
        const { data: currentArticle, error: currentArticleError } = await supabase
          .from('news_articles')
          .select('source_name')
          .eq('id', id)
          .single();

        if (currentArticleError) {
          throw new Error(currentArticleError.message);
        }

        // Fetch related articles based on the same source
        const { data, error } = await supabase
          .from('news_articles')
          // content를 포함시켜 excerpt 계산이 안전하도록 함
          .select('id, title, summary, source_name, hero_image_url, created_at, content')
          .eq('source_name', currentArticle.source_name)
          .neq('id', id) // Exclude current article
          .eq('is_published', true)
          .order('published_at', { ascending: false })
          .limit(6); // Fetch more than 3 for better related content

        if (error) {
          throw new Error(error.message);
        }

        if (data) {
          // 안전한 정규화: 잘못된 항목 제거 및 필드 타입 강제
          setRelatedNews(
            Array.isArray(data)
              ? data
                  .filter(Boolean)
                  .map((item: any): RelatedNewsItem => ({
                    id: String(item.id),
                    title: String(item.title ?? ''),
                    summary: String(item.summary ?? ''),
                    source_name: String(item.source_name ?? ''),
                    hero_image_url: String(item.hero_image_url ?? ''),
                    created_at: String(item.created_at ?? new Date().toISOString()),
                    content: typeof item.content === 'string' ? item.content : undefined,
                  }))
                  // id가 비어있는 항목은 최종적으로 제외
                  .filter((it) => !!it.id)
              : []
          );
        }
      } catch (err) {
        console.error('Error fetching related news:', err);
        setError('Failed to load related news');
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedNews();
  }, [id]);

  if (loading) {
    return (
      <div className="px-4 pb-8">
        <h2 className="text-[#161118] dark:text-[#f5f7f8] text-[22px] font-bold leading-tight tracking-[-0.015em] pb-4">
          Related News
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, index) => (
            <div 
              key={index} 
              className="overflow-hidden rounded-lg border border-primary/20 bg-background-light shadow-lg shadow-primary/10 dark:border-primary/30 dark:bg-background-dark"
            >
              <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || relatedNews.length === 0) {
    return null; // Don't render the section if there's an error or no related articles
  }

  return (
    <div className="px-4 pb-8">
      <h2 className="text-[#161118] dark:text-[#f5f7f8] text-[22px] font-bold leading-tight tracking-[-0.015em] pb-4">
        Related News
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedNews.map((news) => (
          <RelatedNewsCard
            key={news.id}
            id={news.id}
            title={news.title}
            category="Technology News"
            // 안전한 excerpt 계산
            excerpt={
              news.summary?.trim()
                ? news.summary
                : typeof news.content === 'string'
                ? `${news.content.slice(0, 100)}...`
                : ''
            }
            imageUrl={news.hero_image_url || ''}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedNewsSection;