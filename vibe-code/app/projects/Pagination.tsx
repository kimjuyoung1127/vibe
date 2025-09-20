// Pagination.tsx
// This component provides pagination controls for navigating between project pages
"use client";

import React from 'react';

const Pagination = () => {
  return (
    <div className="mt-12 flex justify-center items-center gap-2">
      {/* Previous page button */}
      <a className="flex size-10 items-center justify-center rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors" href="#">
        <span className="material-symbols-outlined">chevron_left</span>
      </a>
      
      {/* Page numbers */}
      <a className="flex size-10 items-center justify-center rounded-full bg-primary text-white font-bold" href="#">1</a>
      <a className="flex size-10 items-center justify-center rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors font-medium" href="#">2</a>
      <a className="flex size-10 items-center justify-center rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors font-medium" href="#">3</a>
      <span className="text-xl">...</span>
      <a className="flex size-10 items-center justify-center rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors font-medium" href="#">10</a>
      
      {/* Next page button */}
      <a className="flex size-10 items-center justify-center rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors" href="#">
        <span className="material-symbols-outlined">chevron_right</span>
      </a>
    </div>
  );
};

export default Pagination;