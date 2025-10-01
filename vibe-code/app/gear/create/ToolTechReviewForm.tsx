// ToolTechReviewForm.tsx
// This component provides the form for creating new tool/tech reviews
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/app/lib/supabaseClient';
import VibeTipTapEditor from '@/app/components/VibeTipTapEditor';

const ToolTechReviewForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reviewId = searchParams.get('id'); // Get review ID from query params for editing
  
  // Form state
  const [title, setTitle] = useState('');
  const [toolTechName, setToolTechName] = useState('');
  const [overallRating, setOverallRating] = useState(3);
  const [oneLinerPros, setOneLinerPros] = useState('');
  const [oneLinerCons, setOneLinerCons] = useState('');
  const [description, setDescription] = useState(''); // Maps to 'content' field in database
  const [heroImageUrl, setHeroImageUrl] = useState<string | null>('');
  const [demoVideoUrl, setDemoVideoUrl] = useState('');
  const [fontPreference, setFontPreference] = useState('Modern Sans-serif');
  const [categoryTags, setCategoryTags] = useState(''); // Category tags state (comma-separated)

  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveDraftStatus, setSaveDraftStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [isEditingDraft, setIsEditingDraft] = useState(false);
  const [draftId, setDraftId] = useState<string | null>(null);

  // Load existing review data if editing
  useEffect(() => {
    const loadReviewData = async () => {
      if (!reviewId) return;
      
      try {
        // Get the current user
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          throw new Error('User not authenticated');
        }
        
        // Fetch the review data
        const { data, error } = await supabase
          .from('tool_reviews')
          .select(`
            id,
            title,
            tool_tech_name,
            overall_rating,
            one_liner_pros,
            one_liner_cons,
            content,
            hero_image_url,
            demo_video_url,
            font_preference
          `)
          .eq('id', reviewId)
          .eq('user_id', session.user.id)
          .single();
        
        if (error) throw error;
        
        // Load the review data into form state
        setTitle(data.title || '');
        setToolTechName(data.tool_tech_name || '');
        setOverallRating(data.overall_rating || 3);
        setOneLinerPros(data.one_liner_pros || '');
        setOneLinerCons(data.one_liner_cons || '');
        setDescription(data.content || '');
        setHeroImageUrl(data.hero_image_url || '');
        setDemoVideoUrl(data.demo_video_url || '');
        setFontPreference(data.font_preference || 'Modern Sans-serif');
        
        setIsEditingDraft(true);
        setDraftId(reviewId);
        
        // Fetch related data (categories)
        await fetchRelatedData(reviewId);
      } catch (err: any) {
        console.error('Error loading review data:', err);
        setErrors({ general: err.message || 'Failed to load review data. Please try again.' });
      }
    };
    
    loadReviewData();
  }, [reviewId]);

  // Fetch related data (categories)
  const fetchRelatedData = async (reviewId: string) => {
    try {
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('review_categories')
        .select('category_name')
        .eq('review_id', reviewId);

      if (categoriesError) {
        console.error('Error fetching categories:', categoriesError);
        // Don't throw error, just continue with empty data
      } else {
        setCategoryTags(categoriesData.map(c => c.category_name).join(', '));
      }
    } catch (error: any) {
      console.error('Unexpected error fetching related data:', error);
      // We don't set error here as we still want to show the main form even if related data fails
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Basic validation
      if (!title.trim()) {
        setErrors({ title: 'Title is required.' });
        setIsSubmitting(false);
        return;
      }

      if (!toolTechName.trim()) {
        setErrors({ toolTechName: 'Tool/tech name is required.' });
        setIsSubmitting(false);
        return;
      }

      // Get the current user
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        throw new Error('You must be logged in to create a review');
      }

      // Prepare the review data
      const reviewData = {
        user_id: session.user.id,
        title: title.trim(),
        tool_tech_name: toolTechName.trim(),
        overall_rating: overallRating,
        one_liner_pros: oneLinerPros.trim(),
        one_liner_cons: oneLinerCons.trim(),
        content: description.trim(),
        hero_image_url: heroImageUrl?.trim() || null,
        demo_video_url: demoVideoUrl.trim() || null,
        font_preference: fontPreference
      };

      let newReviewId = draftId;

      if (isEditingDraft && draftId) {
        // Update existing review
        const { error } = await supabase
          .from('tool_reviews')
          .update(reviewData)
          .eq('id', draftId);

        if (error) throw error;
        newReviewId = draftId;
      } else {
        // Insert new review
        const { data: result, error } = await supabase
          .from('tool_reviews')
          .insert(reviewData)
          .select()
          .single();

        if (error) throw error;

        // Get the ID of the newly created review
        newReviewId = result?.id;
        if (!newReviewId) {
          throw new Error('Failed to get the ID of the newly created review.');
        }
      }

      // Handle related data (categories)
      if (newReviewId) {
        await handleRelatedData(newReviewId);
      }

      // Redirect to the new review page
      router.push(`/gear/${newReviewId}`);
    } catch (err: any) {
      console.error('Error creating/updating review:', err);
      setErrors({ general: err.message || 'Failed to create/update review. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle related data (categories)
  const handleRelatedData = async (reviewId: string) => {
    try {
      // Delete existing categories
      await supabase.from('review_categories').delete().eq('review_id', reviewId);

      // Insert categories
      const categoryList = categoryTags.split(',').map(c => c.trim()).filter(c => c.length > 0);
      if (categoryList.length > 0) {
        const categoryData = categoryList.map(categoryName => ({
          review_id: reviewId,
          category_name: categoryName
        }));

        const { error: categoryInsertError } = await supabase
          .from('review_categories')
          .insert(categoryData);

        if (categoryInsertError) {
          console.error('Error inserting categories:', categoryInsertError);
        } else {
          console.log('Categories inserted successfully.');
        }
      }
    } catch (error: any) {
      console.error('Error handling related data:', error);
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        {/* Error messages */}
        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{errors.general}</span>
          </div>
        )}

        {/* Page header */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#161118] tracking-light text-[32px] font-bold leading-tight">
              {isEditingDraft ? 'Edit Tool/Tech Review' : 'Create Tool/Tech Review'}
            </p>
            <p className="text-[#7c608a] text-sm font-normal leading-normal">
              {isEditingDraft 
                ? 'Continue working on your tool/tech review' 
                : 'Share your experience with tools and technologies. Fill in the details below to get started'}
            </p>
          </div>
        </div>
        
        {/* Core Information Section */}
        <div className="p-4 border-t border-[#e2dbe6] dark:border-[#2a2a3e]">
          <h2 className="text-[#161118] dark:text-[#f5f7f8] text-xl font-semibold mb-4">Core Information</h2>
          
          {/* Title Input */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-[#7c608a] text-sm font-medium mb-2">
              Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's your review about?"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.title ? 'border-red-500' : 'border-[#e2dbe6] dark:border-[#2a2a3e]'
              } bg-white dark:bg-[#0f0f1a] text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            />
            {errors.title && <p className="mt-1 text-red-500 text-sm">{errors.title}</p>}
          </div>
          
          {/* Tool/tech name */}
          <div className="mb-6">
            <label htmlFor="toolTechName" className="block text-[#7c608a] text-sm font-medium mb-2">
              Tool/Technology Name *
            </label>
            <input
              id="toolTechName"
              name="toolTechName"
              type="text"
              value={toolTechName}
              onChange={(e) => setToolTechName(e.target.value)}
              placeholder="e.g., VS Code, Figma, React"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.toolTechName ? 'border-red-500' : 'border-[#e2dbe6] dark:border-[#2a2a3e]'
              } bg-white dark:bg-[#0f0f1a] text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            />
            {errors.toolTechName && <p className="mt-1 text-red-500 text-sm">{errors.toolTechName}</p>}
          </div>
          
          {/* Rating */}
          <div className="mb-6">
            <label className="block text-[#7c608a] text-sm font-medium mb-2">
              Overall Rating
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setOverallRating(star)}
                  className={`text-2xl ${star <= overallRating ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  {star <= overallRating ? '★' : '☆'}
                </button>
              ))}
              <span className="ml-2 text-[#161118] dark:text-[#f5f7f8] text-sm font-bold">
                {overallRating.toFixed(1)} / 5
              </span>
            </div>
          </div>
          
          {/* One-liner Pros */}
          <div className="mb-6">
            <label htmlFor="oneLinerPros" className="block text-[#7c608a] text-sm font-medium mb-2">
              One-liner Pros
            </label>
            <input
              id="oneLinerPros"
              name="oneLinerPros"
              type="text"
              value={oneLinerPros}
              onChange={(e) => setOneLinerPros(e.target.value)}
              placeholder="What do you love most about this tool?"
              className="w-full px-4 py-3 rounded-lg border border-[#e2dbe6] dark:border-[#2a2a3e] bg-white dark:bg-[#0f0f1a] text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          {/* One-liner Cons */}
          <div className="mb-6">
            <label htmlFor="oneLinerCons" className="block text-[#7c608a] text-sm font-medium mb-2">
              One-liner Cons
            </label>
            <input
              id="oneLinerCons"
              name="oneLinerCons"
              type="text"
              value={oneLinerCons}
              onChange={(e) => setOneLinerCons(e.target.value)}
              placeholder="What are the downsides?"
              className="w-full px-4 py-3 rounded-lg border border-[#e2dbe6] dark:border-[#2a2a3e] bg-white dark:bg-[#0f0f1a] text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Detailed Review Section */}
        <div className="p-4 border-t border-[#e2dbe6] dark:border-[#2a2a3e]">
          <h2 className="text-[#161118] dark:text-[#f5f7f8] text-xl font-semibold mb-4">Detailed Review</h2>
          <p className="text-[#7c608a] text-sm mb-4">Write your detailed review of the tool or technology.</p>
          
          <VibeTipTapEditor
            initialContent={description || ''}
            initialFontPreference={fontPreference}
            onContentChange={setDescription}
            onFontChange={setFontPreference} content={''}          />
        </div>

        {/* Categorization Section */}
        <div className="p-4 border-t border-[#e2dbe6] dark:border-[#2a2a3e]">
          <h2 className="text-[#161118] dark:text-[#f5f7f8] text-xl font-semibold mb-4">Categorization & Tags</h2>
          
          <div className="mb-6">
            <label htmlFor="categoryTags" className="block text-[#7c608a] text-sm font-medium mb-2">
              Category Tags
            </label>
            <input
              id="categoryTags"
              name="categoryTags"
              type="text"
              value={categoryTags}
              onChange={(e) => setCategoryTags(e.target.value)}
              placeholder="e.g., Development, Design, Productivity (comma separated)"
              className="w-full px-4 py-3 rounded-lg border border-[#e2dbe6] dark:border-[#2a2a3e] bg-white dark:bg-[#0f0f1a] text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="mt-1 text-[#7c608a] text-sm">Separate tags with commas</p>
          </div>
        </div>

        {/* Media Section */}
        <div className="p-4 border-t border-[#e2dbe6] dark:border-[#2a2a3e]">
          <h2 className="text-[#161118] dark:text-[#f5f7f8] text-xl font-semibold mb-4">Media & Links</h2>
          
          {/* Hero Image URL */}
          <div className="mb-6">
            <label htmlFor="heroImageUrl" className="block text-[#7c608a] text-sm font-medium mb-2">
              Hero Image URL
            </label>
            <input
              id="heroImageUrl"
              name="heroImageUrl"
              type="text"
              value={heroImageUrl || ''}
              onChange={(e) => setHeroImageUrl(e.target.value || null)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 rounded-lg border border-[#e2dbe6] dark:border-[#2a2a3e] bg-white dark:bg-[#0f0f1a] text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="mt-1 text-[#7c608a] text-sm">URL of the image that represents your tool/tech review</p>
          </div>

          {/* Demo Video URL */}
          <div className="mb-6">
            <label htmlFor="demoVideoUrl" className="block text-[#7c608a] text-sm font-medium mb-2">
              Demo Video URL
            </label>
            <input
              id="demoVideoUrl"
              name="demoVideoUrl"
              type="text"
              value={demoVideoUrl}
              onChange={(e) => setDemoVideoUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full px-4 py-3 rounded-lg border border-[#e2dbe6] dark:border-[#2a2a3e] bg-white dark:bg-[#0f0f1a] text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="mt-1 text-[#7c608a] text-sm">Link to a video demo of the tool/technology</p>
          </div>
        </div>

        {/* Status and Actions Section */}
        <div className="p-4 border-t border-[#e2dbe6] dark:border-[#2a2a3e]">
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={async () => {
                setSaveDraftStatus('saving');
                setErrors({});

                try {
                  // Basic validation (only require title for draft)
                  if (!title.trim()) {
                    setErrors({ title: 'Title is required to save a draft.' });
                    setSaveDraftStatus('error');
                    return;
                  }

                  // Get current user
                  const { data: { session } } = await supabase.auth.getSession();
                  if (!session?.user) {
                    setErrors({ general: 'You need to be logged in to save a draft.' });
                    setSaveDraftStatus('error');
                    return;
                  }

                  // Prepare draft data
                  const draftData = {
                    user_id: session.user.id,
                    title: title.trim(),
                    tool_tech_name: toolTechName.trim(),
                    overall_rating: overallRating,
                    one_liner_pros: oneLinerPros.trim(),
                    one_liner_cons: oneLinerCons.trim(),
                    content: description.trim() || null,
                    hero_image_url: heroImageUrl?.trim() || null,
                    demo_video_url: demoVideoUrl.trim() || null,
                    font_preference: fontPreference,
                    updated_at: new Date().toISOString()
                  };

                  let newReviewId = draftId;

                  if (isEditingDraft && draftId) {
                    // Update existing draft
                    const { error: updateError } = await supabase
                      .from('tool_reviews')
                      .update(draftData)
                      .eq('id', draftId);

                    if (updateError) throw updateError;
                    newReviewId = draftId;
                  } else {
                    // Insert new draft
                    const { data: result, error: insertError } = await supabase
                      .from('tool_reviews')
                      .insert(draftData)
                      .select();

                    if (insertError) throw insertError;

                    // Get the ID of the newly created draft
                    newReviewId = result?.[0]?.id;
                    if (!newReviewId) {
                      throw new Error('Failed to get the ID of the newly created draft.');
                    }
                  }

                  // Handle related data
                  if (newReviewId) {
                    await handleRelatedData(newReviewId);
                  }

                  // Show success message
                  setSaveDraftStatus('saved');
                  
                  // If we just created a new draft, update state
                  if (!isEditingDraft && newReviewId) {
                    setDraftId(newReviewId);
                    setIsEditingDraft(true);
                  }
                  
                  // Reset status after 3 seconds
                  setTimeout(() => {
                    setSaveDraftStatus('idle');
                  }, 3000);
                } catch (error: any) {
                  console.error('Error saving draft:', error);
                  setErrors({ general: error.message || 'Failed to save draft. Please try again.' });
                  setSaveDraftStatus('error');
                  
                  // Reset status after 5 seconds
                  setTimeout(() => {
                    setSaveDraftStatus('idle');
                  }, 5000);
                }
              }}
              className="px-6 py-3 bg-[#e2dbe6] dark:bg-[#2a2a3e] text-[#161118] dark:text-[#f5f7f8] rounded-lg font-medium hover:bg-[#d0c5d8] dark:hover:bg-[#3a3a4e] transition-colors"
            >
              {saveDraftStatus === 'saving' 
                ? 'Saving...' 
                : saveDraftStatus === 'saved' 
                  ? 'Saved!' 
                  : 'Save Draft'}
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/80 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Publishing...' : isEditingDraft ? 'Update Review' : 'Publish Review'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ToolTechReviewForm;