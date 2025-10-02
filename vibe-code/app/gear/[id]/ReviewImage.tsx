"use client";

// ReviewImage.tsx
// This component displays the review image
"use client";

import React from 'react';

interface ReviewImageProps {
  imageUrl: string;
}

const ReviewImage: React.FC<ReviewImageProps> = ({ imageUrl }) => {
  return (
    <div className="@container mb-6">
      <div className="px-4">
        <div
          className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-white dark:bg-[#0f0f1a] rounded-lg min-h-80"
          style={{ backgroundImage: `url("${imageUrl}")` }}
        ></div>
      </div>
    </div>
  );
};

export default ReviewImage;