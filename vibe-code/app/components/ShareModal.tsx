// C:\Users\gmdqn\vibe\vibe-code\app\components\ShareModal.tsx
"use client";

import React, { useState } from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
  description?: string;
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  url,
  title,
  description = '',
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        onClose(); // Close modal after successful copy
      }, 1500);
    }).catch(err => {
      console.error('Failed to copy: ', err);
      alert('Failed to copy link.');
    });
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    onClose();
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
    onClose();
  };

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div 
        className="bg-background-light dark:bg-background-dark rounded-xl shadow-lg p-6 w-full max-w-sm m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold text-center mb-4">Share Project</h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={copyToClipboard}
            className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors duration-200"
          >
            <span className="material-symbols-outlined mr-3">
              {copied ? 'check' : 'content_copy'}
            </span>
            {copied ? 'Link Copied!' : 'Copy Link'}
          </button>
          <button
            onClick={shareToFacebook}
            className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors duration-200"
          >
            <span className="material-symbols-outlined mr-3 text-[#1877F2]">thumb_up</span>
            Share via Facebook
          </button>
          <button
            onClick={shareToTwitter}
            className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors duration-200"
          >
            <span className="material-symbols-outlined mr-3 text-[#1DA1F2]">tag</span>
            Share via Twitter
          </button>
          <button
            onClick={shareToLinkedIn}
            className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors duration-200"
          >
            <span className="material-symbols-outlined mr-3 text-[#0077B5]">groups</span>
            Share via LinkedIn
          </button>
        </div>
        <button
          onClick={onClose}
          className="w-full mt-4 px-4 py-2 text-sm text-gray-600 dark:text-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
