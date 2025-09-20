// CommentsSection.tsx
// This component displays the comments section with a form and existing comments
"use client";

import React, { useState } from 'react';

interface Comment {
  id: number;
  author: string;
  date: string;
  content: string;
  avatarUrl: string;
  isAuthor?: boolean;
}

const CommentsSection = () => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the comment to a backend
    console.log('Submitting comment:', comment);
    setComment('');
  };

  const comments: Comment[] = [
    {
      id: 1,
      author: "Ethan Carter",
      date: "July 22, 2024",
      content: "This is a fantastic project! The design is clean and intuitive, and the features are well-thought-out. I especially like the collaborative workspaces.",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJK-_3qOxQbb4g-Dr6AJd0RGYiG2c_PXD2DKd2p_wKjJGiuQNVrfRwsfNl979HhjREUnVgxwHRCtb1jr-09rr9jODy5DZc3VWXoz2U88rFgdiDY9T_O3icCstAUjsGoIF6t5wtY2E8aKqGHDZZs6hkkwCbLCjRNrD8C788KRS-SyFA-lQ2ZEsmyJ6P21MsC275SSfyJdn96rkhujN6Yfdk3VImH4km7v8Kf5IK0d83eLItzQh7dJayC0kYwC3fB2Yo23s1ImW4Aa_7"
    },
    {
      id: 2,
      author: "Olivia Bennett",
      date: "July 23, 2024",
      content: "Great work, Alex! The 'Vibe Check' feature is a unique touch. I'm curious about the technology stack you used.",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCA0G71OijdRTshAMnpS74pVadvOpy_0vgjo3tsYBehQPAHhDmKlJshv8SNLfEEKY6eYQ_m44Wvsbt8NJSnIVaScdEIrAK9zY97qv_-AMjKjevBKupKBj_zrpuN8NSSvdHuHC0GR8U74a00-fYMPUDU9e0C8DpAMFjRjuouVYPy3t6JCRF-E3vLUVb_PM2mvVpi6fuPx3Ha5B1dEH9zomXfjsNHbuEdlnDr9Ov_6Epks3FDUyYkyzCi0hZSa_nGb-4P07zeLZ8W_YYQ"
    },
    {
      id: 3,
      author: "Alex Ryder",
      date: "July 23, 2024",
      content: "Thanks, Olivia! I used React, Node.js, PostgreSQL, Tailwind CSS, and Figma for this project. Feel free to ask if you have any more questions.",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_ydb5tDbHbYUVKoVTQsWKaqQUMaIkPRt3bpRkVDbwJ-21R0xOda3VO02mWG-QxUHtbdJr3fx4x-g89wB5x2L3cMD_iKFohY6OARz1U8xUrvvjobtVwsq6HId-PMRbLlEE_casGnJQs9O7WK8fqaL8pwq9p708mo6eN7sMz83mQfeIVjRks_WD6zonEvMcRj-yC0IXlHULZelW5JKJ4jcviA8eJV_hmJ-ycTPfbFzK-msmXE77gABpUUp6yRZB7xcxDPUZnA4H-xA-",
      isAuthor: true
    }
  ];

  return (
    <div>
      {/* Comment form */}
      <div className="flex items-start gap-3 p-4">
        <div className="flex h-full w-full flex-1 flex-col">
          <textarea
            placeholder="Add a comment..."
            className="form-input mb-2 w-full flex-1 resize-none overflow-hidden rounded-lg border border-[#e2dbe6] bg-white p-3 text-base font-normal leading-normal text-[#161118] placeholder:text-[#c8bacf] focus:border-[#e2dbe6] focus:outline-0 focus:ring-0"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div className="flex justify-end">
            <button
              className="min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#af25f4] px-4 py-2 text-sm font-medium leading-normal text-white"
              onClick={handleSubmit}
            >
              <span className="truncate">Post</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Existing comments */}
      {comments.map((comment) => (
        <div 
          key={comment.id} 
          className={`flex w-full flex-row items-start justify-start gap-3 p-4 ${comment.isAuthor ? 'pl-[68px]' : ''}`}
        >
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
            style={{ backgroundImage: `url("${comment.avatarUrl}")` }}
          ></div>
          <div className="flex h-full flex-1 flex-col items-start justify-start">
            <div className="flex w-full flex-row items-start justify-start gap-x-3">
              <p className="text-[#161118] text-sm font-bold leading-normal tracking-[0.015em]">{comment.author}</p>
              <p className="text-[#7c608a] text-sm font-normal leading-normal">{comment.date}</p>
            </div>
            <p className="text-[#161118] text-sm font-normal leading-normal">
              {comment.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsSection;