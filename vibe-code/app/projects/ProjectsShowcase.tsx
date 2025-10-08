// ProjectsShowcase.tsx
// This component displays the projects showcase page content with improved text readability
"use client";

import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import SearchAndFilter from './SearchAndFilter';
import Pagination from './Pagination';
import NewProjectButton from '../components/NewProjectButton';
import { supabase } from '../lib/supabaseClient';
import { ProjectItem, ProjectShowcaseItem } from '../types/project';
import { useTranslations } from '@/app/hooks/useTranslations';

// Sample data for the projects (mock data) - REMOVED to only show DB data

const ProjectsShowcase = () => {
  const { t } = useTranslations();
  const [projectItems, setProjectItems] = useState<ProjectShowcaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      const { data, error } = await supabase
        .from('projects')
        .select('id, title, tagline, hero_image_url, created_at') // Select specific fields
        .eq('is_public', true)
        .order('created_at', { ascending: false }); // Order by creation date, newest first

      if (error) throw error;
      
      // Set the projects directly from Supabase data
      setProjectItems(data || []);
      
    } catch (error: any) {
      console.error('Error fetching projects:', error);
      setError('프로젝트를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="container mx-auto p-8">
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-bold tracking-tighter text-primary mb-2 break-words">{t('common.projectShowcase', 'Project Showcase')}</h2>
          <p className="text-xl text-[#101c22]/70 dark:text-[#f5f7f8]/70 max-w-3xl mx-auto break-words leading-relaxed">
            {t('projects.showcase.description', 'Explore the projects created by the Vibe Coders')}
          </p>
        </div>
        
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto p-8">
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-bold tracking-tighter text-primary mb-2 break-words">{t('common.projectShowcase', 'Project Showcase')}</h2>
          <p className="text-xl text-[#101c22]/70 dark:text-[#f5f7f8]/70 max-w-3xl mx-auto break-words leading-relaxed">
            {t('projects.showcase.description', 'Explore the projects created by the Vibe Coders')}
          </p>
        </div>
        
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 break-words" role="alert">
          <strong className="font-bold">{t('common.error', 'Error!')} </strong>
          <span className="block sm:inline break-words">{error}</span>
        </div>
        
        {/* Do not show mock data if there's an error fetching real data */}
      </main>
    );
  }

  return (
    <main className="container mx-auto p-8">
      {/* Page header with title and description */}
      <div className="mb-12 text-center">
        <h2 className="text-5xl font-bold tracking-tighter text-primary mb-2 break-words">{t('common.projectShowcase', 'Project Showcase')}</h2>
        <p className="text-xl text-[#101c22]/70 dark:text-[#f5f7f8]/70 max-w-3xl mx-auto break-words leading-relaxed">
          {t('projects.showcase.description', 'Explore the projects created by the Vibe Coders')}
        </p>
      </div>
      
      {/* Search and filter section */}
      <div className="mb-6">
        <SearchAndFilter />
      </div>
      
      {/* Empty state */}
      {projectItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-700 mb-2 break-words">{t('projects.noProjectsFound', 'No Projects Found')}</h3>
          <p className="text-gray-500 mb-4 break-words">{t('projects.shareYourProject', 'Share your first project with the community!')}</p>
          <div className="flex justify-center">
            <NewProjectButton isCollapsed={false} />
          </div>
        </div>
      ) : (
        <>
          {/* New project button - Visible when there are projects */}
          <div className="mb-8 flex justify-center">
            <NewProjectButton isCollapsed={false} />
          </div>
          
          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Map through project items to create cards */}
            {projectItems.map((project) => (
              // Use Next.js Link for client-side navigation or an anchor tag
              // Ensure the href points to the dynamic route with the project ID
              <a key={project.id} href={`/projects/${project.id}`} className="break-words">
                <ProjectCard 
                  title={project.title}
                  description={project.tagline} // Use tagline for description
                  imageUrl={project.hero_image_url || ''} // Use hero_image_url, provide default if null
                />
              </a>
            ))}
          </div>
          
          {/* Pagination controls */}
          <Pagination 
            currentPage={1} // Add state management for current page
            totalPages={Math.ceil(projectItems.length / 9)} // Assuming 9 items per page
            onPageChange={(page) => {
              // Add page change handler
              console.log('Page changed to:', page);
            }}
          />
        </>
      )}
    </main>
  );
};

export default ProjectsShowcase;