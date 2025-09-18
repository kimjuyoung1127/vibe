'use client';

import React from 'react';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#1a1122] text-white">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#362348] px-4 sm:px-6 md:px-10 py-4 backdrop-blur-sm bg-[#1a1122]/80 sticky top-0 z-50 glass-effect">
        <div className="flex items-center gap-4">
          <div className="text-[#8013ec] size-6 neon-text hover-glitch">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] neon-text hover-glitch cyber-heading">Vibe Code</h2>
        </div>
        <nav className="hidden md:flex md:flex-1 md:justify-center">
          <div className="flex items-center gap-9">
            <Link href="/" className="text-white text-sm font-medium leading-normal hover:text-[#8013ec] transition-colors link-neon hover-glitch font-modern">Home</Link>
            <Link href="/showcase" className="text-white text-sm font-medium leading-normal hover:text-[#8013ec] transition-colors link-neon hover-glitch font-modern">Projects</Link>
            <Link href="/community" className="text-white text-sm font-medium leading-normal hover:text-[#8013ec] transition-colors link-neon hover-glitch font-modern">Community</Link>
            <Link href="/about" className="text-white text-sm font-medium leading-normal hover:text-[#8013ec] transition-colors link-neon hover-glitch font-modern">About Us</Link>
          </div>
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-4 bg-[#8013ec] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-all neon-glow btn-neon hover-glitch font-heading">
            <span className="truncate">Sign Up</span>
          </button>
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-4 bg-transparent border border-[#362348] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#362348] hover:border-[#8013ec] transition-all duration-300">
            <span className="truncate">Log In</span>
          </button>
        </div>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center py-10 px-4 sm:px-10 text-center">
        <div className="relative">
          <div className="relative z-10">
            <h1 className="text-9xl font-black tracking-tighter text-glow glitch-2 cyber-heading" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>404</h1>
            <p className="mt-4 text-2xl font-bold text-gray-300">SYSTEM ERROR: PAGE NOT FOUND</p>
            <p className="mt-2 text-lg text-gray-400">It seems you've taken a wrong turn in the digital void.</p>
          </div>
          <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
            <div className="w-1/2 h-1/2 border-2 border-[#8013ec] opacity-20 neon-border glitch"></div>
            <div className="w-2/3 h-2/3 border-2 border-[#ff4c4c] opacity-10 neon-border glitch animation-delay-300ms"></div>
          </div>
          <div className="mt-12 space-y-4">
            <p className="text-gray-300">Let's get you back on track:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/" className="flex min-w-[160px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-4 bg-[#8013ec] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#9233ff] transition-all duration-300 neon-glow">
                <span className="truncate">Return to Homepage</span>
              </Link>
              <Link href="/showcase" className="flex min-w-[160px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-4 bg-transparent border border-[#362348] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#362348] hover:border-[#8013ec] transition-all duration-300">
                <span className="truncate">Explore Projects</span>
              </Link>
            </div>
            <p className="text-sm text-gray-500">Or check out our <Link href="/community" className="text-[#8013ec] hover:text-white transition-colors">Community Hub</Link>.</p>
          </div>
        </div>
      </main>
      <footer className="w-full border-t border-solid border-[#362348] mt-10">
        <div className="max-w-5xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[#ad92c9] text-sm">© 2024 Vibe Code. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm">
            <Link href="/terms" className="text-[#ad92c9] hover:text-white transition-colors duration-300">Terms of Service</Link>
            <Link href="#" className="text-[#ad92c9] hover:text-white transition-colors duration-300">Privacy Policy</Link>
            <Link href="#" className="text-[#ad92c9] hover:text-white transition-colors duration-300">Contact Us</Link>
          </div>
          <div className="flex justify-center gap-6">
            <Link href="#" className="text-[#ad92c9] hover:text-[#8013ec] transition-colors duration-300">
              <div data-icon="TwitterLogo" data-size="24px" data-weight="regular">
                <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                  <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path>
                </svg>
              </div>
            </Link>
            <Link href="#" className="text-[#ad92c9] hover:text-[#8013ec] transition-colors duration-300">
              <div data-icon="GithubLogo" data-size="24px" data-weight="regular">
                <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                  <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
                </svg>
              </div>
            </Link>
            <Link href="#" className="text-[#ad92c9] hover:text-[#8013ec] transition-colors duration-300">
              <div data-icon="DiscordLogo" data-size="24px" data-weight="regular">
                <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                  <path d="M104,140a12,12,0,1,1-12-12A12,12,0,0,1,104,140Zm60-12a12,12,0,1,0,12,12A12,12,0,0,0,164,128Zm74.45,64.9-67,29.71a16.17,16.17,0,0,1-21.71-9.1l-8.11-22q-6.72.45-13.63.46t-13.63-.46l-8.11,22a16.18,16.18,0,0,1-21.71,9.1l-67-29.71a15.93,15.93,0,0,1-9.06-18.51L38,58A16.07,16.07,0,0,1,51,46.14l36.06-5.93a16.22,16.22,0,0,1,18.26,11.88l3.26,12.84Q118.11,64,128,64t19.4.93l3.26-12.84a16.21,16.21,0,0,1,18.26-11.88L205,46.14A16.07,16.07,0,0,1,218,58l29.53,116.38A15.93,15.93,0,0,1,238.45,192.9ZM232,178.28,202.47,62s0,0-.08,0L166.33,56a.17.17,0,0,0-.17,0l-2.83,11.14c5,.94,10,2.06,14.83,3.42A8,8,0,0,1,176,86.31a8.09,8.09,0,0,1-2.16-.3A172.25,172.25,0,0,0,128,80a172.25,172.25,0,0,0-45.84,6,8,8,0,1,1-4.32-15.4c4.82-1.36,9.78-2.48,14.82-3.42L89.83,56s0,0-.12,0h0L53.61,61.93a.17.17,0,0,0-.09,0L24,178.33,91,208a.23.23,0,0,0,.22,0L98,189.72a173.2,173.2,0,0,1-20.14-4.32A8,8,0,0,1,82.16,170,171.85,171.85,0,0,0,128,176a171.85,171.85,0,0,0,45.84-6,8,8,0,0,1,4.32,15.41A173.2,173.2,0,0,1,158,189.72L164.75,208a.22.22,0,0,0,.21,0Z"></path>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NotFoundPage;