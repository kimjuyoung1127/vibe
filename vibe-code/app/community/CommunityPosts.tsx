// CommunityPosts.tsx
// This component displays the community posts in a feed format with infinite scroll
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import PostItem from './PostItem';
import EditPostModal from './EditPostModal';
import ReportModal from '@/app/components/ReportModal';


interface Post {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  comment_count: number;
  vibe_check_count: number;
  username: string;
  avatar_url: string | null;
  tags: string[];
}

const CommunityPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editTags, setEditTags] = useState<string[]>([]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState<{ id: string; type: string } | null>(null);
  const router = useRouter();
  const POSTS_PER_PAGE = 10;

  // Get current user
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser(user.id);
      }
    };
    fetchUser();
  }, [supabase]);

  const loadPosts = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    try {
      // Fetch posts with user profile information
      const from = (page - 1) * POSTS_PER_PAGE;
      const to = from + POSTS_PER_PAGE - 1;

      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          id, 
          user_id, 
          title, 
          content, 
          created_at, 
          comment_count, 
          vibe_check_count,
          user_profiles(username, avatar_url)
        `)
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      if (!data || data.length === 0) {
        setHasMore(false);
        return;
      }

      // Fetch tags for each post
      const postIds = data.map(post => post.id);
      const { data: tagsData, error: tagsError } = await supabase
        .from('community_post_tags')
        .select('post_id, tag_name')
        .in('post_id', postIds);

      if (tagsError) throw tagsError;

      // Group tags by post_id
      const tagsMap = new Map<string, string[]>();
      if (tagsData) {
        tagsData.forEach(tag => {
          const postTags = tagsMap.get(tag.post_id) || [];
          postTags.push(tag.tag_name);
          tagsMap.set(tag.post_id, postTags);
        });
      }

      // Format the posts with tags
      const formattedPosts = data.map(post => ({
        id: post.id,
        user_id: post.user_id,
        title: post.title,
        content: post.content,
        created_at: post.created_at,
        comment_count: post.comment_count || 0,
        vibe_check_count: post.vibe_check_count || 0,
        username: post.user_profiles?.[0]?.username || 'Anonymous',
        avatar_url: post.user_profiles?.[0]?.avatar_url || null,
        tags: tagsMap.get(post.id) || []
      }));

      setPosts(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        const newPosts = formattedPosts.filter(p => !existingIds.has(p.id));
        return [...prev, ...newPosts];
      });
      
      // Check if we have less than requested posts to determine if there's more
      if (data.length < POSTS_PER_PAGE) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading community posts:', error);
    } finally {
      setLoading(false);
    }
    
    setPage(prev => prev + 1);
  }, [page, loading, hasMore, supabase]);

  useEffect(() => {
    loadPosts();
  }, []);

  // Handle scroll for infinite loading
  useEffect(() => {
    let isFetching = false; // Prevent multiple simultaneous fetches

    const handleScroll = async () => {
      if (isFetching || loading || !hasMore) return;
      
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        isFetching = true;
        await loadPosts();
        isFetching = false;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadPosts, loading, hasMore]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return `${Math.floor(diffInHours / 24)}d ago`;
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    const { error } = await supabase
      .from('community_posts')
      .delete()
      .eq('id', postId);

    if (error) {
      console.error('Error deleting post:', error);
    } else {
      // Remove the post from the UI
      setPosts(prev => prev.filter(post => post.id !== postId));
    }
  };

  const handleEditClick = (post: Post) => {
    setPostToEdit(post);
    setEditTitle(post.title);
    setEditContent(post.content);
    setEditTags([...post.tags]); // Create a copy of the tags
    setEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!postToEdit) return;

    // Update the post content
    const { error: postError } = await supabase
      .from('community_posts')
      .update({
        title: editTitle,
        content: editContent,
      })
      .eq('id', postToEdit.id);

    if (postError) {
      console.error('Error updating post:', postError);
      return;
    }

    // Delete existing tags for this post to replace with new ones
    await supabase
      .from('community_post_tags')
      .delete()
      .eq('post_id', postToEdit.id);

    // Insert new tags if any
    if (editTags.length > 0) {
      const tagsToInsert = editTags.map(tag => ({
        post_id: postToEdit.id,
        tag_name: tag
      }));

      const { error: tagsError } = await supabase
        .from('community_post_tags')
        .insert(tagsToInsert);

      if (tagsError) {
        console.error('Error updating tags:', tagsError);
      }
    }

    // Update the post in the UI
    setPosts(prev => 
      prev.map(post => 
        post.id === postToEdit.id 
          ? { ...post, title: editTitle, content: editContent, tags: editTags } 
          : post
      )
    );

    // Close modal
    setEditModalOpen(false);
    setPostToEdit(null);
    
    // Refresh the page to ensure all data is consistent
    router.refresh();
  };

  const handleReportClick = useCallback((targetId: string, targetType: string) => {
    console.log('handleReportClick called in CommunityPosts:', { targetId, targetType });
    setReportTarget({ id: targetId, type: targetType });
    setIsReportModalOpen(true);
    console.log('Report modal state updated:', { isReportModalOpen: true, targetId, targetType });
  }, [setReportTarget, setIsReportModalOpen]);
  
  return (
    <div className="px-4 pb-8 md:px-6 lg:px-8">
      <div className="space-y-6 max-w-2xl mx-auto">
        {posts.map((post) => (
          <PostItem 
            key={post.id}
            id={post.id}
            user_id={post.user_id}
            title={post.title}
            content={post.content}
            created_at={post.created_at}
            comment_count={post.comment_count}
            vibe_check_count={post.vibe_check_count}
            username={post.username}
            avatar_url={post.avatar_url}
            tags={post.tags}
            currentUser={currentUser}
            onEdit={handleEditClick}
            onDelete={handleDelete}
            formatDate={formatDate}
            contentType="community_post"
            onReportClick={handleReportClick}
          />
        ))}
      </div>
      
      <EditPostModal 
        isOpen={editModalOpen}
        postToEdit={postToEdit}
        editTitle={editTitle}
        editContent={editContent}
        editTags={editTags}
        setEditTitle={setEditTitle}
        setEditContent={setEditContent}
        setEditTags={setEditTags}
        onClose={() => setEditModalOpen(false)}
        onSave={handleUpdate}
      />
      
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        targetId={reportTarget?.id || ''}
        targetType={reportTarget?.type as 'community_post' || 'community_post'}
      />
      
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      
      {!hasMore && (
        <div className="text-center py-8 text-[#7c608a] dark:text-[#c5b3d1]">
          You've reached the end of the lounge
        </div>
      )}
    </div>
  );
};

export default CommunityPosts;