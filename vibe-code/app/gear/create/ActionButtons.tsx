// ActionButtons.tsx
// This component handles the action buttons section of the tool/tech review form
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/lib/supabaseClient';

interface ActionButtonsProps {
  loading: boolean;
  formData: {
    title: string;
    toolTechName: string;
    overallRating: number;
    oneLinerPros: string;
    oneLinerCons: string;
    content: string;
    heroImageUrl: string;
    demoVideoUrl: string;
    fontPreference: string;
    category: string;
  };
  isEditing?: boolean;  // Whether we're editing an existing review
  reviewId?: string;    // The ID of the review being edited (if applicable)
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ loading, formData, isEditing, reviewId }) => {
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
        throw new Error('User not authenticated');
      }

      // Prepare the review data
      const reviewData = {
        user_id: session.user.id,
        title: formData.title || 'Untitled Review',
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
          .eq('id', reviewId);
      } else {
        // Insert new review
        result = await supabase
          .from('tool_reviews')
          .insert([reviewData]);
      }

      if (result.error) throw result.error;

      setDraftStatus('Saved');
      setTimeout(() => setDraftStatus(null), 2000); // Reset status after 2 seconds

      // If this is a new review, navigate to the edit page with the new ID
      if (!isEditing) {
        // Get the ID of the newly created review
        const { data, error } = await supabase
          .from('tool_reviews')
          .select('id')
          .match({ 
            user_id: session.user.id,
            title: formData.title || 'Untitled Review'
          })
          .order('created_at', { ascending: false })
          .limit(1);

        if (!error && data && data.length > 0) {
          router.push(`/gear/create?id=${data[0].id}`);
        }
      }
    } catch (err: any) {
      console.error('Error saving draft:', err);
      setError(err.message || 'Failed to save draft');
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
        Cancel
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
              <span className="animate-spin mr-2">🌀</span> Saving...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined mr-2">save</span>
              {draftStatus === 'Saved' ? 'Saved' : 'Save Draft'}
            </>
          )}
        </button>
        
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Publishing...' : (isEditing ? 'Update Review' : 'Publish Review')}
        </button>
      </div>
      
      {error && (
        <div className="col-span-full mt-2 text-red-500 text-sm">{error}</div>
      )}
    </div>
  );
};

export default ActionButtons;