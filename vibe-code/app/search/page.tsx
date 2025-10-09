// This is the search page with the same UI structure as the home page
"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/app/lib/supabaseClient';
import HeroSection from '../mainpage/HeroSection';
import WeeklyVibeRanking from '../mainpage/WeeklyVibeRanking';
import LatestProjects from '../mainpage/LatestProjects';
import VibeNews from '../mainpage/VibeNews';
import LoadingSpinner from '@/app/components/LoadingSpinner';

interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  hero_image_url: string;
  vibe_check_count: number;
  comment_count: number;
  created_at: string;
  updated_at: string;
  user_id: string;
}

interface ToolReviewItem {
  id: string;
  title: string;
  tool_tech_name: string;
  overall_rating: number;
  content: string;
  hero_image_url: string | null;
  vibe_check_count: number;
  comment_count: number;
  created_at: string;
  updated_at: string;
  user_id: string;
}

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<{
    projects: ProjectItem[];
    toolReviews: ToolReviewItem[];
  }>({ projects: [], toolReviews: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'projects' | 'reviews' | 'users'>('all');

  useEffect(() => {
    if (query) {
      performSearch(query);
    } else {
      setSearchResults({ projects: [], toolReviews: [] });
      setLoading(false);
    }
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    try {
      setLoading(true);
      setError(null);

      // Search projects
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('id, title, tagline, hero_image_url, vibe_check_count, comment_count, created_at, updated_at, user_id')
        .ilike('title', `%${searchQuery}%`)
        .or(`tagline.ilike.%${searchQuery}%, content.ilike.%${searchQuery}%`)
        .limit(10);

      if (projectsError) throw projectsError;

      // Search tool reviews
      const { data: toolReviews, error: toolReviewsError } = await supabase
        .from('tool_reviews')
        .select('id, title, tool_tech_name, overall_rating, content, hero_image_url, vibe_check_count, comment_count, created_at, updated_at, user_id')
        .ilike('title', `%${searchQuery}%`)
        .or(`tool_tech_name.ilike.%${searchQuery}%, content.ilike.%${searchQuery}%`)
        .limit(10);

      if (toolReviewsError) throw toolReviewsError;

      setSearchResults({
        projects: projects || [],
        toolReviews: toolReviews || []
      });
    } catch (err: any) {
      console.error('Search error:', err);
      setError(err.message || 'An error occurred during search');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero section */}
      <HeroSection />
      
      {/* Only show search results if search query exists, otherwise show regular home page content */}
      {query ? (
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1 p-8">
          <h1 className="text-2xl font-bold text-[#161118] dark:text-[#f5f7f8] mb-6">
            Search Results for "{query}"
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner />
            </div>
          ) : searchResults.projects.length === 0 && searchResults.toolReviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#161118] dark:text-[#f5f7f8] text-lg">No results found for "{query}"</p>
              <p className="text-[#7c608a] dark:text-[#c5b3d1] mt-2">Try different keywords or check for typos</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Tab navigation */}
              <div className="border-b border-primary/20">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'all'
                        ? 'border-primary text-[#161118] dark:text-[#f5f7f8]' 
                        : 'border-transparent text-[#7c608a] dark:text-[#c5b3d1] hover:text-[#161118] dark:hover:text-[#f5f7f8] hover:border-primary/50'
                    }`}
                  >
                    All ({searchResults.projects.length + searchResults.toolReviews.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('projects')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'projects'
                        ? 'border-primary text-[#161118] dark:text-[#f5f7f8]' 
                        : 'border-transparent text-[#7c608a] dark:text-[#c5b3d1] hover:text-[#161118] dark:hover:text-[#f5f7f8] hover:border-primary/50'
                    }`}
                  >
                    Projects ({searchResults.projects.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'reviews'
                        ? 'border-primary text-[#161118] dark:text-[#f5f7f8]' 
                        : 'border-transparent text-[#7c608a] dark:text-[#c5b3d1] hover:text-[#161118] dark:hover:text-[#f5f7f8] hover:border-primary/50'
                    }`}
                  >
                    Tool & Tech Reviews ({searchResults.toolReviews.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('users')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'users'
                        ? 'border-primary text-[#161118] dark:text-[#f5f7f8]' 
                        : 'border-transparent text-[#7c608a] dark:text-[#c5b3d1] hover:text-[#161118] dark:hover:text-[#f5f7f8] hover:border-primary/50'
                    }`}
                  >
                    Users
                  </button>
                </nav>
              </div>

              {/* Search results content */}
              <div className="space-y-12">
                {/* All Results Tab - Shows both projects and reviews */}
                {activeTab === 'all' && (
                  <>
                    {/* Project Results */}
                    {searchResults.projects.length > 0 && (
                      <div id="projects-tab">
                        <h2 className="text-xl font-bold text-[#161118] dark:text-[#f5f7f8] mb-4">Projects</h2>
                        <div className="space-y-4">
                          {searchResults.projects.map(project => (
                            <Link 
                              key={project.id} 
                              href={`/projects/${project.id}`}
                              className="block p-4 rounded-lg border border-primary/20 bg-background-light dark:bg-background-dark hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors"
                            >
                              <div className="flex gap-4">
                                {project.hero_image_url && (
                                  <div 
                                    className="bg-center bg-no-repeat bg-cover rounded-lg min-h-16 w-16 flex-shrink-0"
                                    style={{ backgroundImage: `url("${project.hero_image_url}")` }}
                                  ></div>
                                )}
                                <div>
                                  <h3 className="font-bold text-[#161118] dark:text-[#f5f7f8]">{project.title}</h3>
                                  <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm mt-1">{project.tagline}</p>
                                  <div className="flex gap-4 mt-2 text-xs text-[#7c608a] dark:text-[#c5b3d1]">
                                    <span className="flex items-center gap-1">
                                      <span className="material-symbols-outlined">thumb_up</span>
                                      {project.vibe_check_count}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <span className="material-symbols-outlined">chat</span>
                                      {project.comment_count}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tool Review Results */}
                    {searchResults.toolReviews.length > 0 && (
                      <div id="tool-reviews-tab">
                        <h2 className="text-xl font-bold text-[#161118] dark:text-[#f5f7f8] mb-4">Tool & Tech Reviews</h2>
                        <div className="space-y-4">
                          {searchResults.toolReviews.map(review => (
                            <Link 
                              key={review.id} 
                              href={`/gear/${review.id}`}
                              className="block p-4 rounded-lg border border-primary/20 bg-background-light dark:bg-background-dark hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors"
                            >
                              <div className="flex gap-4">
                                {review.hero_image_url && (
                                  <div 
                                    className="bg-center bg-no-repeat bg-cover rounded-lg min-h-16 w-16 flex-shrink-0"
                                    style={{ backgroundImage: `url("${review.hero_image_url}")` }}
                                  ></div>
                                )}
                                <div>
                                  <h3 className="font-bold text-[#161118] dark:text-[#f5f7f8]">{review.title}</h3>
                                  <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm mt-1">{review.tool_tech_name}</p>
                                  <div className="flex items-center gap-1 mt-1">
                                    {[...Array(5)].map((_, i) => (
                                      <span 
                                        key={i} 
                                        className={`material-symbols-outlined text-base ${i < review.overall_rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                      >
                                        star
                                      </span>
                                    ))}
                                    <span className="ml-2 text-[#161118] dark:text-[#f5f7f8] text-xs">
                                      {review.overall_rating.toFixed(1)}
                                    </span>
                                  </div>
                                  <div className="flex gap-4 mt-2 text-xs text-[#7c608a] dark:text-[#c5b3d1]">
                                    <span className="flex items-center gap-1">
                                      <span className="material-symbols-outlined">thumb_up</span>
                                      {review.vibe_check_count}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <span className="material-symbols-outlined">chat</span>
                                      {review.comment_count}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* No results in all tabs */}
                    {searchResults.projects.length === 0 && searchResults.toolReviews.length === 0 && (
                      <div className="text-center py-12">
                        <p className="text-[#161118] dark:text-[#f5f7f8] text-lg">No results found for "{query}"</p>
                        <p className="text-[#7c608a] dark:text-[#c5b3d1] mt-2">Try different keywords or check for typos</p>
                      </div>
                    )}
                  </>
                )}

                {/* Projects Tab - Shows only projects */}
                {activeTab === 'projects' && (
                  <div id="projects-tab">
                    <h2 className="text-xl font-bold text-[#161118] dark:text-[#f5f7f8] mb-4">Projects</h2>
                    <div className="space-y-4">
                      {searchResults.projects.map(project => (
                        <Link 
                          key={project.id} 
                          href={`/projects/${project.id}`}
                          className="block p-4 rounded-lg border border-primary/20 bg-background-light dark:bg-background-dark hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors"
                        >
                          <div className="flex gap-4">
                            {project.hero_image_url && (
                              <div 
                                className="bg-center bg-no-repeat bg-cover rounded-lg min-h-16 w-16 flex-shrink-0"
                                style={{ backgroundImage: `url("${project.hero_image_url}")` }}
                              ></div>
                            )}
                            <div>
                              <h3 className="font-bold text-[#161118] dark:text-[#f5f7f8]">{project.title}</h3>
                              <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm mt-1">{project.tagline}</p>
                              <div className="flex gap-4 mt-2 text-xs text-[#7c608a] dark:text-[#c5b3d1]">
                                <span className="flex items-center gap-1">
                                  <span className="material-symbols-outlined">thumb_up</span>
                                  {project.vibe_check_count}
                                </span>
                                <span className="flex items-center gap-1">
                                  <span className="material-symbols-outlined">chat</span>
                                  {project.comment_count}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    {searchResults.projects.length === 0 && (
                      <div className="text-center py-12">
                        <p className="text-[#161118] dark:text-[#f5f7f8] text-lg">No projects found for "{query}"</p>
                        <p className="text-[#7c608a] dark:text-[#c5b3d1] mt-2">Try different keywords or check for typos</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Tool Reviews Tab - Shows only tool reviews */}
                {activeTab === 'reviews' && (
                  <div id="tool-reviews-tab">
                    <h2 className="text-xl font-bold text-[#161118] dark:text-[#f5f7f8] mb-4">Tool & Tech Reviews</h2>
                    <div className="space-y-4">
                      {searchResults.toolReviews.map(review => (
                        <Link 
                          key={review.id} 
                          href={`/gear/${review.id}`}
                          className="block p-4 rounded-lg border border-primary/20 bg-background-light dark:bg-background-dark hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors"
                        >
                          <div className="flex gap-4">
                            {review.hero_image_url && (
                              <div 
                                className="bg-center bg-no-repeat bg-cover rounded-lg min-h-16 w-16 flex-shrink-0"
                                style={{ backgroundImage: `url("${review.hero_image_url}")` }}
                              ></div>
                            )}
                            <div>
                              <h3 className="font-bold text-[#161118] dark:text-[#f5f7f8]">{review.title}</h3>
                              <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm mt-1">{review.tool_tech_name}</p>
                              <div className="flex items-center gap-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <span 
                                    key={i} 
                                    className={`material-symbols-outlined text-base ${i < review.overall_rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                  >
                                    star
                                  </span>
                                ))}
                                <span className="ml-2 text-[#161118] dark:text-[#f5f7f8] text-xs">
                                  {review.overall_rating.toFixed(1)}
                                </span>
                              </div>
                              <div className="flex gap-4 mt-2 text-xs text-[#7c608a] dark:text-[#c5b3d1]">
                                <span className="flex items-center gap-1">
                                  <span className="material-symbols-outlined">thumb_up</span>
                                  {review.vibe_check_count}
                                </span>
                                <span className="flex items-center gap-1">
                                  <span className="material-symbols-outlined">chat</span>
                                  {review.comment_count}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    {searchResults.toolReviews.length === 0 && (
                      <div className="text-center py-12">
                        <p className="text-[#161118] dark:text-[#f5f7f8] text-lg">No tool & tech reviews found for "{query}"</p>
                        <p className="text-[#7c608a] dark:text-[#c5b3d1] mt-2">Try different keywords or check for typos</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Users Tab - Placeholder for future implementation */}
                {activeTab === 'users' && (
                  <div className="text-center py-12">
                    <p className="text-[#161118] dark:text-[#f5f7f8] text-lg">User search coming soon!</p>
                    <p className="text-[#7c608a] dark:text-[#c5b3d1] mt-2">We're working on enabling user searches</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Weekly Vibe Ranking section */}
          <WeeklyVibeRanking />
          
          {/* Latest Projects section */}
          <LatestProjects />
          
          {/* Vibe News section */}
          <VibeNews />
        </>
      )}
    </>
  );
};

export default SearchPage;