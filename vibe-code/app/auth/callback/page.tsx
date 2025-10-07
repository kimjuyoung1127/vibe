'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { useRouter, useSearchParams } from 'next/navigation';

const AuthCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Log all URL parameters for debugging
        const allParams: string[] = [];
        searchParams.forEach((value, key) => {
          allParams.push(`${key}=${value}`);
        });
        setDebugInfo(`URL params: ${allParams.join(', ')}`);

        // Check if we have a session by getting the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Error getting session:', sessionError);
          setError(`Session error: ${sessionError.message}`);
          // Still try to redirect to login
          setTimeout(() => {
            router.push('/login');
          }, 3000);
          return;
        }
        
        if (session) {
          console.log('Successfully authenticated user:', session.user);
          setDebugInfo(prev => prev + ` | User authenticated: ${session.user.email || session.user.id}`);
          // If we have a session, redirect to home page
          router.push('/');
          router.refresh();
        } else {
          console.log('No session found, redirecting to login');
          // If no session, redirect to login page
          router.push('/login');
        }
      } catch (err: any) {
        console.error('Auth callback error:', err);
        setError(`Callback error: ${err.message}`);
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    };

    // Handle the callback with a small delay to ensure the OAuth flow completes
    const timer = setTimeout(handleAuthCallback, 500);

    return () => clearTimeout(timer);
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Authenticating...
        </p>
        
        {debugInfo && (
          <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm text-gray-800 dark:text-gray-200">
            <strong>Debug:</strong> {debugInfo}
          </div>
        )}
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 rounded text-sm text-red-800 dark:text-red-200">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallbackPage;