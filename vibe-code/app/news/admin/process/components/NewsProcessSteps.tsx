// components/NewsProcessSteps.tsx
import React from 'react';

const NewsProcessSteps: React.FC = () => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-[#161118] dark:text-[#f5f7f8] mb-2">How it works:</h3>
      <ol className="list-decimal pl-6 space-y-2 text-[#7c608a] dark:text-[#c5b3d1]">
        <li>Fetch latest articles from configured RSS feeds</li>
        <li>Use AI (Google AI) to generate summaries and commentary</li>
        <li>Save articles as drafts for admin review</li>
        <li>Admins can edit, approve, or reject articles before publication</li>
      </ol>
    </div>
  );
};

export default NewsProcessSteps;