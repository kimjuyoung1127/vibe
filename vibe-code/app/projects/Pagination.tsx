// Pagination.tsx
// This component provides pagination controls for navigating between project pages
"use client";

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Maximum number of page links to show

    if (totalPages <= maxVisiblePages) {
      // If total pages is less than or equal to max visible pages, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Otherwise, show a selection of pages with ellipses
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      // Always show first page
      if (startPage > 1) {
        pages.push(1);
      }

      // Show ellipsis if there's a gap
      if (startPage > 2) {
        pages.push(-1); // -1 represents ellipsis
      }

      // Show current range of pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Show ellipsis if there's a gap
      if (endPage < totalPages - 1) {
        pages.push(-1); // -1 represents ellipsis
      }

      // Always show last page
      if (endPage < totalPages) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
      
      // Update URL with page parameter
      const params = new URLSearchParams(searchParams.toString());
      if (page === 1) {
        params.delete('page');
      } else {
        params.set('page', page.toString());
      }
      
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="mt-12 flex justify-center items-center gap-2">
      {/* Previous page button */}
      <button
        onClick={handlePrevPage}
        disabled={currentPage <= 1}
        className={`flex size-10 items-center justify-center rounded-full transition-colors ${
          currentPage <= 1 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:bg-primary/10 dark:hover:bg-primary/20'
        }`}
        aria-label="Previous page"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      
      {/* Page numbers */}
      {getPageNumbers().map((page, index) => 
        page === -1 ? ( // Ellipsis
          <span key={`ellipsis-${index}`} className="text-xl mx-1">...</span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`flex size-10 items-center justify-center rounded-full font-medium transition-colors ${
              currentPage === page
                ? 'bg-primary text-white font-bold'
                : 'hover:bg-primary/10 dark:hover:bg-primary/20'
            }`}
            aria-label={`Go to page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        )
      )}
      
      {/* Next page button */}
      <button
        onClick={handleNextPage}
        disabled={currentPage >= totalPages}
        className={`flex size-10 items-center justify-center rounded-full transition-colors ${
          currentPage >= totalPages 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:bg-primary/10 dark:hover:bg-primary/20'
        }`}
        aria-label="Next page"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  );
};

export default Pagination;