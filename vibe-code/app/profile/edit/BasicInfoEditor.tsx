// BasicInfoEditor.tsx
// This component handles editing basic user information
"use client";

import React, { useState } from 'react';

const BasicInfoEditor = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarPreview(event.target.result as string);
        }
      };
      
      reader.readAsDataURL(file);
    }
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
            {/* Current avatar preview */}
            <div className="flex flex-col items-center">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-24 w-24 mb-2"
                style={{ 
                  backgroundImage: `url("${avatarPreview || 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9hObyn2gW7Bz7eMWI1H9ewEyue6S8iS83-Fzb5ePmp41f4i6tgyX-J1nO9Hl5zh3ta8XzBM4UbJ4523HCiuSyJ96y2PpwuXLnibaJmReZwqKenYrxdmMfnh5ZNsMU5ouTIJCsKOqfxWaMhsJHSb3MRGLuMjv_w11vz0poV4y6uKDZlfqSotWLrIr1z0Ru-Rty1XEIlPO180irzteXkV_cejqXBcxCYn77nMLMjN347eQ1REZ70u9-wJ7CfXKBCQYIcyT9bXuUTQ'}")` 
                }}
              ></div>
              <button 
                type="button"
                className="text-sm text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
            
            {/* Upload area */}
            <div className="flex-1">
              <div className="border-2 border-dashed border-primary/30 dark:border-primary/50 rounded-lg p-6 text-center">
                <div className="flex flex-col items-center justify-center gap-3">
                  <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
                  <p className="text-[#161118] dark:text-[#f5f7f8] font-medium">
                    Drag & drop your image here
                  </p>
                  <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm">
                    or
                  </p>
                  <label className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors cursor-pointer">
                    Browse Files
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </label>
                  <p className="text-[#7c608a] dark:text-[#c5b3d1] text-xs">
                    Recommended: Pixel art or pop color style (PNG, JPG up to 5MB)
                  </p>
                </div>
              </div>
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
            defaultValue="sophia_carter"
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
            defaultValue="Sophia Carter"
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
            defaultValue="Full-stack developer passionate about creating vibrant, retro-inspired web experiences. Love exploring the intersection of design and technology."
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