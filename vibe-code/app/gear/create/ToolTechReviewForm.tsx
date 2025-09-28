// ToolTechReviewForm.tsx
// This component provides the form for creating new tool/tech reviews
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/app/lib/supabaseClient';
import CoreInfoSection from './CoreInfoSection';
import DetailedReviewSection from './DetailedReviewSection';
import MediaSection from './MediaSection';
import CategorizationSection from './CategorizationSection';
import ActionButtons from './ActionButtons';

const ToolTechReviewForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reviewId = searchParams.get('id'); // Get review ID from query params for editing
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    toolTechName: '',
    overallRating: 3,
    oneLinerPros: '',
    oneLinerCons: '',
    content: '',
    heroImageUrl: '',
    demoVideoUrl: '',
    fontPreference: 'Modern Sans-serif',
    category: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
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
        setFormData({
          title: data.title,
          toolTechName: data.tool_tech_name,
          overallRating: data.overall_rating,
          oneLinerPros: data.one_liner_pros || '',
          oneLinerCons: data.one_liner_cons || '',
          content: data.content,
          heroImageUrl: data.hero_image_url || '',
          demoVideoUrl: data.demo_video_url || '',
          fontPreference: data.font_preference,
          category: ''  // We'll load this separately if needed
        });
        
        setIsEditing(true);
      } catch (err: any) {
        console.error('Error loading review data:', err);
        setError(err.message || 'Failed to load review data. Please try again.');
      }
    };
    
    loadReviewData();
  }, [reviewId]);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Get the current user
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        throw new Error('You must be logged in to create a review');
      }
      
      // Prepare the review data
      const reviewData = {
        user_id: session.user.id,
        title: formData.title,
        tool_tech_name: formData.toolTechName,
        overall_rating: formData.overallRating,
        one_liner_pros: formData.oneLinerPros,
        one_liner_cons: formData.oneLinerCons,
        content: formData.content,
        hero_image_url: formData.heroImageUrl,
        demo_video_url: formData.demoVideoUrl,
        font_preference: formData.fontPreference
      };
      
      let result;
      if (isEditing && reviewId) {
        // Update existing review
        result = await supabase
          .from('tool_reviews')
          .update(reviewData)
          .eq('id', reviewId)
          .select()
          .single();
      } else {
        // Insert new review
        result = await supabase
          .from('tool_reviews')
          .insert([reviewData])
          .select()
          .single();
      }
      
      if (result.error) throw result.error;
      
      // If category is selected, insert it into the review_categories table
      if (formData.category) {
        // First, delete any existing categories for this review
        await supabase
          .from('review_categories')
          .delete()
          .eq('review_id', result.data.id);
        
        // Then insert the new category
        const { error: categoryError } = await supabase
          .from('review_categories')
          .insert([
            {
              review_id: result.data.id,
              category_name: formData.category
            }
          ]);
          
        if (categoryError) throw categoryError;
      }
      
      // Redirect to the new review page
      router.push(`/gear/${result.data.id}`);
    } catch (err: any) {
      console.error('Error creating/updating review:', err);
      setError(err.message || 'Failed to create/update review. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1 p-4">
      <div className="flex flex-wrap justify-between gap-3 mb-6">
        <div className="flex min-w-72 flex-col gap-3">
          <h1 className="text-[#161118] tracking-light text-[32px] font-bold leading-tight">
            {isEditing ? 'Edit Tool/Tech Review' : 'Create New Tool/Tech Review'}
          </h1>
          <p className="text-[#7c608a] text-sm font-normal leading-normal">
            {isEditing ? 'Update your tool & tech review' : 'Share your experience with tools and technologies'}
          </p>
        </div>
      </div>
      
      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <CoreInfoSection formData={formData} handleChange={handleChange} setFormData={setFormData} />
        <CategorizationSection formData={formData} handleChange={handleChange} />
        
        <DetailedReviewSection formData={formData} handleChange={handleChange} />
        <MediaSection formData={formData} setFormData={setFormData} />
        <ActionButtons 
          loading={loading} 
          formData={formData}
          isEditing={isEditing}
          reviewId={reviewId || undefined}
        />
      </form>
    </div>
  );
};

export default ToolTechReviewForm;