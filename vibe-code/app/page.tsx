
// page.tsx
// This is the main home page
"use client";

import React from 'react';
import TopNavWrapper from './components/TopNavWrapper';
import NavbarWrapper from './components/NavbarWrapper';
import HeroSection from './mainpage/HeroSection';
import WeeklyVibeRanking from './mainpage/WeeklyVibeRanking';
import LatestProjects from './mainpage/LatestProjects';
import VibeNews from './mainpage/VibeNews';

const HomePage = () => {
  return (
    <div className="group/design-root relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Top navigation bar */}
      <TopNavWrapper />
      
      {/* Main content area with sidebar and main content */}
      <div className="flex flex-1">
        {/* Left sidebar navigation */}
        <NavbarWrapper />
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto">
          {/* Hero section */}
          <HeroSection />
          
          {/* Weekly Vibe Ranking section */}
          <WeeklyVibeRanking />
          
          {/* Latest Projects section */}
          <LatestProjects />
          
          {/* Vibe News section */}
          <VibeNews />
        </main>
      </div>
    </div>
  );
};

export default HomePage;