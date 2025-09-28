// ProfileImageUpload.tsx
// This component handles image uploading for user profile pictures or other images
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '@/app/lib/supabaseClient';

interface ProfileImageUploadProps {
  onImageUpload: (url: string) => void;
  onUploadError?: (error: string) => void;
  currentImageUrl?: string;
  folderPath?: string;
  maxFileSize?: number; // in bytes, default to 5MB
  acceptedFileTypes?: string[]; // e.g., ['image/jpeg', 'image/png', 'image/gif']
  bucketName?: string; // Supabase storage bucket name
  label?: string;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  onImageUpload,
  onUploadError, // 업로드 실패 시 부모로 에러 전달
  currentImageUrl,
  folderPath = 'images',
  maxFileSize = 5 * 1024 * 1024, // 5MB
  acceptedFileTypes = ['image/jpeg', 'image/png', 'image/gif'],
  bucketName = 'gear-media',
  label = 'Upload Image'
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 외부에서 전달된 현재 이미지 URL을 미리보기로 사용
  useEffect(() => {
    setPreviewUrl(currentImageUrl || null);
  }, [currentImageUrl]);

  // blob URL 메모리 누수 방지: previewUrl이 변경되거나 컴포넌트 언마운트 시 revoke
  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);

    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Validate file type
      if (!acceptedFileTypes.includes(selectedFile.type)) {
        setError(`Invalid file type. Acceptable types: ${acceptedFileTypes.join(', ')}`);
        return;
      }

      // Validate file size
      if (selectedFile.size > maxFileSize) {
        setError(`File size too large. Maximum size: ${(maxFileSize / 1024 / 1024).toFixed(2)}MB`);
        return;
      }

      setFile(selectedFile);

      // Create preview URL
      const preview = URL.createObjectURL(selectedFile);
      setPreviewUrl(preview);
      // cleanup은 useEffect에서 처리
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // 기존 이미지가 있다면 먼저 삭제
      if (currentImageUrl) {
        // URL 끝의 파일명에서 쿼리스트링 제거
        const imageUrlParts = currentImageUrl.split('/');
        const fileNameFromUrl = imageUrlParts[imageUrlParts.length - 1].split('?')[0];
        const fullFilePath = `${folderPath}/${fileNameFromUrl}`;

        await supabase.storage.from(bucketName).remove([fullFilePath]);
      }

      // 고유 파일명 생성
      const fileName = `${folderPath}/${Date.now()}_${file.name}`;

      // 업로드
      const { data, error: uploadError } = await supabase
        .storage
        .from(bucketName)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // public URL 조회
      const { data: publicUrlData } = supabase
        .storage
        .from(bucketName)
        .getPublicUrl(fileName);

      if (publicUrlData) {
        onImageUpload(publicUrlData.publicUrl);
      }
    } catch (err: any) {
      console.error('Error uploading image:', err);
      const errorMsg = err?.message || 'Failed to upload image. Please try again.';
      setError(errorMsg);
      if (onUploadError) onUploadError(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[#161118] dark:text-[#f5f7f8] text-sm font-medium mb-1">
          {label}
        </label>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={acceptedFileTypes.join(',')}
          className="hidden"
        />
        <div className="flex flex-col items-center">
          {/* Preview area */}
          <div
            className="w-32 h-32 rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center mb-4 cursor-pointer"
            onClick={handleButtonClick}
            aria-label="Select profile image"
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="text-center">
                <span className="material-symbols-outlined text-primary text-3xl">add_a_photo</span>
                <p className="text-xs mt-1 text-[#161118] dark:text-[#f5f7f8]">Click to upload</p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleButtonClick}
            disabled={uploading}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Select Image
          </button>

          {file && (
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={handleUpload}
                disabled={uploading}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading...' : 'Upload Image'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setPreviewUrl(currentImageUrl || null);
                }}
                disabled={uploading}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          )}

          {error && (
            <div className="mt-2 text-red-500 text-sm">{error}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUpload;