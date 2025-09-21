// CommunityPostContentSection.tsx
// This component contains the content section for creating community posts
"use client";

import React, { useState } from 'react';

const CommunityPostContentSection = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  return (
    <div className="p-4">
      {/* Title field */}
      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-medium text-[#161118] dark:text-[#f5f7f8] mb-2">
          Post Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-[#e2dbe6] dark:border-[#1a1a2e] rounded-lg text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter a title for your post"
          required
        />
      </div>
      
      {/* Content field */}
      <div className="mb-6">
        <label htmlFor="content" className="block text-sm font-medium text-[#161118] dark:text-[#f5f7f8] mb-2">
          Post Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-[#e2dbe6] dark:border-[#1a1a2e] rounded-lg text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Share your thoughts with the community..."
          required
        ></textarea>
      </div>
      
      {/* Tags field */}
      <div className="mb-6">
        <label htmlFor="tags" className="block text-sm font-medium text-[#161118] dark:text-[#f5f7f8] mb-2">
          Tags (comma separated)
        </label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-[#e2dbe6] dark:border-[#1a1a2e] rounded-lg text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="e.g., Discussion, Help, Inspiration"
        />
      </div>
      
      {/* Submit button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Publish Post
        </button>
      </div>
    </div>
  );
};

export default CommunityPostContentSection;