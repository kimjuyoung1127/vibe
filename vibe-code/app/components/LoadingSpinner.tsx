// app/components/LoadingSpinner.tsx
import React from 'react';
import { LoadingSpinnerProps } from '@/app/types/components';



const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  message = 'Loading...' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div 
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-t-indigo-600 border-r-indigo-600 border-b-transparent border-l-transparent`}
      />
      {message && (
        <p className="mt-4 text-gray-600 dark:text-gray-300">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;