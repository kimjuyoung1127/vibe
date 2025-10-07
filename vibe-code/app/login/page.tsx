'use client';

import React, { useState } from 'react';
import OAuthSection from './components/OAuthSection';

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Welcome to Vibe Hub</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Sign in to your account to continue
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <OAuthSection 
          onError={setError}
          onLoadingChange={() => {}} // We can implement this if needed
        />
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Didn't receive confirmation email?{' '}
            <a href="/resend-confirmation" className="font-medium text-primary hover:text-primary/80">
              Resend confirmation
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;