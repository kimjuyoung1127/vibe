// app/community/PostItem.tsx
// This component represents a single community post item

"use client";

import React from 'react';
import DropdownMenu from '@/app/components/DropdownMenu';

interface PostItemProps {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  comment_count: number;
  vibe_check_count: number;
  username: string;
  avatar_url: string | null;
  tags: string[];
  currentUser: string | null;
  onEdit: (post: any) => void;
  onDelete: (id: string) => void;
  formatDate: (dateString: string) => string;
  contentType?: 'project' | 'comment' | 'tool_review' | 'community_post';
  onReportClick?: (targetId: string, targetType: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({
  id,
  user_id,
  title,
  content,
  created_at,
  comment_count,
  vibe_check_count,
  username,
  avatar_url,
  tags,
  currentUser,
  onEdit,
  onDelete,
  formatDate,
  contentType,
  onReportClick
}) => {
  return (
    <div 
      className="overflow-hidden rounded-xl border border-primary/20 bg-background-light shadow-lg shadow-primary/10 dark:border-primary/30 dark:bg-background-dark"
    >
      {/* Post header */}
      <div className="flex items-center p-4">
        <div 
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-10 w-10"
          style={{ backgroundImage: `url("${avatar_url || 'https://placehold.co/100x100?text=U'}")` }}
        ></div>
        <div className="ml-3">
          <p className="text-sm font-bold text-black dark:text-white">
            {username}
          </p>
          <p className="text-xs text-black/60 dark:text-white/60">
            {formatDate(created_at)}
          </p>
        </div>
        {/* Edit/Delete buttons for the post author */}
        {currentUser === user_id && (
          <div className="ml-auto flex space-x-2">
            <button 
              onClick={() => onEdit({
                id,
                user_id,
                title,
                content,
                tags
              })}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(id)}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      
      {/* Post content */}
      <div className="px-4 pb-3">
        <h3 className="text-lg font-bold text-black dark:text-white mb-2">
          {title}
        </h3>
        
        <p className="text-sm text-black/80 dark:text-white/80 mb-4">
          {content.length > 300 ? `${content.substring(0, 300)}...` : content}
        </p>
      </div>
      
      {/* Tags */}
      <div className="px-4 pb-3">
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className="inline-block px-2 py-1 text-xs font-semibold text-primary bg-primary/10 dark:bg-primary/20 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Post actions */}
      <div className="flex border-t border-primary/10 dark:border-primary/20 px-4 py-3">
        <button className="flex items-center text-black/60 dark:text-white/60 hover:text-red-500">
          <span className="material-symbols-outlined mr-1">favorite_border</span>
          <span className="text-sm">{vibe_check_count}</span>
        </button>
        <button className="flex items-center ml-4 text-black/60 dark:text-white/60 hover:text-primary">
          <span className="material-symbols-outlined mr-1">chat_bubble</span>
          <span className="text-sm">{comment_count}</span>
        </button>
        <div className="ml-auto flex items-center">
          <div>
            {/* Debug info: onReportClick available: {!!onReportClick}, contentType: {contentType} */}
            {onReportClick && contentType && (
              <div className="mr-3">
                <DropdownMenu targetId={id} contentType={contentType}>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-[#161118] dark:text-[#f5f7f8] hover:bg-primary/10 dark:hover:bg-primary/20"
                    onClick={() => {
                      console.log('Report button clicked in PostItem:', { id, contentType });
                      onReportClick && onReportClick(id, contentType);
                    }}
                  >
                    Report
                  </button>
                </DropdownMenu>
              </div>
            )}
          </div>
          <button className="flex items-center text-black/60 dark:text-white/60 hover:text-primary">
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostItem;