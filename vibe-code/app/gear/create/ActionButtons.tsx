"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/lib/supabaseClient';
import { ActionButtonsProps } from '@/app/types/gear';
import { useTranslations } from '@/app/hooks/useTranslations';

const ActionButtons: React.FC<ActionButtonsProps> = ({ loading, formData, isEditing, reviewId }) => {
  const { t } = useTranslations();
  const router = useRouter();
  const [isDraftSaving, setIsDraftSaving] = useState(false);
  const [draftStatus, setDraftStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const saveDraft = async () => {
    setIsDraftSaving(true);
    setDraftStatus(null);
    setError(null);

    try {
      // Get the current user
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        throw new Error(t('common.userNotAuthenticated', 'User not authenticated'));
      }

      // Prepare the review data
      const reviewData = {
        user_id: session.user.id,
        title: formData.title || t('common.untitledReview', 'Untitled Review'),
        tool_tech_name: formData.toolTechName,
        overall_rating: formData.overallRating,
        one_liner_pros: formData.oneLinerPros,
        one_liner_cons: formData.oneLinerCons,
        content: formData.content,
        hero_image_url: formData.heroImageUrl,
        demo_video_url: formData.demoVideoUrl,
      };

      let result;
      if (isEditing && reviewId) {
        // Update existing review
        result = await supabase
          .from('tool_reviews')
          .update(reviewData)
          .eq('id', reviewId);
      } else {
        // Insert new review
        result = await supabase
          .from('tool_reviews')
          .insert([reviewData]);
      }

      if (result.error) throw result.error;

      setDraftStatus(t('common.saved', 'Saved'));
      setTimeout(() => setDraftStatus(null), 2000); // Reset status after 2 seconds

      // If this is a new review, navigate to the edit page with the new ID
      if (!isEditing) {
        // Get the ID of the newly created review
        const { data, error } = await supabase
          .from('tool_reviews')
          .select('id')
          .match({ 
            user_id: session.user.id,
            title: formData.title || t('common.untitledReview', 'Untitled Review')
          })
          .order('created_at', { ascending: false })
          .limit(1);

        if (!error && data && data.length > 0) {
          router.push(`/gear/create?id=${data[0].id}`);
        }
      }
    } catch (err: any) {
      console.error('Error saving draft:', err);
      setError(err.message || t('common.failedToSaveDraft', 'Failed to save draft'));
    } finally {
      setIsDraftSaving(false);
    }
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-3">
      <button
        type="button"
        onClick={() => router.back()}
        className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
      >
        {t('common.cancel', 'Cancel')}
      </button>
      
      <div className="flex gap-3">
        <button
          type="button"
          onClick={saveDraft}
          disabled={isDraftSaving || loading}
          className="px-6 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors disabled:opacity-50 flex items-center"
        >
          {isDraftSaving ? (
            <>
              <span className="animate-spin mr-2">🌀</span> {t('common.saving', 'Saving...')}
            </>
          ) : (
            <>
              <span className="material-symbols-outlined mr-2">save</span>
              {draftStatus === t('common.saved', 'Saved') ? t('common.saved', 'Saved') : t('common.saveDraft', 'Save Draft')}
            </>
          )}
        </button>
        
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? t('common.publishing', 'Publishing...') : (isEditing ? t('common.updateReview', 'Update Review') : t('common.publishReview', 'Publish Review'))}
        </button>
      </div>
      
      {error && (
        <div className="col-span-full mt-2 text-red-500 text-sm">{error}</div>
      )}
    </div>
  );
};

export default ActionButtons;