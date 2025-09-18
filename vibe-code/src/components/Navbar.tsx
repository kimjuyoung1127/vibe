'use client'

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  // In a real implementation, this would come from user context/auth
  const userAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuBL8BPUR0o8U7msmzlxt0WJUDeSoGlswvEjCIovJfuGedi4XGbkVWgSTr4XxGzZoNLKtU2Zkgg02av0cf5Ss4CaxkSAa37HyBbM1GxJpaCuL3zuEpG51PZ3MUKa56w5VjjoLoDNFJZbjzcXKvSlMcNhYCJVnjLuH828ylwXL-ep2WbuiHcEs-KKti4VXDyvljlCuN8lstrCRfp5NDg-DTAuaYffdfsIoIgp6ZJccdpgh2plDEIus7EEuCaQtyA7GZjB0flIdVXhCtI";
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#362348] px-4 sm:px-6 md:px-10 py-4 backdrop-blur-sm bg-[#1a1122]/80 sticky top-0 z-50 glass-effect" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      <div className="flex items-center gap-4">
        <div className="text-[#8013ec] size-8 neon-text hover-glitch">
          {/* Logo SVG */}
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
          </svg>
        </div>
        <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] neon-text hover-glitch cyber-heading">Vibe Code</h2>
      </div>
      
      {/* Mobile menu button */}
      <button 
        className="md:hidden text-white focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex md:flex-1 md:justify-center">
        <div className="flex items-center gap-9">
          <Link href="/" className="text-white text-sm font-medium leading-normal hover:text-[#8013ec] transition-colors link-neon hover-glitch font-modern">Home</Link>
          <Link href="/showcase" className="text-white text-sm font-medium leading-normal hover:text-[#8013ec] transition-colors link-neon hover-glitch font-modern">Projects</Link>
          <Link href="/gear" className="text-white text-sm font-medium leading-normal hover:text-[#8013ec] transition-colors link-neon hover-glitch font-modern">Gear</Link>
          <Link href="/news" className="text-white text-sm font-medium leading-normal hover:text-[#8013ec] transition-colors link-neon hover-glitch font-modern">News</Link>
          <Link href="/community" className="text-white text-sm font-medium leading-normal hover:text-[#8013ec] transition-colors link-neon hover-glitch font-modern">Community</Link>
        </div>
      </nav>
      
      <div className="hidden md:flex items-center gap-4">
        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-4 bg-[#8013ec] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-all neon-glow btn-neon hover-glitch font-heading">
          <span className="truncate">New Post</span>
        </button>
        <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 bg-[#362348] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#4a315e] transition-colors neon-glow hover-glitch font-heading">
          <div className="text-white" data-icon="Bell" data-size="20px" data-weight="regular">
            {/* Bell Icon SVG */}
            <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
              <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
            </svg>
          </div>
        </button>
        <Link href="/profile" className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#8013ec] neon-glow hover-glitch" style={{ backgroundImage: `url("${userAvatar}")` }}></Link>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#1a1122] border-b border-[#362348] z-50">
          <div className="flex flex-col py-4">
            <Link href="/" className="px-4 py-2 text-white text-sm font-medium leading-normal hover:text-[#8013ec] transition-colors link-neon hover-glitch font-modern" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/showcase" className="px-4 py-2 text-white text-sm font-medium leading-normal hover:text-[#8013ec] transition-colors link-neon hover-glitch font-modern" onClick={() => setIsMenuOpen(false)}>Projects</Link>
            <Link href="/gear" className="px-4 py-2 text-white text-sm font-medium leading-normal hover:text-[#8013ec] transition-colors link-neon hover-glitch font-modern" onClick={() => setIsMenuOpen(false)}>Gear</Link>
            <Link href="/news" className="px-4 py-2 text-white text-sm font-medium leading-normal hover:text-[#8013ec] transition-colors link-neon hover-glitch font-modern" onClick={() => setIsMenuOpen(false)}>News</Link>
            <Link href="/community" className="px-4 py-2 text-white text-sm font-medium leading-normal hover:text-[#8013ec] transition-colors link-neon hover-glitch font-modern" onClick={() => setIsMenuOpen(false)}>Community</Link>
            <div className="flex items-center gap-4 px-4 py-2 mt-2">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-4 bg-[#8013ec] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-all neon-glow btn-neon hover-glitch font-heading">
                <span className="truncate">New Post</span>
              </button>
              <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 bg-[#362348] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#4a315e] transition-colors neon-glow hover-glitch font-heading">
                <div className="text-white" data-icon="Bell" data-size="20px" data-weight="regular">
                  {/* Bell Icon SVG */}
                  <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
                  </svg>
                </div>
              </button>
              <Link href="/profile" className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#8013ec] neon-glow hover-glitch" style={{ backgroundImage: `url("${userAvatar}")` }} onClick={() => setIsMenuOpen(false)}></Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;