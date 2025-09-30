// ContentRenderer.tsx
// This component renders content with enhanced mobile text wrapping and formatting
"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ContentRendererProps } from '@/app/types/components';

const ContentRenderer: React.FC<ContentRendererProps> = ({
  content,
  maxWidthClass = "max-w-[65ch]",
  containerClass = "max-w-[672px] md:max-w-[768px] lg:max-w-[896px] xl:max-w-[960px] mx-auto"
}) => {
  return (
    <div className={`break-words px-4 pb-6 text-[#161118] dark:text-[#f5f7f8] ${containerClass} pt-6`}>
      <style jsx>{`
        .break-words {
          word-break: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
        }
        
        @media (max-width: 768px) {
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
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({node, ...props}) => <h1 className={`${maxWidthClass} text-3xl font-bold mt-10 mb-6 text-primary dark:text-primary/90 border-b border-primary/20 pb-2 mx-auto break-words`} {...props} />,
          h2: ({node, ...props}) => <h2 className={`${maxWidthClass} text-2xl font-bold mt-8 mb-5 text-primary dark:text-primary/90 border-b border-primary/10 pb-1.5 mx-auto break-words`} {...props} />,
          h3: ({node, ...props}) => <h3 className={`${maxWidthClass} text-xl font-bold mt-6 mb-4 text-[#161118] dark:text-[#f5f7f8] mx-auto break-words`} {...props} />,
          p: ({node, ...props}) => <p className={`${maxWidthClass} mb-6 leading-relaxed text-lg text-[#161118] dark:text-[#f5f7f8] mx-auto break-words`} {...props} />,
          ul: ({node, ...props}) => <ul className={`${maxWidthClass} list-disc list-inside mb-6 space-y-3 pl-6 mx-auto break-words`} {...props} />,
          ol: ({node, ...props}) => <ol className={`${maxWidthClass} list-decimal list-inside mb-6 space-y-3 pl-6 mx-auto break-words`} {...props} />,
          li: ({node, ...props}) => <li className={`pl-2 text-[#161118] dark:text-[#f5f7f8] leading-relaxed text-lg break-words`} {...props} />,
          blockquote: ({node, ...props}) => <blockquote className={`border-l-4 border-primary pl-6 py-2 my-6 italic bg-primary/5 dark:bg-primary/10 p-5 rounded-r-lg text-[#161118] dark:text-[#f5f7f8] max-w-[60ch] mx-auto break-words`} {...props} />,
          code: ({node, ...props}) => <code className={`mobile-code bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/90 px-2.5 py-1 rounded text-base font-mono break-words overflow-x-auto`} {...props} />,
          pre: ({node, ...props}) => <pre className={`bg-[#1a1a2e] p-5 rounded-lg overflow-x-auto my-6 text-base max-w-full break-words`} {...props} />,
          a: ({node, ...props}) => <a className={`text-primary hover:underline font-medium break-words`} {...props} />,
          strong: ({node, ...props}) => <strong className={`font-bold text-[#161118] dark:text-[#f5f7f8] break-words`} {...props} />,
          em: ({node, ...props}) => <em className={`italic break-words`} {...props} />,
          hr: ({node, ...props}) => <hr className={`${maxWidthClass} my-8 border-t border-primary/20 mx-auto break-words`} {...props} />,
          table: ({node, ...props}) => <table className={`min-w-full border-collapse my-6 ${maxWidthClass} mx-auto break-words overflow-x-auto`} {...props} />,
          thead: ({node, ...props}) => <thead className={`bg-primary/10 dark:bg-primary/20 break-words`} {...props} />,
          tbody: ({node, ...props}) => <tbody {...props} />,
          tr: ({node, ...props}) => <tr className={`border-b border-primary/10 break-words`} {...props} />,
          th: ({node, ...props}) => <th className={`px-4 py-2 text-left font-semibold text-[#161118] dark:text-[#f5f7f8] border border-primary/20 break-words`} {...props} />,
          td: ({node, ...props}) => <td className={`px-4 py-3 text-[#161118] dark:text-[#f5f7f8] border border-primary/20 break-words`} {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default ContentRenderer;