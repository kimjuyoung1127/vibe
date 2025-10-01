// VibeEditorRenderer.tsx
// This component renders content with Vibe-specific formatting options (pop color highlights, 
// alert/info boxes, pixel art banners, colorful code blocks, and font selection)
// Updated to properly render TipTap-generated HTML content
"use client";

import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { ContentRendererProps } from '@/app/types/components';

const VibeEditorRenderer: React.FC<ContentRendererProps> = ({
  content,
  maxWidthClass = "max-w-[65ch]",
  containerClass = "max-w-[672px] md:max-w-[768px] lg:max-w-[896px] xl:max-w-[960px] mx-auto"
}) => {
  // Sanitize content to prevent XSS
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div className={`break-words px-4 pb-6 text-[#161118] dark:text-[#f5f7f8] ${containerClass} pt-6`}>
      <style jsx>{`
        .break-words {
          word-break: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
        }
        
        .content-container {
          font-family: 'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
          font-size: 1.125rem; /* Slightly larger for better readability */
          line-height: 1.9;
          letter-spacing: -0.004em;
          padding: 0 1rem;
          color: #1e293b; /* Darker color for better contrast */
        }
        
        .content-container > * {
          margin-bottom: 1.5rem; /* More generous spacing */
        }
        
        .content-container h1,
        .content-container h2,
        .content-container h3,
        .content-container h4,
        .content-container h5,
        .content-container h6 {
          font-family: 'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
          line-height: 1.3;
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-weight: 600;
          color: #0f172a; /* Darker headings for better contrast */
        }
        
        .content-container h1 {
          font-size: 2rem;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 0.5rem;
        }
        
        .content-container h2 {
          font-size: 1.5rem;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 0.3rem;
        }
        
        .content-container h3 {
          font-size: 1.25rem;
        }
        
        .content-container p {
          margin-bottom: 1.25rem;
          line-height: 1.9;
          text-align: justify; /* For better readability of long texts */
        }
        
        .content-container ul,
        .content-container ol {
          margin: 1.25rem 0;
          padding-left: 1.75em;
        }
        
        .content-container li {
          margin-bottom: 0.5rem;
          line-height: 1.8;
          padding: 0.15rem 0; /* Add some vertical padding to list items */
        }
        
        .content-container ul {
          list-style-type: disc;
        }
        
        .content-container ol {
          list-style-type: decimal;
        }
        
        .content-container ul ul,
        .content-container ol ol,
        .content-container ul ol,
        .content-container ol ul {
          margin: 0.5rem 0;
        }
        
        .content-container blockquote {
          border-left: 5px solid #64748b; /* Thicker, more prominent border */
          padding: 0.5rem 1.5rem;
          margin: 1.5rem 0;
          font-style: italic;
          background-color: #f8fafc; /* Light background for better visual distinction */
          border-radius: 0 0.5rem 0.5rem 0;
          color: #334155;
          position: relative;
          overflow: hidden;
        }
        
        .content-container blockquote::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 4px;
          background: linear-gradient(to bottom, #94a3b8, #64748b);
        }
        
        .content-container code {
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
          font-size: 0.9em; /* Slightly larger for better readability */
          padding: 0.25em 0.5em;
          background-color: #f1f5f9;
          border-radius: 0.375rem;
          color: #dc2626; /* Better contrast for code */
          border: 1px solid #e2e8f0;
        }
        
        .content-container pre {
          background-color: #1e293b;
          color: #e2e8f0;
          padding: 1.25rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
          border: 1px solid #334155; /* Subtle border */
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); /* Subtle shadow */
        }
        
        .content-container pre code {
          background: none;
          padding: 0;
          color: inherit;
          font-size: 0.9rem;
          border: none;
        }
        
        .content-container a {
          color: #3b82f6; /* Blue links for better recognition */
          text-decoration: underline;
          text-decoration-thickness: 1px;
        }
        
        .content-container a:hover {
          color: #2563eb;
          text-decoration-thickness: 2px;
        }
        
        .content-container strong {
          font-weight: 600;
          color: #0f172a;
        }
        
        .content-container em {
          color: #334155;
        }
        
        .content-container hr {
          border: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, #cbd5e1, transparent);
          margin: 2rem 0;
        }
        
        /* Vibe-specific styles */
        .vibe-alert {
          background-color: #fef2f2;
          border-left: 4px solid #ef4444;
          padding: 1rem;
          margin: 1.5rem 0;
          border-radius: 0.375rem;
          color: #dc2626;
          line-height: 1.6;
        }
        
        .dark .vibe-alert {
          background-color: #2d1b2a;
          border-left: 4px solid #f87171;
          color: #fca5a5;
        }
        
        .vibe-info {
          background-color: #eff6ff;
          border-left: 4px solid #3b82f6;
          padding: 1rem;
          margin: 1.5rem 0;
          border-radius: 0.375rem;
          color: #2563eb;
          line-height: 1.6;
        }
        
        .dark .vibe-info {
          background-color: #1b2a3a;
          border-left: 4px solid #60a5fa;
          color: #93c5fd;
        }
        
        .vibe-pixel-banner {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 1.5rem;
          margin: 1.5rem 0;
          border-radius: 0.5rem;
          text-align: center;
          color: white;
          font-weight: bold;
          font-size: 1.25rem;
          text-transform: uppercase;
          letter-spacing: 0.1rem;
          position: relative;
          overflow: hidden;
          line-height: 1.4;
        }
        
        .vibe-pixel-banner::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.1) 50%),
            linear-gradient(transparent 50%, rgba(255,255,255,0.1) 50%);
          background-size: 4px 4px;
          pointer-events: none;
        }
        
        .vibe-code-block {
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 1rem;
          margin: 1.5rem 0;
          border-radius: 0.375rem;
          overflow-x: auto;
          font-family: 'Courier New', Consolas, monospace;
          font-size: 0.875rem;
          line-height: 1.5;
        }
        
        .vibe-code-block code {
          background: none;
          color: inherit;
          padding: 0;
          font-size: inherit;
        }
        
        .vibe-highlight {
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-weight: 500;
        }
        
        @media (max-width: 768px) {
          .content-container {
            font-size: 0.95rem;
            line-height: 1.65;
            padding: 0 0.5rem;
          }
          
          .content-container h1 {
            font-size: 1.5rem;
          }
          
          .content-container h2 {
            font-size: 1.3rem;
          }
          
          .content-container h3 {
            font-size: 1.15rem;
          }
          
          .break-words {
            word-break: break-word;
            overflow-wrap: break-word;
            hyphens: auto;
            -webkit-hyphens: auto;
            -ms-hyphens: auto;
          }
          
          .mobile-code {
            font-size: 0.8rem;
            white-space: pre-wrap;
            word-wrap: break-word;
          }
        }
      `}</style>
      
      <div 
        className={`content-container ${maxWidthClass} mx-auto`}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
      />
    </div>
  );
};

export default VibeEditorRenderer;