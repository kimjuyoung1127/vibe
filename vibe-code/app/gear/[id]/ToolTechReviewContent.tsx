// ToolTechReviewContent.tsx
// This component displays the main content of the tool/tech review with proper formatting and styling
"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ToolTechReviewContentProps {
  content: string;
}

const ToolTechReviewContent: React.FC<ToolTechReviewContentProps> = ({ content }) => {
  return (
    <div className="px-4 pb-6 text-[#161118] dark:text-[#f5f7f8] max-w-none">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-10 mb-6 text-primary dark:text-primary/90 border-b border-primary/20 pb-2" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-5 text-primary dark:text-primary/90 border-b border-primary/10 pb-1.5" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-6 mb-4 text-[#161118] dark:text-[#f5f7f8]" {...props} />,
          p: ({node, ...props}) => <p className="mb-5 leading-relaxed text-base text-[#161118] dark:text-[#f5f7f8]" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc list-inside mb-5 space-y-3 pl-5" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-5 space-y-3 pl-5" {...props} />,
          li: ({node, ...props}) => <li className="pl-2 text-[#161118] dark:text-[#f5f7f8]" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 italic bg-primary/5 dark:bg-primary/10 p-5 rounded-r-lg text-[#161118] dark:text-[#f5f7f8]" {...props} />,
          code: ({node, ...props}) => <code className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/90 px-2.5 py-1 rounded text-sm font-mono" {...props} />,
          pre: ({node, ...props}) => <pre className="bg-[#1a1a2e] p-5 rounded-lg overflow-x-auto my-6 text-sm" {...props} />,
          a: ({node, ...props}) => <a className="text-primary hover:underline font-medium" {...props} />,
          strong: ({node, ...props}) => <strong className="font-bold text-[#161118] dark:text-[#f5f7f8]" {...props} />,
          em: ({node, ...props}) => <em className="italic" {...props} />,
          hr: ({node, ...props}) => <hr className="my-8 border-t border-primary/20" {...props} />,
          table: ({node, ...props}) => <table className="min-w-full border-collapse my-6" {...props} />,
          thead: ({node, ...props}) => <thead className="bg-primary/10 dark:bg-primary/20" {...props} />,
          tbody: ({node, ...props}) => <tbody {...props} />,
          tr: ({node, ...props}) => <tr className="border-b border-primary/10" {...props} />,
          th: ({node, ...props}) => <th className="px-4 py-2 text-left font-semibold text-[#161118] dark:text-[#f5f7f8]" {...props} />,
          td: ({node, ...props}) => <td className="px-4 py-3 text-[#161118] dark:text-[#f5f7f8]" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default ToolTechReviewContent;