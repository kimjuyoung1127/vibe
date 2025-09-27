// NewsArticleCard.tsx
// This component displays a single news article card
"use client";

import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ArticleCardProps {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

const NewsArticleCard: React.FC<ArticleCardProps> = ({ 
  id, 
  category, 
  title, 
  excerpt, 
  author, 
  date, 
  readTime,
  imageUrl
}) => {
  return (
    <Link href={`/news/${id}`} className="block">
      <div className="overflow-hidden rounded-xl border border-primary/20 bg-background-light shadow-lg shadow-primary/10 dark:border-primary/30 dark:bg-background-dark hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Article image */}
        <div 
          className="w-full h-48 bg-cover bg-center" 
          style={{ backgroundImage: `url("${imageUrl}")` }}
        ></div>
        
        {/* Article content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 dark:bg-primary/20 rounded-full">
              {category}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-black dark:text-white mb-3 line-clamp-2">
            {title}
          </h3>
          
          <div className="text-sm text-black/60 dark:text-white/60 mb-4 line-clamp-3">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({node, ...props}) => <span className="inline" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-black dark:text-white" {...props} />,
                em: ({node, ...props}) => <em className="italic" {...props} />,
                code: ({node, ...props}) => <code className="bg-[#1a1a2e] text-primary px-1 py-0.5 rounded text-xs font-mono" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside inline" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-inside inline" {...props} />,
                li: ({node, ...props}) => <li className="inline" {...props} />,  // Making list items display inline in the excerpt
              }}
            >
              {excerpt}
            </ReactMarkdown>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-xs text-black/50 dark:text-white/50">
              {author}
            </div>
            <div className="text-xs text-black/50 dark:text-white/50">
              {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {readTime}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsArticleCard;