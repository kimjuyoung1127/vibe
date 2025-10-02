import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the actual TopNav component with no SSR to avoid server-side issues
const DynamicTopNav = dynamic(() => import('./topnav'), {
  ssr: false,
  loading: () => (
    <header className="sticky top-0 z-20 flex items-center justify-between whitespace-nowrap border-b border-primary/20 bg-background-light/80 px-4 py-3 backdrop-blur-sm dark:bg-background-dark/80 md:px-10">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3 text-primary">
          <img 
            src="/images/200.svg" 
            alt="Vibe Hub Logo"
            className="h-6 w-6 object-contain"
            width={24}
            height={24}
          />
          <h2 className="text-lg font-bold tracking-tighter text-black dark:text-white">Vibe Hub</h2>
        </div>
      </div>
    </header>
  )
});

// This wrapper allows us to use the client-side TopNav without breaking server rendering
const TopNavWrapper = () => {
  return <DynamicTopNav />;
};

export default TopNavWrapper;