"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import useUserProfile from '@/app/hooks/useUserProfile'; // Import the custom hook
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/app/lib/supabaseClient';

const TopNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userProfile, loading } = useUserProfile(); // Use the custom hook
  const pathname = usePathname(); // Get current pathname

  // Use a default avatar if the user profile is not loaded or doesn't have an avatar
  const avatarUrl = userProfile?.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmICaw4c5yHQp4leTP4ZcaNpvRBBudLVQZ8NpVTRxsS8ciopC1keUhBZLfSS2T62kY0Vh6aDfIo7QG_LgjXkfwU7eqIhEYJO--GumrXfMm2B5_P19r9FDzmHVDEjN12ssdkTBfTVaEfV0eQ1UyFP_FoR_gygkx-ZE7T--PI8xyHt7_0uCkb7wIr8TQXARi_iLOepqkTIgq-PDHQgBFfllMZm8PyI8v6XhNZCQSHYombXZoC5FxmeSUm2zp4VzK4Z4tGVKGdFHFQg';

  // Function to handle profile navigation with authentication check
  const handleProfileNavigation = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      // User is authenticated, navigate to profile
      window.location.href = '/profile';
    } else {
      // User is not authenticated, navigate to login
      window.location.href = '/login';
    }
  };

  return (
    <>
      <header className="sticky top-0 z-20 flex items-center justify-between whitespace-nowrap border-b border-primary/20 bg-background-light/80 px-4 py-3 backdrop-blur-sm dark:bg-background-dark/80 md:px-10 overflow-visible">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 text-primary">
            <img 
              src="/images/200.svg" 
              alt="Vibe Hub Logo"
              className="h-6 w-6 object-contain"
              width={24}
              height={24}
            />
            <h2 className="text-lg font-bold tracking-tighter text-black dark:text-white">Vibe Hub</h2>
          </Link>
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
        
          <a 
            onClick={handleProfileNavigation}
            className="flex h-10 w-10 rounded-full bg-cover bg-center z-10 border border-primary/20 bg-primary/10 items-center justify-center overflow-hidden cursor-pointer"
            style={{ backgroundImage: `url("${avatarUrl}")` }}
          >
            {userProfile?.avatar_url ? null : <span className="material-symbols-outlined text-primary">account_circle</span>}
            <span className="sr-only">Profile</span>
          </a>
          
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
              <Link href="/" className="flex items-center gap-3 text-primary">
                <img 
                  src="/images/200.svg" 
                  alt="Vibe Hub Logo"
                  className="h-6 w-6 object-contain"
                  width={24}
                  height={24}
                />
                <h2 className="text-lg font-bold tracking-tighter text-black dark:text-white">Vibe Hub</h2>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {['/', '/projects', '/gear', '/community', '/news'].map((path) => {
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
              <a 
                onClick={handleProfileNavigation}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                  pathname === '/profile' 
                    ? 'bg-primary/20 text-primary font-bold' 
                    : 'text-black/80'
                } transition-colors hover:bg-primary/5 dark:text-white/80 dark:hover:bg-primary/10 cursor-pointer`}
              >
                <span className="material-symbols-outlined">account_circle</span>
                <span>Profile</span>
              </a>
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