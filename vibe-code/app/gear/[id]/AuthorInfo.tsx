// AuthorInfo.tsx
// This component displays the author information and metadata
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/app/lib/supabaseClient';
import VibeCheckButton from '@/app/components/VibeCheckButton';
import DropdownMenu from '@/app/components/DropdownMenu';
import { AuthorProfileData, AuthorInfoProps } from '@/app/types/gear';

const AuthorInfo: React.FC<AuthorInfoProps> = ({ 
  author, 
  authorRole, 
  publishDate, 
  lastUpdated, 
  readTime, 
  authorImageUrl,
  initialLikes,
  onLike,
  isLiked,
  reviewId,
  authorId,
  contentType,
  onReportClick
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [authorProfile, setAuthorProfile] = useState<AuthorProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthorProfile = async () => {
      if (!authorId) {
        setLoading(false);
        return; // If no authorId is provided, we'll just show the basic info
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch user profile using the authorId
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('id, user_id, username, display_name, avatar_url, bio, github_url, linkedin_url, website_url, created_at')
          .eq('user_id', authorId)
          .single();

        if (profileError) throw profileError;

        setAuthorProfile(profileData);
      } catch (error: any) {
        console.error('Error fetching author profile:', error);
        setError(error.message || 'Failed to load author profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorProfile();
  }, [authorId]);

  const handleLikeClick = () => {
    onLike();
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  // Use the profile data if available, otherwise fallback to the original props
  const displayAuthor = authorProfile ? authorProfile.display_name : author;
  const displayAvatarUrl = authorProfile ? authorProfile.avatar_url : authorImageUrl;

  if (loading) {
    return (
      <div className="flex px-4 pb-6 @container">
        <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
          <div className="flex gap-4">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            <div className="flex flex-col justify-center">
              <div className="h-4 bg-primary/20 rounded w-32 mb-2"></div>
              <div className="h-3 bg-primary/10 rounded w-48"></div>
              <div className="h-3 bg-primary/10 rounded w-32 mt-1"></div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-24 bg-primary/20 rounded"></div>
            <div className="h-10 w-20 bg-primary/10 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex px-4 pb-6 @container">
      <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
        <div className="flex gap-4">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-16 w-16"
            style={{ backgroundImage: `url("${displayAvatarUrl || authorImageUrl}")` }}
          ></div>
          <div className="flex flex-col justify-center">
            <Link 
              href={`/profile/${authorProfile?.username || ''}`} 
              className="text-[#161118] dark:text-[#f5f7f8] text-[18px] font-bold leading-tight tracking-[-0.015em] hover:text-primary transition-colors"
            >
              {displayAuthor || author}
            </Link>
            <p className="text-[#7c608a] dark:text-[#c5b3d1] text-base font-normal leading-normal">
              {authorRole} · {publishDate} · {readTime}
            </p>
            <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm font-normal leading-normal">
              Last updated {lastUpdated}
            </p>
            {authorProfile?.bio && (
              <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm font-normal leading-normal mt-1 line-clamp-2 max-w-md">
                {authorProfile.bio}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <VibeCheckButton 
            targetId={reviewId || ''}
            targetType="review"
            initialCount={initialLikes}
          />
          {onReportClick && contentType && (
            <div className="ml-2">
              <DropdownMenu targetId={reviewId || ''} contentType={contentType}>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-[#161118] dark:text-[#f5f7f8] hover:bg-primary/10 dark:hover:bg-primary/20"
                  onClick={(e) => {
                    e.preventDefault();
                    onReportClick();
                  }}
                >
                  Report
                </button>
              </DropdownMenu>
            </div>
          )}
          <button className="flex items-center gap-1 px-3 py-1 text-[#7c608a] dark:text-[#c5b3d1] hover:text-[#161118] dark:hover:text-[#f5f7f8] rounded-full hover:bg-primary/10 dark:hover:bg-primary/20">
            <span className="material-symbols-outlined">share</span>
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorInfo;