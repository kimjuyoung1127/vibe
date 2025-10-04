"use client";

import { ReactNode } from 'react';
import TopNavWrapper from '@/app/components/TopNavWrapper';
import NavbarWrapper from '@/app/components/NavbarWrapper';

interface NewsAdminLayoutProps {
  children: ReactNode;
}

const NewsAdminLayout = ({ children }: NewsAdminLayoutProps) => {
  return (
    <div className="group/design-root relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Top navigation bar */}
      <TopNavWrapper />
      
      {/* Main content area with sidebar and main content */}
      <div className="flex flex-1">
        {/* Left sidebar navigation */}
        <NavbarWrapper />
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default NewsAdminLayout;