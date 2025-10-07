// LatestProjects.tsx
// This component displays the latest projects in a grid layout
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/app/lib/supabaseClient';

// Define the type for a project item
interface ProjectItem {
  id: string; // Changed from number to string as Supabase IDs are UUIDs
  title: string;
  tagline: string; // Changed from description to tagline as per table schema
  hero_image_url: string; // Changed from imageUrl to hero_image_url as per table schema
}

const LatestProjects = () => {
  const [projectItems, setProjectItems] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('id, title, tagline, hero_image_url')
          .eq('is_public', true) // Only public projects
          .order('created_at', { ascending: false })
          .limit(6); // Get the 6 most recent projects

        if (error) {
          throw new Error(error.message);
        }

        if (data) {
          // Map the data to the ProjectItem interface
          const projectData: ProjectItem[] = data.map(item => ({
            id: item.id,
            title: item.title,
            tagline: item.tagline,
            hero_image_url: item.hero_image_url
          }));
          // Limit to first 6 projects
          setProjectItems(projectData.slice(0, 6));
        }
      } catch (err: any) {
        console.error('Error fetching latest projects:', err);
        setError(err.message || 'An error occurred while fetching the latest projects');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProjects();
  }, []);

  if (loading) {
    return (
      <div className="px-4 pb-6 pt-4 md:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">Latest Vibe Coding Projects</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex w-72 flex-shrink-0 flex-col gap-3 rounded-xl border border-primary/20 bg-background-light p-3 shadow-lg shadow-primary/10 dark:border-primary/30 dark:bg-background-dark">
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
        <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">Latest Vibe Coding Projects</h2>
        <div className="text-red-500 w-full text-center py-8">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-6 pt-4 md:px-6 lg:px-8">
      {/* Section title */}
      <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">Latest Vibe Coding Projects</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Explore the latest projects showcasing the Vibe Coding methodology
      </p>
      
      {/* Container for scrollable content with improved mobile experience */}
      <div className="relative group">
        {/* Left gradient overlay to indicate scrollability */}
        <div className="absolute top-0 left-0 h-full w-12 z-10 bg-gradient-to-r from-background-light dark:from-background-dark to-transparent hidden sm:block"></div>
        
        {/* Right gradient overlay to indicate scrollability */}
        <div className="absolute top-0 right-0 h-full w-12 z-10 bg-gradient-to-l from-background-light dark:from-background-dark to-transparent hidden sm:block"></div>
        
        {/* Scrollable container with improved mobile experience */}
        <div className="flex gap-6 overflow-x-auto pb-4 [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth snap-x snap-mandatory">
          {/* Map through project items to create cards */}
          {projectItems.map((item) => (
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
                  <p className="font-bold text-black dark:text-white truncate">{item.title}</p>
                  <p className="text-sm text-black/60 dark:text-white/60 truncate">{item.tagline}</p>
                </div>
              </Link>
            </div>
          ))}
          
          {projectItems.length === 0 && (
            <div className="text-gray-500 dark:text-gray-400 w-full text-center py-8">
              No Vibe Coding projects found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestProjects;