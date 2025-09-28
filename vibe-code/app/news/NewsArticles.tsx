// NewsArticles.tsx
// This component displays the grid of news articles
"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/app/lib/supabaseClient';
import NewsArticleCard from './NewsArticleCard';
import { NewsArticle } from './admin/types';

const NewsArticles = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 9; // 3 cards per row on large screens, 9 total per page

  const searchParams = useSearchParams();
  useEffect(() => {
    const page = searchParams.get('page');
    if (page && !isNaN(Number(page))) {
      setCurrentPage(Number(page));
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        
        // Get total count first
        const { count, error: countError } = await supabase
          .from('news_articles')
          .select('*', { count: 'exact', head: true })
          .eq('is_published', true);

        if (countError) {
          throw new Error(countError.message);
        }

        if (count !== null) {
          setTotalPages(Math.ceil(count / itemsPerPage));
        }

        // Fetch paginated data
        const { data, error } = await supabase
          .from('news_articles')
          .select('*')
          .eq('is_published', true)
          .order('published_at', { ascending: false })
          .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

        if (error) {
          throw new Error(error.message);
        }

        if (data) {
          setArticles(data);
        }
      } catch (err) {
        console.error('Error fetching news articles:', err);
        setError('Failed to load news articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      // Update URL with new page
      const params = new URLSearchParams(window.location.search);
      params.set('page', page.toString());
      window.history.pushState({}, '', `${window.location.pathname}?${params}`);
      
      setCurrentPage(page);
      
      // Scroll to top of articles section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="px-4 pb-8 md:px-6 lg:px-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 pb-8 md:px-6 lg:px-8 text-center py-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="px-4 pb-8 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsArticleCard
            key={article.id}
            id={article.id}
            category="Technology News" // Using a generic category since it's not in the DB schema
            title={article.title}
            excerpt={article.summary}
            author={article.source_name || "Vibe News"}
            date={article.published_at ? new Date(article.published_at).toLocaleDateString() : new Date(article.created_at).toLocaleDateString()}
            readTime="5 min read" // Placeholder, could be calculated from content length
            imageUrl={article.hero_image_url || ''}
          />
        ))}
      </div>
      
      {/* Dynamic Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-1">
            <button 
              className={`px-3 py-2 rounded-lg ${currentPage === 1 ? 'bg-background-light dark:bg-background-dark text-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90'}`}
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                // Show all pages if total is 5 or less
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                // If near start, show 1, 2, 3, 4, 5
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                // If near end, show last 5 pages
                pageNum = totalPages - 4 + i;
              } else {
                // Show current page in middle
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  className={`px-3 py-2 rounded-lg ${currentPage === pageNum ? 'bg-primary text-white' : 'bg-background-light dark:bg-background-dark text-black dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20'}`}
                  onClick={() => goToPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button 
              className={`px-3 py-2 rounded-lg ${currentPage === totalPages ? 'bg-background-light dark:bg-background-dark text-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90'}`}
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsArticles;