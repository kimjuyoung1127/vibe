"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import useUserProfile from '@/app/hooks/useUserProfile'; // Import the custom hook
import { usePathname } from 'next/navigation';

const TopNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userProfile, loading } = useUserProfile(); // Use the custom hook
  const pathname = usePathname(); // Get current pathname

  // Use a default avatar if the user profile is not loaded or doesn't have an avatar
  const avatarUrl = userProfile?.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmICaw4c5yHQp4leTP4ZcaNpvRBBudLVQZ8NpVTRxsS8ciopC1keUhBZLfSS2T62kY0Vh6aDfIo7QG_LgjXkfwU7eqIhEYJO--GumrXfMm2B5_P19r9FDzmHVDEjN12ssdkTBfTVaEfV0eQ1UyFP_FoR_gygkx-ZE7T--PI8xyHt7_0uCkb7wIr8TQXARi_iLOepqkTIgq-PDHQgBFfllMZm8PyI8v6XhNZCQSHYombXZoC5FxmeSUm2zp4VzK4Z4tGVKGdFHFQg';

  return (
    <>
      <header className="sticky top-0 z-20 flex items-center justify-between whitespace-nowrap border-b border-primary/20 bg-background-light/80 px-4 py-3 backdrop-blur-sm dark:bg-background-dark/80 md:px-10 overflow-visible">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-primary">
            <svg className="h-6 w-6" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 16.5c-3 0-5.5-1-5.5-6 0-5 2.5-6 5.5-6 3 0 5.5 1 5.5 6 0 4-2 6-5.5 6.5z"></path>
              <path d="M15 16.5c4 0 6.5-1.5 6.5-6"></path>
              <path d="M2.5 22c5 0 8.5-1.5 8.5-6 0-4.5-3.5-6-8.5-6-5 0-8.5 1.5-8.5 6 0 4.5 3.5 6 8.5 6z"></path>
              <path d="M2.5 11c-3.5 0-6.5-1.5-6.5-6"></path>
            </svg>
            <h2 className="text-lg font-bold tracking-tighter text-black dark:text-white">Vibe Hub</h2>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
            {['/', '/projects', '/gear', '/community', '/news'].map((path) => {
              const label = path === '/' ? 'Home' : 
                          path === '/projects' ? 'Projects' : 
                          path === '/gear' ? 'Tool & Tech' : 
                          path === '/community' ? 'Community' : 'News';
              const isActive = pathname === path;
              return (
                <Link 
                  key={path} 
                  className={`${isActive 
                    ? 'text-primary font-bold' 
                    : 'text-black/60'} transition-colors hover:text-black dark:text-white/60 dark:hover:text-white`}
                  href={path}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center justify-end gap-4">
          <div className="hidden sm:block">
            <SearchBar />
          </div>
        
          <Link 
            href="/profile" 
            className="flex h-10 w-10 rounded-full bg-cover bg-center z-10 border border-primary/20 bg-primary/10 items-center justify-center"
            style={{ backgroundImage: `url("${avatarUrl}")` }}
          >
            <span className="material-symbols-outlined text-primary">account_circle</span>
            <span className="sr-only">Profile</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute left-0 top-0 h-full w-64 bg-background-light dark:bg-background-dark p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3 text-primary">
                <svg className="h-6 w-6" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 16.5c-3 0-5.5-1-5.5-6 0-5 2.5-6 5.5-6 3 0 5.5 1 5.5 6 0 4-2 6-5.5 6.5z"></path>
                  <path d="M15 16.5c4 0 6.5-1.5 6.5-6"></path>
                  <path d="M2.5 22c5 0 8.5-1.5 8.5-6 0-4.5-3.5-6-8.5-6-5 0-8.5 1.5-8.5 6 0 4.5 3.5 6 8.5 6z"></path>
                  <path d="M2.5 11c-3.5 0-6.5-1.5-6.5-6"></path>
                </svg>
                <h2 className="text-lg font-bold tracking-tighter text-black dark:text-white">Vibe Hub</h2>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {['/', '/projects', '/gear', '/community', '/news', '/profile'].map((path) => {
                const label = path === '/' ? 'Home' : 
                            path === '/projects' ? 'Projects' : 
                            path === '/gear' ? 'Tool & Tech' : 
                            path === '/community' ? 'Community' : 
                            path === '/news' ? 'News' : 'Profile';
                const icon = path === '/' ? 'home' : 
                           path === '/projects' ? 'deployed_code' : 
                           path === '/gear' ? 'settings' : 
                           path === '/community' ? 'group' : 
                           path === '/news' ? 'article' : 'account_circle';
                const isActive = pathname === path;
                return (
                  <Link 
                    key={path} 
                    href={path} 
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                      isActive 
                        ? 'bg-primary/20 text-primary font-bold' 
                        : 'text-black/80'
                    } transition-colors hover:bg-primary/5 dark:text-white/80 dark:hover:bg-primary/10`}
                  >
                    <span className="material-symbols-outlined">{icon}</span>
                    <span>{label}</span>
                  </Link>
                );
              })}
              <div className="pt-2">
                <SearchBar />
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNav;