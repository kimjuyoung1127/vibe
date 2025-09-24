// CommunityPostForm.tsx
// This component contains the form for creating community posts with Supabase integration
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/app/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import CommunityPostContentSection from './CommunityPostContentSection';

interface FormData {
  title: string;
  content: string;
  tags: string[];
}

const CommunityPostForm = () => {
  const [formData, setFormData] = useState<FormData>({ title: '', content: '', tags: [] });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();


  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required.');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Insert the community post
      const { data: post, error: postError } = await supabase
        .from('community_posts')
        .insert({
          user_id: user.id,
          title: formData.title,
          content: formData.content,
          font_preference: 'Modern Sans-serif' // default font
        })
        .select()
        .single();

      if (postError) throw postError;

      // Insert tags if any
      if (formData.tags.length > 0) {
        const tagsToInsert = formData.tags.map(tag => ({
          post_id: post.id,
          tag_name: tag
        }));

        const { error: tagsError } = await supabase
          .from('community_post_tags')
          .insert(tagsToInsert);

        if (tagsError) throw tagsError;
      }

      // Reset form
      setFormData({ title: '', content: '', tags: [] });
      
      // Redirect to community page
      router.push('/community');
      router.refresh(); // Refresh to show the new post
    } catch (err) {
      console.error('Error creating community post:', err);
      setError(err instanceof Error ? err.message : 'Failed to create community post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        {/* Back button */}
        <div className="px-4 py-4">
          <Link 
            href="/community" 
            className="flex items-center gap-2 text-primary hover:underline"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span>Back to Coding Lounge</span>
          </Link>
        </div>
        
        {/* Page header */}
        <div className="flex flex-wrap justify-between gap-3 px-4 py-4 border-b border-primary/10 dark:border-primary/20">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#161118] dark:text-[#f5f7f8] tracking-light text-xl font-bold leading-tight">
              Create Community Post
            </p>
            <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm font-normal leading-normal">
              Share your thoughts with the Vibe Code community
            </p>
          </div>
        </div>
        
        {/* Community post content section with callback to update form data */}
        <CommunityPostContentSection updateFormData={updateFormData} formData={formData} />
        
        {/* Submit button */}
        <div className="flex justify-end p-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              isSubmitting 
                ? 'bg-[#cccccc] text-[#666666] cursor-not-allowed' 
                : 'bg-primary text-white hover:bg-primary/90'
            }`}
          >
            {isSubmitting ? 'Publishing...' : 'Publish Post'}
          </button>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="px-4 py-2 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg mx-4">
            {error}
          </div>
        )}
      </div>
    </form>
  );
};

export default CommunityPostForm;