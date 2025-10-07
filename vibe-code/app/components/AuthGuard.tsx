'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/lib/supabaseClient';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const AuthGuard = ({ children, fallback }: AuthGuardProps) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null = loading
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        // Show the login prompt instead of redirecting immediately
        setShowLoginPrompt(true);
      }
    };

    checkAuth();
  }, [router]);

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  const handleCancel = () => {
    // Redirect back to home page if user cancels login
    router.push('/');
  };

  if (isAuthenticated === null) {
    // Show fallback while checking authentication status
    return fallback || (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isAuthenticated === false && showLoginPrompt) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] p-4">
        <div className="bg-background-light dark:bg-background-dark rounded-xl shadow-lg p-8 max-w-md w-full border border-primary/20">
          <h2 className="text-2xl font-bold mb-4 text-center">Login Required</h2>
          <p className="mb-6 text-center">
            You need to be logged in to create content. Would you like to log in now?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={handleLoginRedirect}
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Login
            </button>
            <button 
              onClick={handleCancel}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated === false) {
    // This shouldn't normally occur due to the login prompt, but just as a fallback
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
        <p className="mb-4">You need to be logged in to access this page.</p>
        <button 
          onClick={handleLoginRedirect}
          className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/80 transition-colors"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // User is authenticated, render children
  return <>{children}</>;
};

export default AuthGuard;