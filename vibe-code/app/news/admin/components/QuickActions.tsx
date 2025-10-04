// components/QuickActions.tsx
import { useRouter } from 'next/navigation';
import React from 'react';

const QuickActions: React.FC = () => {
  const router = useRouter();

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-[#161118] dark:text-[#f5f7f8]">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          onClick={() => router.push('/news/admin/process')}
          className="p-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl mb-2">autorenew</span>
          <p>Process New Articles</p>
        </button>
        <button 
          onClick={() => router.push('/news')}
          className="p-4 bg-[#af25f4] text-white rounded-lg hover:bg-[#af25f4]/90 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl mb-2">visibility</span>
          <p>View Published News</p>
        </button>
        <button 
          onClick={() => window.location.reload()}
          className="p-4 bg-[#7c608a] text-white rounded-lg hover:bg-[#7c608a]/90 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl mb-2">refresh</span>
          <p>Refresh Articles</p>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;