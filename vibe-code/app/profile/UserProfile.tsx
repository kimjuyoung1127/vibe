// UserProfile.tsx
// This component displays the user's profile information
"use client";

import React from 'react';
import Link from 'next/link';

const UserProfile = () => {
  // Sample user data
  const userData = {
    username: "sophia_carter",
    displayName: "Sophia Carter",
    bio: "Full-stack developer passionate about creating vibrant, retro-inspired web experiences. Love exploring the intersection of design and technology.",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9hObyn2gW7Bz7eMWI1H9ewEyue6S8iS83-Fzb5ePmp41f4i6tgyX-J1nO9Hl5zh3ta8XzBM4UbJ4523HCiuSyJ96y2PpwuXLnibaJmReZwqKenYrxdmMfnh5ZNsMU5ouTIJCsKOqfxWaMhsJHSb3MRGLuMjv_w11vz0poV4y6uKDZlfqSotWLrIr1z0Ru-Rty1XEIlPO180irzteXkV_cejqXBcxCYn77nMLMjN347eQ1REZ70u9-wJ7CfXKBCQYIcyT9bXuUTQ",
    joinDate: "Joined March 2023",
    githubUrl: "https://github.com/sophiacarter",
    linkedinUrl: "https://linkedin.com/in/sophiacarter",
    websiteUrl: "https://sophiacarter.dev",
    projectsCount: 12,
    commentsCount: 84,
    vibeChecksCount: 156
  };

  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      {/* Profile header */}
      <div className="px-4 py-6">
        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#161118] dark:text-[#f5f7f8] tracking-light text-[32px] font-bold leading-tight">
              User Profile
            </p>
          </div>
        </div>
      </div>
      
      {/* Profile content */}
      <div className="px-4 pb-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left column - Avatar and basic info */}
          <div className="md:w-1/3">
            <div className="bg-background-light dark:bg-background-dark rounded-xl border border-primary/20 p-6">
              <div className="flex flex-col items-center">
                {/* Avatar */}
                <div 
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 mb-4"
                  style={{ backgroundImage: `url("${userData.avatarUrl}")` }}
                ></div>
                
                {/* Display name */}
                <h2 className="text-[#161118] dark:text-[#f5f7f8] text-[22px] font-bold leading-tight tracking-[-0.015em] mb-1">
                  {userData.displayName}
                </h2>
                
                {/* Username */}
                <p className="text-[#7c608a] dark:text-[#c5b3d1] text-base font-normal leading-normal mb-4">
                  @{userData.username}
                </p>
                
                {/* Bio */}
                <p className="text-[#161118] dark:text-[#f5f7f8] text-center text-sm font-normal leading-normal mb-6">
                  {userData.bio}
                </p>
                
                {/* Join date */}
                <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm font-normal leading-normal mb-6">
                  {userData.joinDate}
                </p>
                
                {/* Edit profile button */}
                <Link 
                  href="/profile/edit" 
                  className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-center font-medium"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right column - Stats and links */}
          <div className="md:w-2/3">
            {/* Stats */}
            <div className="bg-background-light dark:bg-background-dark rounded-xl border border-primary/20 p-6 mb-6">
              <h3 className="text-[#161118] dark:text-[#f5f7f8] text-[18px] font-bold leading-tight tracking-[-0.015em] mb-4">
                Stats
              </h3>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#f5f7f8] dark:bg-[#0f0f1a] rounded-lg p-4 text-center">
                  <p className="text-[#161118] dark:text-[#f5f7f8] text-[24px] font-bold">{userData.projectsCount}</p>
                  <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm">Projects</p>
                </div>
                
                <div className="bg-[#f5f7f8] dark:bg-[#0f0f1a] rounded-lg p-4 text-center">
                  <p className="text-[#161118] dark:text-[#f5f7f8] text-[24px] font-bold">{userData.commentsCount}</p>
                  <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm">Comments</p>
                </div>
                
                <div className="bg-[#f5f7f8] dark:bg-[#0f0f1a] rounded-lg p-4 text-center">
                  <p className="text-[#161118] dark:text-[#f5f7f8] text-[24px] font-bold">{userData.vibeChecksCount}</p>
                  <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm">Vibe Checks</p>
                </div>
              </div>
            </div>
            
            {/* Social links */}
            <div className="bg-background-light dark:bg-background-dark rounded-xl border border-primary/20 p-6">
              <h3 className="text-[#161118] dark:text-[#f5f7f8] text-[18px] font-bold leading-tight tracking-[-0.015em] mb-4">
                Links
              </h3>
              
              <div className="space-y-3">
                <a 
                  href={userData.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-[#f5f7f8] dark:bg-[#0f0f1a] rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                >
                  <span className="material-symbols-outlined text-primary">code</span>
                  <span className="text-[#161118] dark:text-[#f5f7f8]">GitHub</span>
                </a>
                
                <a 
                  href={userData.linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-[#f5f7f8] dark:bg-[#0f0f1a] rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                >
                  <span className="material-symbols-outlined text-primary">work</span>
                  <span className="text-[#161118] dark:text-[#f5f7f8]">LinkedIn</span>
                </a>
                
                <a 
                  href={userData.websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-[#f5f7f8] dark:bg-[#0f0f1a] rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                >
                  <span className="material-symbols-outlined text-primary">link</span>
                  <span className="text-[#161118] dark:text-[#f5f7f8]">Personal Website</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;