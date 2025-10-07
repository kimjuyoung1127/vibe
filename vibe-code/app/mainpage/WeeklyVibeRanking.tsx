// WeeklyVibeRanking.tsx
// This component displays the weekly ranking of projects based on likes
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/app/lib/supabaseClient';

// Define the type for a ranking item
interface RankingItem {
  id: string; // Changed from number to string as Supabase IDs are UUIDs
  title: string;
  tagline: string; // Changed from description to tagline as per table schema
  hero_image_url: string; // Changed from imageUrl to hero_image_url as per table schema
}

const WeeklyVibeRanking = () => {
  const [rankingItems, setRankingItems] = useState<RankingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeeklyRanking = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('id, title, tagline, hero_image_url, vibe_check_count, created_at')
          .eq('is_public', true) // Only public projects
          .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()) // Only projects from last 7 days
          .order('vibe_check_count', { ascending: false })
          .limit(3); // Get top 3 for the weekly ranking on main page

        if (error) {
          throw new Error(error.message);
        }

        if (data) {
          // Map the data to the RankingItem interface
          const rankingData: RankingItem[] = data.map(item => ({
            id: item.id,
            title: item.title,
            tagline: item.tagline,
            hero_image_url: item.hero_image_url
          }));
          // Limit to first 3 items for better display on main page
          setRankingItems(rankingData.slice(0, 3));
        }
      } catch (err: any) {
        console.error('Error fetching weekly ranking:', err);
        setError(err.message || 'An error occurred while fetching the weekly ranking');
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyRanking();
  }, []);

  if (loading) {
    return (
      <div className="px-4 pb-6 pt-4 md:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">Top Vibe Coding Projects</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-72 flex-shrink-0 flex-col gap-3 rounded-xl border border-primary/20 bg-background-light p-3 shadow-lg shadow-primary/10 dark:border-primary/30 dark:bg-background-dark">
            <div className="aspect-video w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/5"></div>
            </div>
          </div>
          <div className="flex w-72 flex-shrink-0 flex-col gap-3 rounded-xl border border-primary/20 bg-background-light p-3 shadow-lg shadow-primary/10 dark:border-primary/30 dark:bg-background-dark">
            <div className="aspect-video w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/5"></div>
            </div>
          </div>
          <div className="flex w-72 flex-shrink-0 flex-col gap-3 rounded-xl border border-primary/20 bg-background-light p-3 shadow-lg shadow-primary/10 dark:border-primary/30 dark:bg-background-dark">
            <div className="aspect-video w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/5"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 pb-6 pt-4 md:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">Top Vibe Coding Projects</h2>
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-6 pt-4 md:px-6 lg:px-8">
      {/* Section title */}
      <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">Top Vibe Coding Projects</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        This week's most popular Vibe Coding projects
      </p>
      
      {/* Container for scrollable content with improved mobile experience */}
      <div className="relative group">
        {/* Left gradient overlay to indicate scrollability */}
        <div className="absolute top-0 left-0 h-full w-12 z-10 bg-gradient-to-r from-background-light dark:from-background-dark to-transparent hidden sm:block"></div>
        
        {/* Right gradient overlay to indicate scrollability */}
        <div className="absolute top-0 right-0 h-full w-12 z-10 bg-gradient-to-l from-background-light dark:from-background-dark to-transparent hidden sm:block"></div>
        
        {/* Scrollable container with improved mobile experience */}
        <div className="flex gap-6 overflow-x-auto pb-4 [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth snap-x snap-mandatory">
          {/* Map through ranking items to create cards */}
          {rankingItems.map((item, index) => (
            <div 
              key={item.id} 
              className="flex-shrink-0 snap-start w-64 sm:w-72 flex flex-col gap-3 rounded-xl border border-primary/20 bg-background-light p-3 shadow-lg shadow-primary/10 dark:border-primary/30 dark:bg-background-dark"
            >
              <Link 
                href={`/projects/${item.id}`}
                className="block w-full"
              >
                {/* Project image */}
                <div 
                  className="aspect-video w-full rounded-lg bg-cover bg-center cursor-pointer" 
                  style={{ backgroundImage: `url("${item.hero_image_url}")` }}
                ></div>
                
                {/* Project information */}
                <div className="pt-2">
                  <p className="font-bold text-black dark:text-white truncate">#{index + 1} {item.title}</p>
                  <p className="text-sm text-black/60 dark:text-white/60 truncate">{item.tagline}</p>
                </div>
              </Link>
            </div>
          ))}
          
          {rankingItems.length === 0 && (
            <div className="text-gray-500 dark:text-gray-400 w-full text-center py-8">
              No Vibe Coding projects found for this week's ranking.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeeklyVibeRanking;