// page.tsx
// This is the main user profile page
"use client";

import React from 'react';
import UserProfile from './UserProfile';

const ProfilePage = () => {
  return (
    <div className="group/design-root relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Top navigation bar */}

      
      {/* Main content area with sidebar and main content */}
      <div className="flex flex-1">
     
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto">
          {/* User profile content */}
          <UserProfile />
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;