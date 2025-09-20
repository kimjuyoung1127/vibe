// HeroSection.tsx
// This component displays the hero section of the main page with a call-to-action button
"use client";

import React from 'react';

const HeroSection = () => {
  return (
    <div className="p-4 @container md:p-6 lg:p-8">
      {/* Hero section with gradient overlay and background image */}
      <div 
        className="relative flex min-h-[400px] flex-col items-start justify-end gap-6 overflow-hidden rounded-xl bg-cover bg-center p-8 shadow-2xl shadow-primary/20"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBsn1yYHxHFIcHHre3E1pN6kwAUxze5gEIIU1E7ffYilOLRgoMo7HEiytwIgCbSKDa--yW123iS39MSS3RlOVv4xFPb_qdOxRWcPafCD3TskQZY2jzd6ifBHQg5tzDDpbCK1zVJi9duAU3xu-HFnHjWPZMc_HHDQZ74uc6VIrh5JCAgs6L39E4_1Y3tvxv_2wB3HAI45x_nhOq2kZABMVQb8gbENU1_MT2XOO5Y1yBuwsBZSsHbBHlnoSQVIx1yvmg-5BhxSYzphQ")' 
        }}
      >
        {/* Color overlay for better text visibility */}
        <div className="absolute inset-0 rounded-xl bg-primary/20 mix-blend-color"></div>
        
        {/* Hero content with headline and subheadline */}
        <div className="relative z-10 flex flex-col gap-4 text-left">
          <h1 className="text-4xl font-black text-white drop-shadow-lg @[480px]:text-5xl">
            Welcome to Vibe Hub
          </h1>
          <h2 className="max-w-xl text-base text-white/90 drop-shadow-md @[480px]:text-lg">
            Explore, create, and share your coding projects with a vibrant community of developers.
          </h2>
        </div>
        
        {/* Call-to-action button */}
        <button className="relative z-10 flex h-12 items-center justify-center whitespace-nowrap rounded-lg bg-primary px-6 text-base font-bold text-white shadow-lg shadow-primary/30 ring-2 ring-white/30 transition-all hover:bg-primary/90 hover:shadow-primary/40">
          <span className="truncate">Explore Projects</span>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;