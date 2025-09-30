// MediaSection.tsx
// This component handles the media section of the tool/tech review form
import React from 'react';
import GearMediaUpload from '@/app/components/GearMediaUpload';
import { MediaSectionProps } from '@/app/types/gear';

const MediaSection: React.FC<MediaSectionProps> = ({ formData, setFormData }) => {
  const handleMediaUpload = (urls: { heroImageUrl?: string; demoVideoUrl?: string }) => {
    setFormData(prev => ({
      ...prev,
      heroImageUrl: urls.heroImageUrl || prev.heroImageUrl,
      demoVideoUrl: urls.demoVideoUrl || prev.demoVideoUrl
    }));
  };

  return (
    <div className="bg-background-light dark:bg-background-dark rounded-xl border border-primary/20 p-6">
      <h2 className="text-[#161118] dark:text-[#f5f7f8] text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
        Media
      </h2>
      
      <GearMediaUpload 
        onMediaUpload={handleMediaUpload}
        currentMediaUrls={{
          heroImageUrl: formData.heroImageUrl,
          demoVideoUrl: formData.demoVideoUrl
        }}
        bucketName="gear-review-media"
      />
    </div>
  );
};

export default MediaSection;