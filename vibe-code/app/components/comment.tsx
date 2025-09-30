// Comment.tsx
// This component displays a single comment with author info, content, and action buttons
"use client";

import React, { useState } from 'react';
import { supabase } from '@/app/lib/supabaseClient';

interface CommentProps {
  comment: {
    id: string;
    user_id: string;
    content: string;
    created_at: string;
    updated_at: string;
    user_profiles: {
      display_name: string;
      avatar_url: string | null;
      username: string;
    }[] | null;
  };
  currentUser: any;
  projectId: string; // This can be a project ID, post ID, or any relevant ID
  postType: 'project' | 'review' | 'community' | 'news'; // Different types of posts
  onEdit?: (commentId: string, content: string) => void;
  onDelete?: (commentId: string) => void;
  onUpdate?: () => void;
}

const Comment: React.FC<CommentProps> = ({ 
  comment, 
  currentUser, 
  projectId, 
  postType, 
  onEdit,
  onDelete,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  
  const isCommentAuthor = currentUser && currentUser.id === comment.user_id;
  const profile = comment.user_profiles?.[0]; // 배열의 첫 번째 프로필을 가져옵니다.
  const displayName = profile?.display_name || profile?.username || 'Anonymous';
  const avatarUrl = profile?.avatar_url || 'https://placehold.co/100x100?text=Avatar';
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleUpdate = async () => {
    if (!editContent.trim()) return;

    try {
      const { error } = await supabase
        .from('comments')
        .update({
          content: editContent.trim(),
          updated_at: new Date().toISOString()
        })
        .eq('id', comment.id);

      if (error) throw error;

      setIsEditing(false);
      if (onUpdate) onUpdate();
    } catch (error: any) {
      console.error('Error updating comment:', error);
      alert(error.message || 'Failed to update comment.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', comment.id);

      if (error) throw error;

      if (onDelete) onDelete(comment.id);
    } catch (error: any) {
      console.error('Error deleting comment:', error);
      alert(error.message || 'Failed to delete comment.');
    }
  };

  return (
    <div 
      key={comment.id} 
      className="flex w-full flex-row items-start justify-start gap-3 p-4"
    >
      <div
        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
        style={{ backgroundImage: `url("${avatarUrl}")` }}
      ></div>
      <div className="flex h-full flex-1 flex-col items-start justify-start">
        <div className="flex w-full flex-row items-start justify-start gap-x-3">
          <p className="text-[#161118] text-sm font-bold leading-normal tracking-[0.015em]">{displayName}</p>
          <p className="text-[#7c608a] text-sm font-normal leading-normal">{formatDate(comment.created_at)}</p>
        </div>
        
        {isEditing ? (
          <div className="w-full mt-2">
            <textarea
              className="form-input w-full flex-1 resize-none overflow-hidden rounded-lg border border-[#e2dbe6] bg-white p-2 text-sm font-normal leading-normal text-[#161118] mb-2"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={3}
            ></textarea>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 bg-primary text-white rounded text-sm"
                onClick={handleUpdate}
              >
                Save
              </button>
              <button
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-[#161118] text-sm font-normal leading-normal mt-1">
              {comment.content}
            </p>
            {isCommentAuthor && (
              <div className="flex gap-2 mt-2">
                <button
                  className="text-xs text-blue-500 hover:text-blue-700"
                  onClick={() => {
                    setIsEditing(true);
                    if (onEdit) onEdit(comment.id, comment.content);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-xs text-red-500 hover:text-red-700"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;