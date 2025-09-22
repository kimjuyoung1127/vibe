"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import UserProfile from './UserProfile';
import { supabase } from '@/app/lib/supabaseClient';

interface NavItem {
  icon: string;
  label: string;
  href: string;
}

interface UserProfileData {
  id: string;
  username: string;
  avatar_url: string;
}

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);

  useEffect(() => {
    // Check active session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Navbar session check:', session); // 디버깅용 로그
      setUser(session?.user || null);
      
      if (session?.user) {
        // Fetch user profile
        const { data, error } = await supabase
          .from('user_profiles')
          .select('id, username, avatar_url')
          .eq('id', session.user.id)
          .single();
          
        if (!error && data) {
          console.log('Navbar user profile fetched:', data); // 디버깅용 로그
          setUserProfile(data);
        } else {
          console.log('Navbar user profile fetch error:', error); // 디버깅용 로그
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }
    };
    
    checkSession();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Navbar auth state changed:', _event, session); // 디버깅용 로그
      setUser(session?.user || null);
      
      if (session?.user) {
        // Fetch user profile
        supabase
          .from('user_profiles')
          .select('id, username, avatar_url')
          .eq('id', session.user.id)
          .single()
          .then(({ data, error }) => {
            if (!error && data) {
              console.log('Navbar user profile updated:', data); // 디버깅용 로그
              setUserProfile(data);
            } else {
              console.log('Navbar user profile update error:', error); // 디버깅용 로그
              setUserProfile(null);
            }
          });
      } else {
        setUserProfile(null);
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserProfile(null);
  };

  const navItems: NavItem[] = [
    { icon: '', label: 'Home', href: '/' },
    { icon: '', label: 'Projects', href: '/projects' },
    { icon: ' ', label: 'Tool & tech', href: '/gear' },
    { icon: '', label: 'Community', href: '/community' },
    { icon: '', label: 'News', href: '/news' },
  ];

  return (
    <aside className={`sticky top-[61px] hidden h-[calc(100vh-61px)] flex-col justify-between border-r border-primary/20 bg-background-light p-4 dark:bg-background-dark lg:flex transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-72'}`}>
      <div className="flex flex-col gap-4">
        <UserProfile isCollapsed={isCollapsed} userProfile={userProfile} onLogout={handleLogout} />
        <nav className="flex flex-col gap-1">
          {navItems.map((item, index) => (
            <Link 
              key={index}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-black/80 transition-colors hover:bg-primary/5 dark:text-white/80 dark:hover:bg-primary/10 ${index === 0 ? 'bg-primary/10 text-primary dark:bg-primary/20' : ''}`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {!isCollapsed && <p className="text-sm font-medium">{item.label}</p>}
            </Link>
          ))}
        </nav>
      </div>

    </aside>
  );
};

export default Navbar;