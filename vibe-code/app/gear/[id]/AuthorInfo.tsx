// AuthorInfo.tsx
// This component displays the author information and metadata
"use client";

import React, { useState } from 'react';
import VibeCheckButton from '@/app/mainpage/VibeCheckButton';

interface AuthorInfoProps {
  author: string;
  authorRole: string;
  publishDate: string;
  lastUpdated: string;
  readTime: string;
  authorImageUrl: string;
  initialLikes: number;
  onLike: () => void;
  isLiked: boolean;
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({ 
  author, 
  authorRole, 
  publishDate, 
  lastUpdated, 
  readTime, 
  authorImageUrl,
  initialLikes,
  onLike,
  isLiked
}) => {
  const [likes, setLikes] = useState(initialLikes);

  const handleLikeClick = () => {
    onLike();
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <div className="flex px-4 pb-6 @container">
      <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
        <div className="flex gap-4">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-16 w-16"
            style={{ backgroundImage: `url("${authorImageUrl}")` }}
          ></div>
          <div className="flex flex-col justify-center">
            <p className="text-[#161118] dark:text-[#f5f7f8] text-[18px] font-bold leading-tight tracking-[-0.015em]">
              {author}
            </p>
            <p className="text-[#7c608a] dark:text-[#c5b3d1] text-base font-normal leading-normal">
              {authorRole} · {publishDate} · {readTime}
            </p>
            <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm font-normal leading-normal">
              Last updated {lastUpdated}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <VibeCheckButton initialVibes={initialLikes} />
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