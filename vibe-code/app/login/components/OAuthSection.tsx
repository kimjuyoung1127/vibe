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
      <div className="grid grid-cols-1 gap-3">
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