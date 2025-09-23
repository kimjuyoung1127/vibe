// ProfileImageUpload.tsx
// A specialized image upload component for profile avatars
"use client";

import React, { useState, useRef } from 'react';
import { supabase } from '@/app/lib/supabaseClient';

interface ProfileImageUploadProps {
  onUploadSuccess: (url: string) => void;
  onUploadError: (error: string) => void;
  currentImageUrl?: string;
  maxFileSize?: number; // in MB
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  onUploadSuccess,
  onUploadError,
  currentImageUrl,
  maxFileSize = 5
}) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image/*')) {
      const errorMessage = `Invalid file type. Please upload a valid image file.`;
      onUploadError(errorMessage);
      return;
    }

    // Validate file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxFileSize) {
      const errorMessage = `File size exceeds ${maxFileSize}MB limit.`;
      onUploadError(errorMessage);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setPreviewUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);

    setUploading(true);
    
    try {
      // Upload file to Supabase Storage in the avatar bucket
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { data, error } = await supabase
        .storage
        .from('avatar')
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL for the uploaded image
      const { data: { publicUrl } } = supabase
        .storage
        .from('avatar')
        .getPublicUrl(fileName);

      onUploadSuccess(publicUrl);
    } catch (error: any) {
      console.error('Error uploading file:', error);
      const errorMessage = error.message || 'Failed to upload image.';
      onUploadError(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // Notify parent component that image was removed
    onUploadSuccess('');
  };

  return (
    <div className="w-full">
      {previewUrl || currentImageUrl ? (
        // Preview section - shown when there's an image
        <div className="flex flex-col items-center">
          <div className="relative w-full">
            <img
              src={previewUrl || currentImageUrl}
              alt="Preview"
              className="max-h-48 max-w-full rounded-full object-cover"
            />
            <button
              type="button"
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              onClick={removeImage}
            >
              <span className="material-symbols-outlined text-xs">close</span>
            </button>
          </div>
          <button
            type="button"
            className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors cursor-pointer text-sm"
            onClick={triggerFileInput}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Change Image'}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        // Drag & drop area - shown when there's no image
        <div className="border-2 border-dashed border-primary/30 dark:border-primary/50 rounded-lg p-6 text-center">
          <div className="flex flex-col items-center justify-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
            <p className="text-[#161118] dark:text-[#f5f7f8] font-medium">
              Drag & drop your image here
            </p>
            <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm">
              or
            </p>
            <button
              type="button"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors cursor-pointer disabled:opacity-50"
              onClick={triggerFileInput}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Browse Files'}
            </button>
            <p className="text-[#7c608a] dark:text-[#c5b3d1] text-xs">
              {`Recommended: PNG, JPG up to ${maxFileSize}MB`}
            </p>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileImageUpload;