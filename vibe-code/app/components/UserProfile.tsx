// UserProfile.tsx
// This component displays the user profile section in the sidebar
"use client";

import React from 'react';
import Link from 'next/link';

interface UserProfileProps {
  isCollapsed?: boolean;
}

const UserProfile = ({ isCollapsed = false }: UserProfileProps) => {
  return (
    <div className="flex items-center gap-3">
      <Link 
        href="/profile" 
        className="flex h-10 w-10 rounded-full bg-cover bg-center z-10 border border-primary/20 bg-primary/10 items-center justify-center"
        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCmICaw4c5yHQp4leTP4ZcaNpvRBBudLVQZ8NpVTRxsS8ciopC1keUhBZLfSS2T62kY0Vh6aDfIo7QG_LgjXkfwU7eqIhEYJO--GumrXfMm2B5_P19r9FDzmHVDEjN12ssdkTBfTVaEfV0eQ1UyFP_FoR_gygkx-ZE7T--PI8xyHt7_0uCkb7wIr8TQXARi_iLOepqkTIgq-PDHQgBFfllMZm8PyI8v6XhNZCQSHYombXZoC5FxmeSUm2zp4VzK4Z4tGVKGdFHFQg")' }}
      >
        <span className="material-symbols-outlined text-primary">account_circle</span>
        <span className="sr-only">Profile</span>
      </Link>
      {!isCollapsed && (
        <div className="flex flex-col">
          <h1 className="text-base font-bold text-black dark:text-white">Sophia Carter</h1>
          <p className="text-sm text-black/60 dark:text-white/60">@sophia_carter</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;