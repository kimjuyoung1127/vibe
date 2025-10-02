'use client';

import { useEffect } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { useRouter } from 'next/navigation';

const AuthCallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Check if we have a session by getting the current session
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (session) {
        // If we have a session, redirect to home page
        router.push('/');
        router.refresh();
      } else {
        // If no session, redirect to login page
        router.push('/login');
      }
    };

    // Handle the callback with a small delay to ensure the OAuth flow completes
    const timer = setTimeout(handleAuthCallback, 500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Authenticating...
        </p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;