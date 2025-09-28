// BasicInfoEditor.tsx
// This component handles editing basic user information
"use client";

import React, { useState, useEffect } from 'react';
import ProfileImageUpload from '@/app/components/ProfileImageUpload';

interface BasicInfoEditorProps {
  formData: any;
  setFormData: (data: any) => void;
}

const BasicInfoEditor = ({ formData, setFormData }: BasicInfoEditorProps) => {
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleUploadSuccess = (url: string) => {
    setFormData({ ...formData, avatar_url: url });
    setUploadError(null);
  };

  const handleUploadError = (error: string) => {
    setUploadError(error);
  };

  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, display_name: e.target.value });
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, bio: e.target.value });
  };

  return (
    <div className="p-4 border-b border-primary/10 dark:border-primary/20">
      <h2 className="text-[#161118] dark:text-[#f5f7f8] text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
        Basic Information
      </h2>
      
      <div className="space-y-6">
        {/* Avatar upload */}
        <div>
          <label className="block text-sm font-medium text-[#161118] dark:text-[#f5f7f8] mb-2">
            Profile Image / Avatar
          </label>
          
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <ProfileImageUpload
                onImageUpload={handleUploadSuccess}
                onUploadError={handleUploadError}
                currentImageUrl={formData.avatar_url}
                maxFileSize={5 * 1024 * 1024} // 5MB
                bucketName="avatar"
              />
              {uploadError && (
                <div className="mt-2 text-red-500 text-sm">{uploadError}</div>
              )}
            </div>
          </div>
        </div>
        
        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-[#161118] dark:text-[#f5f7f8] mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={formData.username || ''}
            className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-[#e2dbe6] dark:border-[#1a1a2e] rounded-lg text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary"
            readOnly
          />
          <p className="text-[#7c608a] dark:text-[#c5b3d1] text-xs mt-1">
            Username cannot be changed (unique identifier)
          </p>
        </div>
        
        {/* Display name */}
        <div>
          <label htmlFor="displayName" className="block text-sm font-medium text-[#161118] dark:text-[#f5f7f8] mb-2">
            Display Name
          </label>
          <input
            type="text"
            id="displayName"
            value={formData.display_name || ''}
            onChange={handleDisplayNameChange}
            className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-[#e2dbe6] dark:border-[#1a1a2e] rounded-lg text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p className="text-[#7c608a] dark:text-[#c5b3d1] text-xs mt-1">
            This name will be displayed on your profile (not unique)
          </p>
        </div>
        
        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-[#161118] dark:text-[#f5f7f8] mb-2">
            Bio / Tagline
          </label>
          <textarea
            id="bio"
            value={formData.bio || ''}
            onChange={handleBioChange}
            rows={4}
            className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-[#e2dbe6] dark:border-[#1a1a2e] rounded-lg text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
          <p className="text-[#7c608a] dark:text-[#c5b3d1] text-xs mt-1">
            Maximum 160 characters
          </p>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoEditor;