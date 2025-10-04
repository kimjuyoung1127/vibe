// ShareButton.tsx
// This component provides various sharing options for articles, prioritizing a stable 'Copy Link' function.
'use client';

import React, { useState, useEffect } from 'react';

interface ShareButtonProps {
  url: string;
  title: string;
  description?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  url,
  title,
  description = '',
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);

  // Function to copy URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      // Reset the copied state after a few seconds
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
      alert('Failed to copy link. Please try again.');
    });
  };

  // Function to share via Facebook
  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank');
  };

  // Function to share via Twitter (X)
  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  // Function to share via LinkedIn
  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank');
  };

  // Function to share via email
  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Shared article: ${title}`);
    const body = encodeURIComponent(`Check out this article: ${url}\n\n${description}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative">
      <button 
        className="flex items-center gap-1 px-3 py-1 text-[#7c608a] dark:text-[#c5b3d1] hover:text-[#161118] dark:hover:text-[#f5f7f8] rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors duration-200"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span className="material-symbols-outlined">share</span>
        <span>Share</span>
      </button>
      
      {showDropdown && (
        <div 
          className="absolute z-50 mt-2 w-60 rounded-xl shadow-lg bg-background-light dark:bg-background-dark border border-primary/20 py-2"
          onClick={() => setShowDropdown(false)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard();
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-[#161118] dark:text-[#f5f7f8] hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors duration-200"
          >
            <span className="material-symbols-outlined mr-3 text-primary">
              {copied ? 'check' : 'content_copy'}
            </span>
            {copied ? 'Link Copied!' : 'Copy Link'}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              shareToFacebook();
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-[#161118] dark:text-[#f5f7f8] hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors duration-200"
          >
            <span className="material-symbols-outlined mr-3 text-[#1877F2]">thumb_up</span>
            Share via Facebook
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              shareToTwitter();
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-[#161118] dark:text-[#f5f7f8] hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors duration-200"
          >
            <span className="material-symbols-outlined mr-3 text-[#1DA1F2]">tag</span>
            Share via Twitter
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              shareToLinkedIn();
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-[#161118] dark:text-[#f5f7f8] hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors duration-200"
          >
            <span className="material-symbols-outlined mr-3 text-[#0077B5]">groups</span>
            Share via LinkedIn
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              shareViaEmail();
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-[#161118] dark:text-[#f5f7f8] hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors duration-200"
          >
            <span className="material-symbols-outlined mr-3 text-primary">email</span>
            Share via Email
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
