// Header.tsx
// This component displays the header section of the tool/tech review detail
"use client";

import React from 'react';

interface HeaderProps {
  title: string;
  category: string;
}

const Header: React.FC<HeaderProps> = ({ title, category }) => {
  return (
    <div className="px-4 pb-6">
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-[#161118] dark:text-[#f5f7f8] tracking-light text-[32px] font-bold leading-tight">
            {title}
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 dark:bg-primary/20 rounded-full">
              {category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;