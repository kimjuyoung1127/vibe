// RelatedProjects.tsx
// This component displays other projects by the same author
"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import Link from 'next/link';
import { RelatedProject } from '@/app/types/project';

const RelatedProjects = ({ authorId, currentProjectId }: { authorId: string; currentProjectId: string }) => {
  const [relatedProjects, setRelatedProjects] = useState<RelatedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch other projects by the same author, excluding the current project
        const { data, error } = await supabase
          .from('projects')
          .select('id, title, tagline, hero_image_url')
          .eq('user_id', authorId)
          .eq('is_public', true)
          .neq('id', currentProjectId)
          .limit(10); // Limit to 10 related projects

        if (error) throw error;

        setRelatedProjects(data || []);
      } catch (error: any) {
        console.error('Error fetching related projects:', error);
        setError(error.message || 'Failed to load related projects.');
      } finally {
        setLoading(false);
      }
    };

    if (authorId && currentProjectId) {
      fetchRelatedProjects();
    }
  }, [authorId, currentProjectId]);

  // If there are no related projects, don't render anything
  if (!loading && !error && relatedProjects.length === 0) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-stretch p-4 gap-3">
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
              <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg flex flex-col bg-gray-200 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    // Don't show error to users, just don't display related projects
    return null;
  }

  return (
    <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex items-stretch p-4 gap-3">
        {relatedProjects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`} className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40 hover:opacity-90 transition-opacity">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg flex flex-col"
              style={{ backgroundImage: `url("${project.hero_image_url || ''}")` }}
            ></div>
            <div>
              <p className="text-[#161118] text-base font-medium leading-normal">{project.title}</p>
              <p className="text-[#7c608a] text-sm font-normal leading-normal">{project.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProjects;