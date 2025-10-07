// ToolTechReviewForm.tsx
// This component provides the form for creating new tool/tech reviews
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/app/lib/supabaseClient';
import VibeTipTapEditor from '@/app/components/VibeTipTapEditor';
import MediaSection from './MediaSection';
import CategorizationSection from './CategorizationSection';

const ToolTechReviewForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reviewId = searchParams.get('id');

  const [formData, setFormData] = useState({
    title: '',
    toolTechName: '',
    overallRating: 3,
    oneLinerPros: '',
    oneLinerCons: '',
    content: '',
    heroImageUrl: '',
    demoVideoUrl: '',
    category: '',
    categoryTags: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveDraftStatus, setSaveDraftStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [isEditingDraft, setIsEditingDraft] = useState(false);
  const [draftId, setDraftId] = useState<string | null>(null);

  useEffect(() => {
    const loadReviewData = async () => {
      if (!reviewId) return;
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) throw new Error('User not authenticated');
        
        const { data, error } = await supabase
          .from('tool_reviews')
          .select('*')
          .eq('id', reviewId)
          .eq('user_id', session.user.id)
          .single();
        
        if (error) throw error;
        
        setFormData({
          title: data.title || '',
          toolTechName: data.tool_tech_name || '',
          overallRating: data.overall_rating || 3,
          oneLinerPros: data.one_liner_pros || '',
          oneLinerCons: data.one_liner_cons || '',
          content: data.content || '',
          heroImageUrl: data.hero_image_url || '',
          demoVideoUrl: data.demo_video_url || '',
          category: '', // Fetched separately
          categoryTags: '' // Fetched separately
        });
        
        setIsEditingDraft(true);
        setDraftId(reviewId);
        
        await fetchRelatedData(reviewId);
      } catch (err: any) {
        console.error('Error loading review data:', err);
        setErrors({ general: err.message || 'Failed to load review data. Please try again.' });
      }
    };
    
    loadReviewData();
  }, [reviewId]);

  const fetchRelatedData = async (reviewId: string) => {
    try {
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('review_categories')
        .select('category_name')
        .eq('review_id', reviewId);

      if (categoriesError) throw categoriesError;

      if (categoriesData) {
        setFormData(prev => ({ ...prev, category: categoriesData.map(c => c.category_name).join(', ') }));
      }
    } catch (error: any) {
      console.error('Unexpected error fetching related data:', error);
    }
  };

  const handleRelatedDataSubmit = async (reviewId: string) => {
    try {
      await supabase.from('review_categories').delete().eq('review_id', reviewId);

      const categoryList = formData.categoryTags.split(',').map(c => c.trim()).filter(c => c.length > 0);
      if (categoryList.length > 0) {
        const categoryData = categoryList.map(categoryName => ({ review_id: reviewId, category_name: categoryName }));
        const { error: categoryInsertError } = await supabase.from('review_categories').insert(categoryData);
        if (categoryInsertError) console.error('Error inserting categories:', categoryInsertError);
      }
    } catch (error: any) {
      console.error('Error handling related data:', error);
      throw error;
    }
  };

  const handleSaveDraft = async () => {
    setSaveDraftStatus('saving');
    setErrors({});

    try {
      if (!formData.title.trim()) {
        setErrors({ title: 'Title is required to save a draft.' });
        setSaveDraftStatus('error');
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setErrors({ general: 'You need to be logged in to save a draft.' });
        setSaveDraftStatus('error');
        return;
      }

      const draftData = {
        user_id: session.user.id,
        title: formData.title.trim(),
        tool_tech_name: formData.toolTechName.trim(),
        overall_rating: formData.overallRating,
        one_liner_pros: formData.oneLinerPros.trim(),
        one_liner_cons: formData.oneLinerCons.trim(),
        content: formData.content.trim() || null,
        hero_image_url: formData.heroImageUrl?.trim() || null,
        demo_video_url: formData.demoVideoUrl?.trim() || null,
        is_public: false,
        updated_at: new Date().toISOString()
      };

      let newReviewId = draftId;

      if (isEditingDraft && draftId) {
        const { error: updateError } = await supabase.from('tool_reviews').update(draftData).eq('id', draftId);
        if (updateError) throw updateError;
      } else {
        const { data: result, error: insertError } = await supabase.from('tool_reviews').insert(draftData).select().single();
        if (insertError) throw insertError;
        newReviewId = result?.id;
        if (!newReviewId) throw new Error('Failed to get the ID of the newly created draft.');
      }

      if (newReviewId) await handleRelatedDataSubmit(newReviewId);

      setSaveDraftStatus('saved');
      
      if (!isEditingDraft && newReviewId) {
        setDraftId(newReviewId);
        setIsEditingDraft(true);
      }
      
      setTimeout(() => setSaveDraftStatus('idle'), 3000);
    } catch (error: any) {
      console.error('Error saving draft:', error);
      setErrors({ general: error.message || 'Failed to save draft. Please try again.' });
      setSaveDraftStatus('error');
      setTimeout(() => setSaveDraftStatus('idle'), 5000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      if (!formData.title.trim()) {
        setErrors({ title: 'Title is required.' });
        setIsSubmitting(false);
        return;
      }

      if (!formData.toolTechName.trim()) {
        setErrors({ toolTechName: 'Tool/tech name is required.' });
        setIsSubmitting(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('You must be logged in to create a review');

      const reviewData = {
        user_id: session.user.id,
        title: formData.title.trim(),
        tool_tech_name: formData.toolTechName.trim(),
        overall_rating: formData.overallRating,
        one_liner_pros: formData.oneLinerPros.trim(),
        one_liner_cons: formData.oneLinerCons.trim(),
        content: formData.content.trim(),
        hero_image_url: formData.heroImageUrl?.trim() || null,
        demo_video_url: formData.demoVideoUrl?.trim() || null,
        is_public: true // Publishing the review
      };

      let newReviewId = draftId;

      if (isEditingDraft && draftId) {
        const { error } = await supabase.from('tool_reviews').update(reviewData).eq('id', draftId);
        if (error) throw error;
      } else {
        const { data: result, error } = await supabase.from('tool_reviews').insert(reviewData).select().single();
        if (error) throw error;
        newReviewId = result?.id;
        if (!newReviewId) throw new Error('Failed to get the ID of the newly created review.');
      }

      if (newReviewId) await handleRelatedDataSubmit(newReviewId);

      router.push(`/gear/${newReviewId}`);
    } catch (err: any) {
      console.error('Error creating/updating review:', err);
      setErrors({ general: err.message || 'Failed to create/update review. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{errors.general}</span>
          </div>
        )}

        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#161118] tracking-light text-[32px] font-bold leading-tight">
              {isEditingDraft ? 'Edit Tool/Tech Review' : 'Create Tool/Tech Review'}
            </p>
            <p className="text-[#7c608a] text-sm font-normal leading-normal">
              {isEditingDraft ? 'Continue working on your tool/tech review' : 'Share your experience. Fill in the details below.'}
            </p>
          </div>
        </div>
        
        <div className="p-4 border-t border-[#e2dbe6] dark:border-[#2a2a3e]">
          <h2 className="text-[#161118] dark:text-[#f5f7f8] text-xl font-semibold mb-4">Core Information</h2>
          <div className="mb-6">
            <label htmlFor="title" className="block text-[#7c608a] text-sm font-medium mb-2">Title *</label>
            <input id="title" name="title" type="text" value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} placeholder="What's your review about?" className={`w-full px-4 py-3 rounded-lg border ${errors.title ? 'border-red-500' : 'border-[#e2dbe6] dark:border-[#2a2a3e]'} bg-white dark:bg-[#0f0f1a] text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`} />
            {errors.title && <p className="mt-1 text-red-500 text-sm">{errors.title}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="toolTechName" className="block text-[#7c608a] text-sm font-medium mb-2">Tool/Technology Name *</label>
            <input id="toolTechName" name="toolTechName" type="text" value={formData.toolTechName} onChange={(e) => setFormData(prev => ({ ...prev, toolTechName: e.target.value }))} placeholder="e.g., VS Code, Figma, React" className={`w-full px-4 py-3 rounded-lg border ${errors.toolTechName ? 'border-red-500' : 'border-[#e2dbe6] dark:border-[#2a2a3e]'} bg-white dark:bg-[#0f0f1a] text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`} />
            {errors.toolTechName && <p className="mt-1 text-red-500 text-sm">{errors.toolTechName}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-[#7c608a] text-sm font-medium mb-2">Overall Rating</label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setFormData(prev => ({ ...prev, overallRating: star }))} className={`text-2xl ${star <= formData.overallRating ? 'text-yellow-400' : 'text-gray-300'}`}>
                  {star <= formData.overallRating ? '★' : '☆'}
                </button>
              ))}
              <span className="ml-2 text-[#161118] dark:text-[#f5f7f8] text-sm font-bold">{formData.overallRating.toFixed(1)} / 5</span>
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="oneLinerPros" className="block text-[#7c608a] text-sm font-medium mb-2">One-liner Pros</label>
            <input id="oneLinerPros" name="oneLinerPros" type="text" value={formData.oneLinerPros} onChange={(e) => setFormData(prev => ({ ...prev, oneLinerPros: e.target.value }))} placeholder="What do you love most about this tool?" className="w-full px-4 py-3 rounded-lg border border-[#e2dbe6] dark:border-[#2a2a3e] bg-white dark:bg-[#0f0f1a] text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
          </div>
          <div>
            <label htmlFor="oneLinerCons" className="block text-[#7c608a] text-sm font-medium mb-2">One-liner Cons</label>
            <input id="oneLinerCons" name="oneLinerCons" type="text" value={formData.oneLinerCons} onChange={(e) => setFormData(prev => ({ ...prev, oneLinerCons: e.target.value }))} placeholder="What are the downsides?" className="w-full px-4 py-3 rounded-lg border border-[#e2dbe6] dark:border-[#2a2a3e] bg-white dark:bg-[#0f0f1a] text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
          </div>
        </div>

        <div className="p-4 border-t border-[#e2dbe6] dark:border-[#2a2a3e]">
          <MediaSection 
            formData={{ 
              heroImageUrl: formData.heroImageUrl, 
              demoVideoUrl: formData.demoVideoUrl 
            }} 
            setFormData={(update) => {
              setFormData(prev => {
                // Get the updates from the media section
                const updates = typeof update === 'function' ? update({
                  heroImageUrl: prev.heroImageUrl,
                  demoVideoUrl: prev.demoVideoUrl,
                  title: '',
                  toolTechName: '',
                  overallRating: 0,
                  oneLinerPros: '',
                  oneLinerCons: '',
                  content: '',
                  category: '',
                  categoryTags: ''
                }) : update;
                
                // Apply only the updates relevant to media
                return {
                  ...prev,
                  heroImageUrl: updates.heroImageUrl ?? prev.heroImageUrl,
                  demoVideoUrl: updates.demoVideoUrl ?? prev.demoVideoUrl
                };
              });
            }} 
          />
        </div>

        <div className="p-4 border-t border-[#e2dbe6] dark:border-[#2a2a3e]">
          <h2 className="text-[#161118] dark:text-[#f5f7f8] text-xl font-semibold mb-4">Detailed Review</h2>
          <p className="text-[#7c608a] text-sm mb-4">Write your detailed review of the tool or technology.</p>
          <VibeTipTapEditor initialContent={formData.content || ''}  onContentChange={(newContent) => setFormData(prev => ({ ...prev, content: newContent }))} content={formData.content} />
        </div>

        <div className="p-4 border-t border-[#e2dbe6] dark:border-[#2a2a3e]">
          <CategorizationSection 
            formData={{ 
              category: formData.category, 
              categoryTags: formData.categoryTags 
            }} 
            handleChange={(e) => setFormData(prev => ({ 
              ...prev, 
              [e.target.name]: e.target.value 
            }))} 
            setFormData={(update) => {
              setFormData(prev => {
                // Get the updates from the categorization section
                const updates = typeof update === 'function' ? update({
                  category: prev.category,
                  categoryTags: prev.categoryTags
                }) : update;
                
                // Apply only the updates relevant to categorization
                return {
                  ...prev,
                  category: updates.category ?? prev.category,
                  categoryTags: updates.categoryTags ?? prev.categoryTags
                };
              });
            }} 
          />
        </div>

        <div className="p-4 border-t border-[#e2dbe6] dark:border-[#2a2a3e]">
          <div className="flex flex-wrap gap-4">
            <button type="button" onClick={handleSaveDraft} className="px-6 py-3 bg-[#e2dbe6] dark:bg-[#2a2a3e] text-[#161118] dark:text-[#f5f7f8] rounded-lg font-medium hover:bg-[#d0c5d8] dark:hover:bg-[#3a3a4e] transition-colors">
              {saveDraftStatus === 'saving' ? 'Saving...' : saveDraftStatus === 'saved' ? 'Saved!' : 'Save Draft'}
            </button>
            <button type="submit" disabled={isSubmitting} className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/80 transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
              {isSubmitting ? 'Publishing...' : isEditingDraft ? 'Update Review' : 'Publish Review'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ToolTechReviewForm;
