// DraftsPage.tsx
// This component displays a list of saved drafts for the user
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/app/lib/supabaseClient';

interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  created_at: string;
  updated_at: string;
  is_public: boolean;
}

const DraftsPage = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'drafts' | 'published'>('all');

  useEffect(() => {
    fetchProjects();
  }, [activeTab]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        throw new Error('You need to be logged in to view projects.');
      }

      // Build query based on active tab
      let query = supabase
        .from('projects')
        .select('id, title, tagline, created_at, updated_at, is_public')
        .eq('user_id', session.user.id);

      if (activeTab === 'drafts') {
        query = query.eq('is_public', false);
      } else if (activeTab === 'published') {
        query = query.eq('is_public', true);
      }

      // Order by updated_at, newest first
      const { data, error } = await query.order('updated_at', { ascending: false });

      if (error) throw error;

      setProjects(data || []);
    } catch (error: any) {
      console.error('Error fetching projects:', error);
      setError(error.message || 'Failed to fetch projects. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId: string, isPublic: boolean) => {
    const projectType = isPublic ? 'project' : 'draft';
    const confirmed = window.confirm(`Are you sure you want to delete this ${projectType}? This action cannot be undone.`);
    if (!confirmed) return;

    try {
      // Delete the project
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      // Remove from local state
      setProjects(projects.filter(project => project.id !== projectId));
    } catch (error: any) {
      console.error('Error deleting project:', error);
      alert(error.message || `Failed to delete ${projectType}. Please try again.`);
    }
  };

  const handleUnpublishProject = async (projectId: string) => {
    const confirmed = window.confirm('Are you sure you want to unpublish this project? It will be converted to a draft.');
    if (!confirmed) return;

    try {
      // Update project to make it a draft
      const { error } = await supabase
        .from('projects')
        .update({ is_public: false, updated_at: new Date().toISOString() })
        .eq('id', projectId);

      if (error) throw error;

      // Update local state
      setProjects(projects.map(project => 
        project.id === projectId 
          ? { ...project, is_public: false, updated_at: new Date().toISOString() } 
          : project
      ));
    } catch (error: any) {
      console.error('Error unpublishing project:', error);
      alert(error.message || 'Failed to unpublish project. Please try again.');
    }
  };

  const handlePublishProject = async (projectId: string) => {
    const confirmed = window.confirm('Are you sure you want to publish this draft? It will become publicly visible.');
    if (!confirmed) return;

    try {
      // Update project to make it public
      const { error } = await supabase
        .from('projects')
        .update({ is_public: true, updated_at: new Date().toISOString() })
        .eq('id', projectId);

      if (error) throw error;

      // Update local state
      setProjects(projects.map(project => 
        project.id === projectId 
          ? { ...project, is_public: true, updated_at: new Date().toISOString() } 
          : project
      ));
    } catch (error: any) {
      console.error('Error publishing project:', error);
      alert(error.message || 'Failed to publish project. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="px-4 py-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      {/* Page header */}
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-[#161118] tracking-light text-[32px] font-bold leading-tight">Your Projects</p>
          <p className="text-[#7c608a] text-sm font-normal leading-normal">
            Manage all your projects and drafts
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-6">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`py-2 px-4 font-medium text-sm ${activeTab === 'all' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('all')}
          >
            All Projects
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${activeTab === 'drafts' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('drafts')}
          >
            Drafts
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${activeTab === 'published' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('published')}
          >
            Published
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              {activeTab === 'all' ? 'No projects found' : 
               activeTab === 'drafts' ? 'No drafts found' : 'No published projects found'}
            </h3>
            <p className="text-gray-500 mb-4">
              {activeTab === 'all' ? 'Create your first project to get started.' : 
               activeTab === 'drafts' ? 'Save a draft while creating a project to see it here.' : 
               'Publish a project to see it here.'}
            </p>
            <Link 
              href="/projects/create" 
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Create New Project
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-background-light dark:bg-background-dark rounded-xl border border-primary/20 p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-[#161118] dark:text-[#f5f7f8] text-lg font-bold mb-2 truncate">
                    {project.title || 'Untitled Project'}
                  </h3>
                  {!project.is_public && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                      Draft
                    </span>
                  )}
                </div>
                <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm mb-4 truncate">
                  {project.tagline || 'No description'}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-[#7c608a] dark:text-[#c5b3d1] text-xs">
                    {new Date(project.updated_at).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    <Link 
                      href={`/projects/create?draftId=${project.id}`}
                      className="px-3 py-1 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      {project.is_public ? 'Edit' : 'Edit'}
                    </Link>
                    {project.is_public ? (
                      <>
                        <Link
                          href={`/projects/${project.id}`}
                          className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleUnpublishProject(project.id)}
                          className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-lg hover:bg-yellow-600 transition-colors"
                        >
                          Unpublish
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handlePublishProject(project.id)}
                          className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
                        >
                          Publish
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id, project.is_public)}
                          className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DraftsPage;