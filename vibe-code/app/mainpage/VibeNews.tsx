// VibeNews.tsx
// This component displays the latest news articles in the Vibe News section
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/app/lib/supabaseClient';

// Define the type for a news item
interface NewsItem {
  id: string; // Changed from number to string as Supabase IDs are UUIDs
  category: string; // We'll need to get this from the news_categories table
  title: string;
  summary: string; // Changed from description to summary as per table schema
  hero_image_url: string; // Changed from imageUrl to hero_image_url as per table schema
  imagePosition: 'left' | 'right';
}

const VibeNews = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        // First, get the latest published news articles
        let { data: articles, error: articlesError } = await supabase
          .from('news_articles')
          .select(`
            id, 
            title, 
            summary, 
            hero_image_url,
            created_at
          `)
          .eq('is_published', true) // Only published articles
          .order('created_at', { ascending: false })
          .limit(3); // Get the 3 most recent articles

        if (articlesError) {
          throw new Error(articlesError.message);
        }

        if (articles) {
          // For each article, get its categories
          const newsData: NewsItem[] = [];
          
          for (const article of articles) {
            // Get the first category for this article
            const { data: categories, error: categoriesError } = await supabase
              .from('news_categories')
              .select('category_name')
              .eq('article_id', article.id)
              .limit(1);

            if (categoriesError) {
              console.error(`Error fetching categories for article ${article.id}:`, categoriesError);
            }

            // Select a random image position for alternating layout
            const imagePosition: 'left' | 'right' = Math.random() > 0.5 ? 'right' : 'left';

            newsData.push({
              id: article.id,
              category: categories && categories.length > 0 ? categories[0].category_name : 'News',
              title: article.title,
              summary: article.summary,
              hero_image_url: article.hero_image_url,
              imagePosition
            });
          }

          // Limit to first 3 news items for better display on main page
          setNewsItems(newsData.slice(0, 3));
        }
      } catch (err: any) {
        console.error('Error fetching latest news:', err);
        setError(err.message || 'An error occurred while fetching the latest news');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  if (loading) {
    return (
      <div className="px-4 pb-6 pt-4 md:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">Latest Vibe News</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[...Array(3)].map((_, index) => (
            <div 
              key={index} 
              className="flex w-72 flex-shrink-0 flex-col gap-3 rounded-xl border border-primary/20 bg-background-light p-3 shadow-lg shadow-primary/10 dark:border-primary/30 dark:bg-background-dark"
            >
              <div className="aspect-video w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/5"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 pb-6 pt-4 md:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">Latest Vibe News</h2>
        <div className="text-red-500 w-full text-center py-8">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-6 pt-4 md:px-6 lg:px-8">
      {/* Section title */}
      <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">Latest Vibe News</h2>
      
      {/* Container for scrollable content with improved mobile experience */}
      <div className="relative group">
        {/* Left gradient overlay to indicate scrollability */}
        <div className="absolute top-0 left-0 h-full w-12 z-10 bg-gradient-to-r from-background-light dark:from-background-dark to-transparent hidden sm:block"></div>
        
        {/* Right gradient overlay to indicate scrollability */}
        <div className="absolute top-0 right-0 h-full w-12 z-10 bg-gradient-to-l from-background-light dark:from-background-dark to-transparent hidden sm:block"></div>
        
        {/* Scrollable container with improved mobile experience */}
        <div className="flex gap-6 overflow-x-auto pb-4 [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth snap-x snap-mandatory">
          {/* Map through news items to create cards */}
          {newsItems.map((item, index) => (
            <div 
              key={item.id} 
              className="flex-shrink-0 snap-start w-64 sm:w-72 flex flex-col gap-3 rounded-xl border border-primary/20 bg-background-light p-3 shadow-lg shadow-primary/10 dark:border-primary/30 dark:bg-background-dark"
            >
              <Link 
                href={`/news/${item.id}`}
                className="block w-full"
              >
                {/* News image */}
                <div 
                  className="aspect-video w-full rounded-lg bg-cover bg-center cursor-pointer" 
                  style={{ backgroundImage: `url("${item.hero_image_url}")` }}
                ></div>
                
                {/* News information */}
                <div className="pt-2">
                  <p className="text-sm font-bold text-primary truncate">{item.category}</p>
                  <p className="my-1 text-lg font-bold text-black dark:text-white truncate">{item.title}</p>
                  <p className="text-sm text-black/60 dark:text-white/60 truncate">{item.summary}</p>
                </div>
              </Link>
            </div>
          ))}
          
          {newsItems.length === 0 && (
            <div className="text-gray-500 dark:text-gray-400 w-full text-center py-8">
              No news articles found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VibeNews;