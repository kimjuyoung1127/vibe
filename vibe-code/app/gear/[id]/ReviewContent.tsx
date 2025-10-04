


// ReviewContent.tsx
// This component displays the main content of the review
"use client";

import React from 'react';

interface ReviewContentProps {
  content: string;
}

const ReviewContent: React.FC<ReviewContentProps> = ({ content }) => {
  return (
    <div 
      className="px-4 pb-6 text-[#161118] dark:text-[#f5f7f8] prose max-w-none prose-headings:text-[#161118] dark:prose-headings:text-[#f5f7f8] prose-p:text-[#161118] dark:prose-p:text-[#f5f7f8] prose-strong:text-[#161118] dark:prose-strong:text-[#f5f7f8]"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
};

export default ReviewContent;