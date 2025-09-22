// UserProfile.tsx
// This component displays the user profile section in the navbar
"use client";

import React from 'react';
import Link from 'next/link';

interface UserProfileProps {
  isCollapsed: boolean;
  userProfile: {
    id: string;
    username: string;
    avatar_url: string;
  } | null;
  onLogout: () => void;
}

const UserProfile = ({ isCollapsed, userProfile, onLogout }: UserProfileProps) => {
  // When user is not logged in, show login option
  if (!userProfile) {
    return (
      <div className={`flex items-center gap-3 rounded-lg px-3 py-2 text-black/80 transition-colors hover:bg-primary/5 dark:text-white/80 dark:hover:bg-primary/10 ${isCollapsed ? 'justify-center' : ''}`}>
        <Link href="/login" className="flex items-center gap-3">
          <span className="material-symbols-outlined">login</span>
          {!isCollapsed && <p className="text-sm font-medium">Login</p>}
        </Link>
      </div>
    );
  }

  // When user is logged in, show profile information
  return (
    <div className={`flex items-center gap-3 rounded-lg px-3 py-2 text-black/80 transition-colors hover:bg-primary/5 dark:text-white/80 dark:hover:bg-primary/10 ${isCollapsed ? 'justify-center' : ''}`}>
      <Link href="/profile" className="flex items-center gap-3">
        <div className="relative">
          {userProfile.avatar_url ? (
            <img 
              src={userProfile.avatar_url} 
              alt={userProfile.username} 
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <span className="material-symbols-outlined text-primary">account_circle</span>
          )}
        </div>
        {!isCollapsed && (
          <div className="flex flex-col">
            <p className="text-sm font-medium">{userProfile.username || 'User'}</p>
          </div>
        )}
      </Link>
      {!isCollapsed && (
        <div className="ml-auto">
          <button onClick={onLogout} className="material-symbols-outlined text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;