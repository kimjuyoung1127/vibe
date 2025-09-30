// AuthorProfile.tsx
// This component displays the public profile information of a project author
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/app/lib/supabaseClient';
import { AuthorProfileData } from '@/app/types/project';

const AuthorProfile = ({ userId }: { userId: string }) => {
  const [authorData, setAuthorData] = useState<AuthorProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthorProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user profile using the user_id
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('id, user_id, username, display_name, avatar_url, bio, github_url, linkedin_url, website_url, created_at')
          .eq('user_id', userId)
          .single();

        if (profileError) throw profileError;

        setAuthorData(profileData);
      } catch (error: any) {
        console.error('Error fetching author profile:', error);
        setError(error.message || 'Failed to load author profile data.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchAuthorProfile();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (!authorData) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">Author profile not found.</span>
      </div>
    );
  }

  // Format join date
  const joinDate = new Date(authorData.created_at);
  const formattedJoinDate = `Joined ${joinDate.toLocaleString('default', { month: 'long' })} ${joinDate.getFullYear()}`;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Left column - Avatar and basic info */}
      <div className="md:w-1/3">
        <div className="bg-background-light dark:bg-background-dark rounded-xl border border-primary/20 p-6">
          <div className="flex flex-col items-center">
            {/* Avatar - Clickable to go to user's profile */}
            <Link href={`/profile/${authorData.user_id}`}>
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 mb-4 cursor-pointer hover:opacity-90 transition-opacity"
                style={{ backgroundImage: `url("${authorData.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9hObyn2gW7Bz7eMWI1H9ewEyue6S8iS83-Fzb5ePmp41f4i6tgyX-J1nO9Hl5zh3ta8XzBM4UbJ4523HCiuSyJ96y2PpwuXLnibaJmReZwqKenYrxdmMfnh5ZNsMU5ouTIJCsKOqfxWaMhsJHSb3MRGLuMjv_w11vz0poV4y6uKDZlfqSotWLrIr1z0Ru-Rty1XEIlPO180irzteXkV_cejqXBcxCYn77nMLMjN347eQ1REZ70u9-wJ7CfXKBCQYIcyT9bXuUTQ'}")` }}
              ></div>
            </Link>
            
            {/* Display name */}
            <h2 className="text-[#161118] dark:text-[#f5f7f8] text-[22px] font-bold leading-tight tracking-[-0.015em] mb-1">
              {authorData.display_name}
            </h2>
            
            {/* Username */}
            <p className="text-[#7c608a] dark:text-[#c5b3d1] text-base font-normal leading-normal mb-4">
              @{authorData.username}
            </p>
            
            {/* Bio */}
            <p className="text-[#161118] dark:text-[#f5f7f8] text-center text-sm font-normal leading-normal mb-6">
              {authorData.bio}
            </p>
            
            {/* Join date */}
            <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm font-normal leading-normal mb-6">
              {formattedJoinDate}
            </p>
          </div>
        </div>
      </div>
      
      {/* Right column - Social links only */}
      <div className="md:w-2/3">
        {/* Social links */}
        <div className="bg-background-light dark:bg-background-dark rounded-xl border border-primary/20 p-6">
          <h3 className="text-[#161118] dark:text-[#f5f7f8] text-[18px] font-bold leading-tight tracking-[-0.015em] mb-4">
            Links
          </h3>
          
          <div className="space-y-3">
            {authorData.github_url && (
              <a 
                href={authorData.github_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-[#f5f7f8] dark:bg-[#0f0f1a] rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
              >
                <span className="material-symbols-outlined text-primary">code</span>
                <span className="text-[#161118] dark:text-[#f5f7f8]">GitHub</span>
              </a>
            )}
            
            {authorData.linkedin_url && (
              <a 
                href={authorData.linkedin_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-[#f5f7f8] dark:bg-[#0f0f1a] rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
              >
                <span className="material-symbols-outlined text-primary">work</span>
                <span className="text-[#161118] dark:text-[#f5f7f8]">LinkedIn</span>
              </a>
            )}
            
            {authorData.website_url && (
              <a 
                href={authorData.website_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-[#f5f7f8] dark:bg-[#0f0f1a] rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
              >
                <span className="material-symbols-outlined text-primary">link</span>
                <span className="text-[#161118] dark:text-[#f5f7f8]">Personal Website</span>
              </a>
            )}
            
            {/* Show message if no links are available */}
            {!authorData.github_url && !authorData.linkedin_url && !authorData.website_url && (
              <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm text-center py-4">
                No social links added yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;