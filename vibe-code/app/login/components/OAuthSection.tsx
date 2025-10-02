'use client';

import React from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import GitHubLoginButton from './GitHubLoginButton';

interface OAuthSectionProps {
  onLoadingChange?: (loading: boolean) => void;
  onError?: (error: string) => void;
}

const OAuthSection: React.FC<OAuthSectionProps> = ({ onLoadingChange, onError }) => {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            Or continue with
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <GoogleLoginButton 
          onLoadingChange={onLoadingChange}
          onError={onError}
        />
        <GitHubLoginButton 
          onLoadingChange={onLoadingChange}
          onError={onError}
        />
      </div>
    </div>
  );
};

export default OAuthSection;