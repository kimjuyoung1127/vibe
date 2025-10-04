// components/NewsProcessHeader.tsx
import React from 'react';

interface NewsProcessHeaderProps {
  title: string;
  description: string;
}

const NewsProcessHeader: React.FC<NewsProcessHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-[#161118] dark:text-[#f5f7f8]">
        {title}
      </h1>
      <p className="text-[#7c608a] dark:text-[#c5b3d1]">
        {description}
      </p>
    </div>
  );
};

export default NewsProcessHeader;