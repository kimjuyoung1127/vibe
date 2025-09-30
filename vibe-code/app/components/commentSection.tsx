// CommentSection.tsx
// This component displays the comment section with a form and existing comments
"use client";

import React, { useState, useEffect } from 'react';
import Comment from './comment';
import { supabase } from '@/app/lib/supabaseClient';

interface CommentItem {
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
}

interface CommentSectionProps {
  targetId: string; // The ID of the project, post, review, news article, etc.
  postType: 'project' | 'review' | 'community' | 'news'; // Type of the target
}

const CommentSection: React.FC<CommentSectionProps> = ({ targetId, postType }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Fetch current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setCurrentUser(session?.user || null);
    };

    fetchCurrentUser();
  }, []);

  // Fetch comments
  useEffect(() => {
    if (targetId) {
      fetchComments();
    }
  }, [targetId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      setError(null);

      // First, fetch comments with user profiles (using left join)
      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select(`
          id,
          user_id,
          content,
          created_at,
          updated_at,
          user_profiles!left (display_name, avatar_url, username)
        `)
        .eq('post_id', targetId)
        .eq('post_type', postType)
        .order('created_at', { ascending: true });

      if (commentsError) throw commentsError;

      // Process comments to handle cases where user profile doesn't exist
      // We'll fetch auth user data for comments without profiles using our server API
      const commentsWithAuthUsers = await Promise.all(
        commentsData?.map(async (comment) => {
          // If the user profile exists, return as is
          if (comment.user_profiles && comment.user_profiles.length > 0) {
            return comment;
          } else {
            // If no profile exists, try to get user info from our server API
            try {
              const response = await fetch(`/api/users/${comment.user_id}`);
              if (!response.ok) {
                throw new Error(`Failed to fetch user: ${response.statusText}`);
              }
              
              const userData = await response.json();
              
              if (userData) {
                // Return comment with minimal user info from auth system
                return {
                  ...comment,
                  user_profiles: [{
                    display_name: userData.user_metadata?.full_name || 
                                 userData.email?.split('@')[0] || 
                                 'User',
                    avatar_url: userData.user_metadata?.avatar_url || null,
                    username: userData.user_metadata?.user_name || 
                             userData.email?.split('@')[0] || 
                             'user'
                  }]
                };
              } else {
                // If we can't get user data, return with anonymous profile
                return {
                  ...comment,
                  user_profiles: [{
                    display_name: 'Anonymous',
                    avatar_url: null,
                    username: 'anonymous'
                  }]
                };
              }
            } catch (apiError) {
              // If we can't get user data, return with anonymous profile
              return {
                ...comment,
                user_profiles: [{
                  display_name: 'Anonymous',
                  avatar_url: null,
                  username: 'anonymous'
                }]
              };
            }
          }
        }) || []
      );

      setComments(commentsWithAuthUsers);
    } catch (error: any) {
      console.error('Error fetching comments:', error);
      setError(error.message || 'Failed to load comments.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim() || !currentUser) return;

    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          user_id: currentUser.id,
          post_id: targetId,
          post_type: postType,
          content: comment.trim()
        });

      if (error) throw error;

      setComment('');
      fetchComments(); // Refresh comments
    } catch (error: any) {
      console.error('Error submitting comment:', error);
      setError(error.message || 'Failed to submit comment.');
    }
  };

  const handleUpdate = () => {
    fetchComments();
  };

  const handleDelete = (commentId: string) => {
    fetchComments();
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Comment form - only show if user is logged in */}
      {currentUser ? (
        <div className="flex items-start gap-3 p-4">
          <div className="flex h-full w-full flex-1 flex-col">
            <textarea
              placeholder="Add a comment..."
              className="form-input mb-2 w-full flex-1 resize-none overflow-hidden rounded-lg border border-[#e2dbe6] bg-white p-3 text-base font-normal leading-normal text-[#161118] placeholder:text-[#c8bacf] focus:border-[#e2dbe6] focus:outline-0 focus:ring-0"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            ></textarea>
            <div className="flex justify-end">
              <button
                className="min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#af25f4] px-4 py-2 text-sm font-medium leading-normal text-white disabled:opacity-50"
                onClick={handleSubmit}
                disabled={!comment.trim()}
              >
                <span className="truncate">Post</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 text-center text-[#7c608a]">
          Please log in to post a comment.
        </div>
      )}
      
      {/* Existing comments */}
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          currentUser={currentUser}
          projectId={targetId}
          postType={postType}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
      
      {comments.length === 0 && (
        <div className="p-4 text-center text-[#7c608a]">
          No comments yet. Be the first to comment!
        </div>
      )}
    </div>
  );
};

export default CommentSection;