// CommentsSection.tsx
// This component displays the comments section with a form and existing comments
"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabaseClient';

interface Comment {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_profiles: {
    display_name: string;
    avatar_url: string;
    username: string;
  }[] | null; // user_profiles를 객체에서 객체 배열로 수정
}

const CommentsSection = ({ projectId }: { projectId: string }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
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
    if (projectId) {
      fetchComments();
    }
  }, [projectId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('comments')
        .select(`
          id,
          user_id,
          content,
          created_at,
          updated_at,
          user_profiles (display_name, avatar_url, username)
        `)
        .eq('post_id', projectId)
        .eq('post_type', 'project')
        .order('created_at', { ascending: true });

      if (error) throw error;

      setComments(data || []);
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
          post_id: projectId,
          post_type: 'project',
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

  const handleEdit = (commentId: string, content: string) => {
    setEditingCommentId(commentId);
    setEditingContent(content);
  };

  const handleUpdate = async (commentId: string) => {
    if (!editingContent.trim()) return;

    try {
      const { error } = await supabase
        .from('comments')
        .update({
          content: editingContent.trim(),
          updated_at: new Date().toISOString()
        })
        .eq('id', commentId);

      if (error) throw error;

      setEditingCommentId(null);
      setEditingContent('');
      fetchComments(); // Refresh comments
    } catch (error: any) {
      console.error('Error updating comment:', error);
      setError(error.message || 'Failed to update comment.');
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      fetchComments(); // Refresh comments
    } catch (error: any) {
      console.error('Error deleting comment:', error);
      setError(error.message || 'Failed to delete comment.');
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
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
      {comments.map((comment) => {
        const isCommentAuthor = currentUser && currentUser.id === comment.user_id;
        const profile = comment.user_profiles?.[0]; // 배열의 첫 번째 프로필을 가져옵니다.
        const displayName = profile?.display_name || profile?.username || 'Anonymous';
        const avatarUrl = profile?.avatar_url || 'https://placehold.co/100x100?text=Avatar';
        
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
              
              {editingCommentId === comment.id ? (
                <div className="w-full mt-2">
                  <textarea
                    className="form-input w-full flex-1 resize-none overflow-hidden rounded-lg border border-[#e2dbe6] bg-white p-2 text-sm font-normal leading-normal text-[#161118] mb-2"
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    rows={3}
                  ></textarea>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 bg-primary text-white rounded text-sm"
                      onClick={() => handleUpdate(comment.id)}
                    >
                      Save
                    </button>
                    <button
                      className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm"
                      onClick={() => setEditingCommentId(null)}
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
                        onClick={() => handleEdit(comment.id, comment.content)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-xs text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(comment.id)}
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
      })}
      
      {comments.length === 0 && (
        <div className="p-4 text-center text-[#7c608a]">
          No comments yet. Be the first to comment!
        </div>
      )}
    </div>
  );
};

export default CommentsSection;