'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { signInWithGoogle, signInWithGitHub } from '@/lib/auth';

const LoginPage = () => {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const { error } = await signInWithGoogle();
    if (error) {
      console.error('Error signing in with Google:', error);
    } else {
      // 로그인 성공 시 메인 페이지로 이동
      router.push('/');
    }
  };

  const handleGitHubSignIn = async () => {
    const { error } = await signInWithGitHub();
    if (error) {
      console.error('Error signing in with GitHub:', error);
    } else {
      // 로그인 성공 시 메인 페이지로 이동
      router.push('/');
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden p-4 bg-[#1a1122] text-white font-modern">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="flex items-center gap-4 mb-8">
          <svg className="text-[#8013ec] h-16 w-16" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
          </svg>
          <h1 className="text-5xl font-bold tracking-tighter font-retro text-shadow-neon">Vibe Code</h1>
        </div>
        <p className="text-lg text-[#ad92c9] mb-12 max-w-md">Connect with fellow developers. Share your projects, discuss tech, and embrace the cyberpunk coding aesthetic.</p>
        <div className="w-full max-w-xs space-y-4">
          <button 
            className="social-login-button google-button flex w-full items-center justify-center gap-3 rounded-md border border-[#362348] bg-[#2c1a3b] px-4 py-3 text-base font-medium text-white transition-all hover:bg-opacity-90"
            onClick={handleGoogleSignIn}
          >
            <svg className="h-6 w-6" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25C22.56 11.42 22.49 10.62 22.36 9.84H12.27V14.4H18.16C17.86 15.83 17.09 17.06 15.93 17.82V20.35H19.53C21.45 18.58 22.56 15.69 22.56 12.25Z" fill="#4285F4"></path>
              <path d="M12.27 23C15.11 23 17.52 22.13 19.53 20.35L15.93 17.82C15.01 18.43 13.76 18.82 12.27 18.82C9.45 18.82 7.07 16.92 6.24 14.35H2.5V16.94C4.46 20.73 8.08 23 12.27 23Z" fill="#34A853"></path>
              <path d="M6.24 14.35C6.02 13.75 5.88 13.12 5.88 12.47C5.88 11.82 6.02 11.19 6.24 10.59V7.99H2.5C1.67 9.53 1.15 11.17 1.15 12.47C1.15 13.77 1.67 15.41 2.5 16.94L6.24 14.35Z" fill="#FBBC05"></path>
              <path d="M12.27 6.18C13.88 6.18 15.22 6.72 16.27 7.71L19.62 4.36C17.52 2.44 15.11 1.45 12.27 1.45C8.08 1.45 4.46 4.27 2.5 8L6.24 10.59C7.07 8.02 9.45 6.18 12.27 6.18Z" fill="#EA4335"></path>
            </svg>
            <span>Continue with Google</span>
          </button>
          <button 
            className="social-login-button github-button flex w-full items-center justify-center gap-3 rounded-md border border-[#362348] bg-[#2c1a3b] px-4 py-3 text-base font-medium text-white transition-all hover:bg-opacity-90"
            onClick={handleGitHubSignIn}
          >
            <svg className="h-6 w-6" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
            </svg>
            <span>Continue with GitHub</span>
          </button>
        </div>
        <p className="mt-8 text-xs text-[#ad92c9]/70">By continuing, you agree to the Vibe Code<br/><a className="underline hover:text-white" href="#">Terms of Service</a> and <a className="underline hover:text-white" href="#">Privacy Policy</a>.</p>
      </div>
      <footer className="absolute bottom-4 text-center text-xs text-[#ad92c9]/50">
        <p>© 2024 Vibe Code. All rights reserved. System online.</p>
      </footer>
    </div>
  );
};

export default LoginPage;