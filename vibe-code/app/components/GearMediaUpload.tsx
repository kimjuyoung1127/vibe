// GearMediaUpload.tsx
// This component handles media uploading for gear section (hero images) and YouTube URL for demo videos
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { GearMediaUploadProps } from '@/app/types/components';

const GearMediaUpload: React.FC<GearMediaUploadProps> = ({
  onMediaUpload,
  currentMediaUrls,
  folderPath = 'gear-media',
  maxFileSize = 10 * 1024 * 1024, // 10MB
  acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  bucketName = 'gear-review-media',
  label = 'Upload Media'
}) => {
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  const [heroImagePreview, setHeroImagePreview] = useState<string | null>(null);
  const [youtubeThumbnail, setYoutubeThumbnail] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const heroImageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHeroImagePreview(currentMediaUrls?.heroImageUrl || null);
    
    // If there's a YouTube URL, generate the thumbnail
    if (currentMediaUrls?.demoVideoUrl) {
      setYoutubeUrl(currentMediaUrls.demoVideoUrl);
      generateThumbnail(currentMediaUrls.demoVideoUrl);
    }
  }, [currentMediaUrls]);

  const handleHeroImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSuccessMessage(null);
    
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validate file type
      if (!acceptedImageTypes.includes(selectedFile.type)) {
        setError(`Invalid image type. Acceptable types: ${acceptedImageTypes.join(', ')}`);
        return;
      }
      
      // Validate file size
      if (selectedFile.size > maxFileSize) {
        setError(`File size too large. Maximum size: ${(maxFileSize / 1024 / 1024).toFixed(2)}MB`);
        return;
      }
      
      setHeroImageFile(selectedFile);
      
      // Create preview URL
      const preview = URL.createObjectURL(selectedFile);
      setHeroImagePreview(preview);
      
      // Clean up the preview URL when component unmounts or file changes
      return () => URL.revokeObjectURL(preview);
    }
  };

  const extractVideoId = (url: string): string | null => {
    // Regular expression to match YouTube video IDs from various URL formats
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([^#&?]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const generateThumbnail = (url: string) => {
    const videoId = extractVideoId(url);
    if (videoId) {
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      setYoutubeThumbnail(thumbnailUrl);
      
      // Validate if the thumbnail actually exists
      const img = new Image();
      img.onload = () => {
        setSuccessMessage('Valid YouTube URL. Thumbnail loaded successfully.');
      };
      img.onerror = () => {
        setYoutubeThumbnail(null);
        setError('Could not load thumbnail from this YouTube URL. Please check the URL.');
      };
      img.src = thumbnailUrl;
    } else {
      setError('Invalid YouTube URL. Please enter a valid YouTube video URL.');
      setYoutubeThumbnail(null);
    }
  };

  const handleYoutubeUrlChange = (url: string) => {
    setYoutubeUrl(url);
    setError(null);
    setSuccessMessage(null);
    
    if (url) {
      generateThumbnail(url);
    } else {
      setYoutubeThumbnail(null);
    }
  };

  const handleUpload = async () => {
    if (!heroImageFile && !youtubeUrl) {
      setError('Please select an image to upload or enter a YouTube URL');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccessMessage(null);

    const uploadedUrls: { heroImageUrl?: string; demoVideoUrl?: string } = {};

    try {
      // Upload hero image if selected
      if (heroImageFile) {
        // Sanitize the file name to remove special characters that are not allowed in Supabase storage keys
        const sanitizedFileName = heroImageFile.name
          .replace(/[^a-zA-Z0-9.-]/g, '_') // Replace special characters with underscores
          .replace(/_{2,}/g, '_') // Replace multiple consecutive underscores with a single one
          .replace(/^_+|_+$/g, ''); // Remove leading or trailing underscores
        
        const heroFileName = `${folderPath}/hero-image-${Date.now()}_${sanitizedFileName}`;
        
        const { data, error: uploadError } = await supabase
          .storage
          .from(bucketName)
          .upload(heroFileName, heroImageFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) throw uploadError;

        // Get the public URL of the uploaded file
        const { data: publicUrlData } = supabase
          .storage
          .from(bucketName)
          .getPublicUrl(heroFileName);

        if (publicUrlData) {
          uploadedUrls.heroImageUrl = publicUrlData.publicUrl;
        }
      }

      // If YouTube URL is provided, validate it and add to the result
      if (youtubeUrl) {
        const videoId = extractVideoId(youtubeUrl);
        if (!videoId) {
          throw new Error('Invalid YouTube URL');
        }
        uploadedUrls.demoVideoUrl = youtubeUrl;
      }

      // Call the parent function with uploaded URLs
      onMediaUpload(uploadedUrls);
      setSuccessMessage('Media uploaded successfully!');
    } catch (err: any) {
      console.error('Error uploading media:', err);
      setError(err.message || 'Failed to upload media. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleHeroImageClick = () => {
    if (heroImageInputRef.current) {
      heroImageInputRef.current.click();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-[#161118] dark:text-[#f5f7f8] text-sm font-medium mb-1">
          {label}
        </label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hero Image Upload */}
          <div className="space-y-4">
            <div>
              <label className="block text-[#161118] dark:text-[#f5f7f8] text-sm font-medium mb-1">
                Hero Image
              </label>
              <input
                type="file"
                ref={heroImageInputRef}
                onChange={handleHeroImageChange}
                accept={acceptedImageTypes.join(',')}
                className="hidden"
              />
              <div className="flex flex-col items-center">
                {/* Preview area */}
                <div 
                  className="w-40 h-40 rounded-lg border-2 border-dashed border-primary/30 flex items-center justify-center mb-4 cursor-pointer overflow-hidden"
                  onClick={handleHeroImageClick}
                >
                  {heroImagePreview ? (
                    <img 
                      src={heroImagePreview} 
                      alt="Hero Image Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <span className="material-symbols-outlined text-primary text-3xl">image</span>
                      <p className="text-xs mt-1 text-[#161118] dark:text-[#f5f7f8]">Click to upload image</p>
                    </div>
                  )}
                </div>
                
                <button
                  type="button"
                  onClick={handleHeroImageClick}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm"
                >
                  Select Image
                </button>
              </div>
            </div>
          </div>
          
          {/* YouTube URL Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-[#161118] dark:text-[#f5f7f8] text-sm font-medium mb-1">
                Demo Video (YouTube URL)
              </label>
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => handleYoutubeUrlChange(e.target.value)}
                className="w-full bg-white dark:bg-[#0f0f1a] border border-[#e2dbe6] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://www.youtube.com/watch?v=..."
              />
              
              {/* YouTube Thumbnail Preview */}
              {youtubeThumbnail && (
                <div className="mt-4 flex flex-col items-center">
                  <p className="text-sm text-[#161118] dark:text-[#f5f7f8] mb-2">YouTube Thumbnail Preview:</p>
                  <div className="border border-[#e2dbe6] rounded-lg p-2">
                    <img 
                      src={youtubeThumbnail} 
                      alt="YouTube Thumbnail Preview"
                      className="max-w-full h-auto rounded"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {(heroImageFile || youtubeUrl) && (
          <div className="mt-4 flex gap-2 justify-center">
            <button
              type="button"
              onClick={handleUpload}
              disabled={uploading}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload Media'}
            </button>
            <button
              type="button"
              onClick={() => {
                setHeroImageFile(null);
                setYoutubeUrl('');
                setHeroImagePreview(currentMediaUrls?.heroImageUrl || null);
                setYoutubeThumbnail(null);
                setError(null);
                setSuccessMessage(null);
              }}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        )}
        
        {error && (
          <div className="mt-2 text-red-500 text-sm">{error}</div>
        )}
        
        {successMessage && (
          <div className="mt-2 text-green-500 text-sm">{successMessage}</div>
        )}
      </div>
    </div>
  );
};

export default GearMediaUpload;