"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import UserProfile from './UserProfile';
import { supabase } from '@/app/lib/supabaseClient';
import useUserProfile from '@/app/hooks/useUserProfile'; // Import the custom hook
import { usePathname } from 'next/navigation';

interface NavItem {
  icon: string;
  label: string;
  href: string;
}

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { userProfile, loading } = useUserProfile(); // Use the custom hook
  const pathname = usePathname(); // Get current pathname

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // The useUserProfile hook will automatically update the profile state
  };

  const navItems: NavItem[] = [
    { icon: 'home', label: 'Home', href: '/' },
    { icon: 'deployed_code', label: 'Projects', href: '/projects' },
    { icon: 'settings', label: 'Tool & tech', href: '/gear' },
    { icon: 'group', label: 'Community', href: '/community' },
    { icon: 'article', label: 'News', href: '/news' },
  ];

  return (
    <aside className={`sticky top-[61px] hidden h-[calc(100vh-61px)] flex-col justify-between border-r border-primary/20 bg-background-light p-4 dark:bg-background-dark lg:flex transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-72'}`}>
      <div className="flex flex-col gap-4">
        {/* Pass the userProfile data to the UserProfile component */}
        <UserProfile isCollapsed={isCollapsed} userProfile={userProfile} onLogout={handleLogout} />
        <nav className="flex flex-col gap-1">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={index}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                  isActive 
                    ? 'bg-primary/20 text-primary font-bold' 
                    : 'text-black/80'
                } transition-colors hover:bg-primary/5 dark:text-white/80 dark:hover:bg-primary/10`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {!isCollapsed && <p className="text-sm font-medium">{item.label}</p>}
              </Link>
            );
          })}
        </nav>
      </div>

    </aside>
  );
};

export default Navbar;