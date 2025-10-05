"use client";

import React from 'react';
import Link from 'next/link';
import UserProfile from './UserProfile';
import { supabase } from '@/app/lib/supabaseClient';
import useUserProfile from '@/app/hooks/useUserProfile';
import { usePathname } from 'next/navigation';

// 부모로부터 받을 props 타입을 정의합니다.
interface NavbarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

interface NavItem {
  icon: string;
  label: string;
  href: string;
}

const Navbar = ({ isCollapsed, toggleSidebar }: NavbarProps) => {
  const { userProfile, loading } = useUserProfile();
  const pathname = usePathname();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const navItems: NavItem[] = [
    { icon: 'home', label: 'Home', href: '/' },
    { icon: 'deployed_code', label: 'Projects', href: '/projects' },
    { icon: 'settings', label: 'Tool & tech', href: '/gear' },
    { icon: 'group', label: 'Community', href: '/community' },
    { icon: 'article', label: 'News', href: '/news' },
  ];

  return (
    <aside className={`relative sticky top-[61px] hidden h-[calc(100vh-61px)] flex-col justify-between border-r border-primary/20 bg-background-light p-4 dark:bg-background-dark lg:flex transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-72'}`}>
      <div className="flex flex-col gap-4">
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

      <button
        onClick={toggleSidebar} // props로 받은 함수를 사용합니다.
        className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-primary/20 bg-background-light transition-all hover:bg-primary/5 dark:bg-background-dark dark:hover:bg-primary/10"
      >
        <span className="material-symbols-outlined text-base">
          {isCollapsed ? 'chevron_right' : 'chevron_left'}
        </span>
      </button>

    </aside>
  );
};

export default Navbar;
