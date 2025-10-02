// page.tsx
// This is the main page for managing tool & tech review drafts
"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import Link from 'next/link';
import NavbarWrapper from '@/app/components/NavbarWrapper';
import TopNavWrapper from '@/app/components/TopNavWrapper';

interface DraftReview {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const DraftsPage = () => {
  const [drafts, setDrafts] = useState<DraftReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get the current user
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        throw new Error('User not authenticated');
      }

      // For now, since there's no specific draft concept in the schema, 
      // we'll consider all reviews as potentially draft (until we implement actual draft status)
      // In a real implementation, you would need to add a draft_status column to tool_reviews table
      const { data, error } = await supabase
        .from('tool_reviews')
        .select(`
          id,
          title,
          content,
          created_at,
          updated_at
        `)
        .eq('user_id', session.user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      setDrafts((data || []).map(draft => ({
        ...draft,
        content: '' // Add missing content property with empty string default
      })));
    } catch (error: any) {
      console.error('Error fetching drafts:', error);
      setError(error.message || 'Failed to load drafts');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleDeleteDraft = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this draft?')) return;

    try {
      const { error } = await supabase
        .from('tool_reviews')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Refresh the drafts list
      fetchDrafts();
    } catch (error: any) {
      console.error('Error deleting draft:', error);
      setError(error.message || 'Failed to delete draft');
    }
  };

  if (loading) {
    return (
      <div className="group/design-root relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <TopNavWrapper />
        <div className="flex flex-1">
          <NavbarWrapper />
          <main className="flex-1 overflow-y-auto">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="group/design-root relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <TopNavWrapper />
      <div className="flex flex-1">
        <NavbarWrapper />
        <main className="flex-1 overflow-y-auto">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 p-4">
            <div className="flex flex-wrap justify-between gap-3 mb-6">
              <div className="flex min-w-72 flex-col gap-3">
                <h1 className="text-[#161118] tracking-light text-[32px] font-bold leading-tight">
                  My Tool & Tech Reviews
                </h1>
                <p className="text-[#7c608a] text-sm font-normal leading-normal">
                  Manage your tool & tech reviews and drafts
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error! </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <div className="bg-background-light dark:bg-background-dark rounded-xl border border-primary/20 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[#161118] dark:text-[#f5f7f8] text-[22px] font-bold leading-tight tracking-[-0.015em]">
                  Drafts
                </h2>
                <Link 
                  href="/gear/create" 
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  New Review
                </Link>
              </div>

              {drafts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-700 mb-2">No drafts found</h3>
                  <p className="text-gray-500 mb-4">Save a draft while creating a tool & tech review to see it here.</p>
                  <Link 
                    href="/gear/create" 
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Create New Review
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drafts.map((draft) => (
            <div 
              key={draft.id} 
              className="bg-background-light dark:bg-background-dark rounded-xl border border-primary/20 p-6"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-[#161118] dark:text-[#f5f7f8] text-lg font-bold mb-2 truncate">
                  {draft.title || 'Untitled Review'}
                </h3>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                  Draft
                </span>
              </div>
              <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm mb-4 truncate">
                {draft.content.substring(0, 50) + (draft.content.length > 50 ? '...' : '')}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-[#7c608a] dark:text-[#c5b3d1] text-xs">
                  {new Date(draft.updated_at).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <Link 
                    href={`/gear/create?id=${draft.id}`} 
                    className="px-3 py-1 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteDraft(draft.id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DraftsPage;