// UserProfile.tsx
// This component displays the user's profile information
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/app/lib/supabaseClient';

interface UserProfileData {
  id: string;
  user_id: string;
  username: string;
  display_name: string;
  avatar_url: string;
  bio: string;
  github_url: string;
  linkedin_url: string;
  website_url: string;
  created_at: string;
}

const UserProfile = () => {
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    projectsCount: 0,
    commentsCount: 0,
    vibeChecksCount: 0
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get the current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          throw new Error('No user session found');
        }

        // Fetch user profile using the correct foreign key 'user_id'
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('id, user_id, username, display_name, avatar_url, bio, github_url, linkedin_url, website_url, created_at')
          .eq('user_id', session.user.id)
          .single();

        if (profileError) throw profileError;

        setUserData(profileData);

        // Fetch user stats
        await fetchUserStats(session.user.id);
      } catch (error: any) {
        console.error('Error fetching user profile:', error);
        setError(error.message || 'Failed to load profile data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    const fetchUserStats = async (userId: string) => {
      try {
        // Fetch projects count
        const { count: projectsCount, error: projectsError } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId);

        if (projectsError) throw projectsError;

        // Fetch comments count
        const { count: commentsCount, error: commentsError } = await supabase
          .from('comments')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId);

        if (commentsError) throw commentsError;

        // Fetch vibe checks count (count of vibe checks on user's projects)
        // First, get the user's project IDs
        const { data: userProjects, error: userProjectsError } = await supabase
          .from('projects')
          .select('id')
          .eq('user_id', userId);

        if (userProjectsError) throw userProjectsError;

        const projectIds = userProjects.map(project => project.id);

        // Then count vibe checks on those projects
        let vibeChecksCount = 0;
        if (projectIds.length > 0) {
          const { count, error: vibeChecksError } = await supabase
            .from('vibe_checks')
            .select('*', { count: 'exact', head: true })
            .eq('target_type', 'project')
            .in('target_id', projectIds);

          if (vibeChecksError) throw vibeChecksError;
          vibeChecksCount = count || 0;
        }

        setStats({
          projectsCount: projectsCount || 0,
          commentsCount: commentsCount || 0,
          vibeChecksCount: vibeChecksCount
        });

        setStats({
          projectsCount: projectsCount || 0,
          commentsCount: commentsCount || 0,
          vibeChecksCount: vibeChecksCount || 0
        });
      } catch (error: any) {
        console.error('Error fetching user stats:', error);
        // We don't set error here as we still want to show the profile even if stats fail
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="px-4 py-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="px-4 py-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">User profile not found.</span>
          </div>
        </div>
      </div>
    );
  }

  // Format join date
  const joinDate = new Date(userData.created_at);
  const formattedJoinDate = `Joined ${joinDate.toLocaleString('default', { month: 'long' })} ${joinDate.getFullYear()}`;

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
                  style={{ backgroundImage: `url("${userData.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9hObyn2gW7Bz7eMWI1H9ewEyue6S8iS83-Fzb5ePmp41f4i6tgyX-J1nO9Hl5zh3ta8XzBM4UbJ4523HCiuSyJ96y2PpwuXLnibaJmReZwqKenYrxdmMfnh5ZNsMU5ouTIJCsKOqfxWaMhsJHSb3MRGLuMjv_w11vz0poV4y6uKDZlfqSotWLrIr1z0Ru-Rty1XEIlPO180irzteXkV_cejqXBcxCYn77nMLMjN347eQ1REZ70u9-wJ7CfXKBCQYIcyT9bXuUTQ'}")` }}
                ></div>
                
                {/* Display name */}
                <h2 className="text-[#161118] dark:text-[#f5f7f8] text-[22px] font-bold leading-tight tracking-[-0.015em] mb-1">
                  {userData.display_name}
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
                  {formattedJoinDate}
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
                <Link href="/projects/drafts" className="bg-[#f5f7f8] dark:bg-[#0f0f1a] rounded-lg p-4 text-center hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors">
                  <p className="text-[#161118] dark:text-[#f5f7f8] text-[24px] font-bold">{stats.projectsCount}</p>
                  <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm">Projects</p>
                </Link>
                
                <div className="bg-[#f5f7f8] dark:bg-[#0f0f1a] rounded-lg p-4 text-center">
                  <p className="text-[#161118] dark:text-[#f5f7f8] text-[24px] font-bold">{stats.commentsCount}</p>
                  <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm">Comments</p>
                </div>
                
                <div className="bg-[#f5f7f8] dark:bg-[#0f0f1a] rounded-lg p-4 text-center">
                  <p className="text-[#161118] dark:text-[#f5f7f8] text-[24px] font-bold">{stats.vibeChecksCount}</p>
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
                {userData.github_url && (
                  <a 
                    href={userData.github_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-[#f5f7f8] dark:bg-[#0f0f1a] rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                  >
                    <span className="material-symbols-outlined text-primary">code</span>
                    <span className="text-[#161118] dark:text-[#f5f7f8]">GitHub</span>
                  </a>
                )}
                
                {userData.linkedin_url && (
                  <a 
                    href={userData.linkedin_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-[#f5f7f8] dark:bg-[#0f0f1a] rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                  >
                    <span className="material-symbols-outlined text-primary">work</span>
                    <span className="text-[#161118] dark:text-[#f5f7f8]">LinkedIn</span>
                  </a>
                )}
                
                {userData.website_url && (
                  <a 
                    href={userData.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-[#f5f7f8] dark:bg-[#0f0f1a] rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                  >
                    <span className="material-symbols-outlined text-primary">link</span>
                    <span className="text-[#161118] dark:text-[#f5f7f8]">Personal Website</span>
                  </a>
                )}
                
                {/* Show message if no links are available */}
                {!userData.github_url && !userData.linkedin_url && !userData.website_url && (
                  <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm text-center py-4">
                    No social links added yet. Add some in your profile settings!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;