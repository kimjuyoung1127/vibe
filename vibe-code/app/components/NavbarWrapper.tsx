import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the actual Navbar component with no SSR to avoid server-side issues
const DynamicNavbar = dynamic(() => import('./navbar'), {
  ssr: false,
  loading: () => (
    <aside className="sticky top-[61px] hidden h-[calc(100vh-61px)] flex-col justify-between border-r border-primary/20 bg-background-light p-4 dark:bg-background-dark lg:flex w-72">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-black/80 transition-colors hover:bg-primary/5 dark:text-white/80 dark:hover:bg-primary/10">
            <span className="material-symbols-outlined">home</span>
            <p className="text-sm font-medium">Home</p>
          </div>
        </div>
      </div>
    </aside>
  )
});

// This wrapper allows us to use the client-side Navbar without breaking server rendering
const NavbarWrapper = () => {
  return <DynamicNavbar />;
};

export default NavbarWrapper;