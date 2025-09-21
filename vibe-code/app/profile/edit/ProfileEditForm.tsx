// ProfileEditForm.tsx
// This component contains the form for editing user profile information
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import BasicInfoEditor from './BasicInfoEditor';
import SocialLinksEditor from './SocialLinksEditor';
import AccountSettingsEditor from './AccountSettingsEditor';

const ProfileEditForm = () => {
  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would validate the form and submit the data
    console.log('Saving profile changes...');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        {/* Back button */}
        <div className="px-4 py-6">
          <Link 
            href="/profile" 
            className="flex items-center gap-2 text-primary hover:underline"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span>Back to Profile</span>
          </Link>
        </div>
        
        {/* Page header */}
        <div className="flex flex-wrap justify-between gap-3 px-4 py-4 border-b border-primary/10 dark:border-primary/20">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#161118] dark:text-[#f5f7f8] tracking-light text-[32px] font-bold leading-tight">
              Edit My Profile
            </p>
            <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm font-normal leading-normal">
              Update your profile information and preferences
            </p>
          </div>
        </div>
        
        {/* Basic information section */}
        <BasicInfoEditor />
        
        {/* Social links section */}
        <SocialLinksEditor />
        
        {/* Account settings section */}
        <AccountSettingsEditor />
        
        {/* Action buttons */}
        <div className="px-4 py-6 flex gap-3">
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Save Changes
          </button>
          
          <Link
            href="/profile"
            className="px-6 py-3 bg-[#f5f7f8] dark:bg-[#0f0f1a] text-[#161118] dark:text-[#f5f7f8] rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Cancel
          </Link>
          
          <button
            type="button"
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ml-auto"
          >
            Delete Account
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileEditForm;