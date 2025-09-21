// CommunityPosts.tsx
// This component displays the community posts in a feed format with infinite scroll
"use client";

import React, { useState, useEffect, useCallback } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  commentCount: number;
  likes: number;
  tags: string[];
  authorImageUrl: string;
}

const CommunityPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Sample data for community posts
  const generateSamplePosts = (pageNum: number): Post[] => {
    const startIndex = (pageNum - 1) * 5;
    return Array.from({ length: 5 }, (_, i) => ({
      id: startIndex + i + 1,
      title: `Community Discussion #${startIndex + i + 1}`,
      content: `This is the content of community post #${startIndex + i + 1}. In the Coding Lounge, we discuss various topics related to development, design, and the vibe of coding. What are your thoughts on the latest trends in web development? How do you maintain a creative and inspiring coding environment? This post continues with more detailed thoughts and insights about the topic at hand. We encourage everyone to share their experiences and perspectives in the comments below.`,
      author: `User${startIndex + i + 1}`,
      date: new Date(Date.now() - (startIndex + i) * 24 * 60 * 60 * 1000).toISOString(),
      commentCount: Math.floor(Math.random() * 50),
      likes: Math.floor(Math.random() * 100),
      tags: ['Discussion', 'Community', 'Vibe'],
      authorImageUrl: `https://i.pravatar.cc/150?u=${startIndex + i + 1}`
    }));
  };

  const loadPosts = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newPosts = generateSamplePosts(page);
    
    setPosts(prev => [...prev, ...newPosts]);
    setPage(prev => prev + 1);
    setLoading(false);
    
    // Simulate reaching the end after 5 pages
    if (page >= 5) {
      setHasMore(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    loadPosts();
  }, []);

  // Handle scroll for infinite loading
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        loadPosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadPosts]);

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

  return (
    <div className="px-4 pb-8 md:px-6 lg:px-8">
      <div className="space-y-6 max-w-2xl mx-auto">
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="overflow-hidden rounded-xl border border-primary/20 bg-background-light shadow-lg shadow-primary/10 dark:border-primary/30 dark:bg-background-dark"
          >
            {/* Post header */}
            <div className="flex items-center p-4">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-10 w-10"
                style={{ backgroundImage: `url("${post.authorImageUrl}")` }}
              ></div>
              <div className="ml-3">
                <p className="text-sm font-bold text-black dark:text-white">
                  {post.author}
                </p>
                <p className="text-xs text-black/60 dark:text-white/60">
                  {formatDate(post.date)}
                </p>
              </div>
            </div>
            
            {/* Post content */}
            <div className="px-4 pb-3">
              <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                {post.title}
              </h3>
              
              <p className="text-sm text-black/80 dark:text-white/80 mb-4">
                {post.content}
              </p>
            </div>
            
            {/* Tags */}
            <div className="px-4 pb-3">
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <span 
                    key={index} 
                    className="inline-block px-2 py-1 text-xs font-semibold text-primary bg-primary/10 dark:bg-primary/20 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Post actions */}
            <div className="flex border-t border-primary/10 dark:border-primary/20 px-4 py-3">
              <button className="flex items-center text-black/60 dark:text-white/60 hover:text-red-500">
                <span className="material-symbols-outlined mr-1">favorite_border</span>
                <span className="text-sm">{post.likes}</span>
              </button>
              <button className="flex items-center ml-4 text-black/60 dark:text-white/60 hover:text-primary">
                <span className="material-symbols-outlined mr-1">chat_bubble</span>
                <span className="text-sm">{post.commentCount}</span>
              </button>
              <button className="flex items-center ml-auto text-black/60 dark:text-white/60 hover:text-primary">
                <span className="material-symbols-outlined">share</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
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