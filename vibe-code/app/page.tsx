"use client";

import React from 'react';
import TopNav from './components/topnav';
import Navbar from './components/navbar';
import HeroSection from './mainpage/HeroSection';
import WeeklyVibeRanking from './mainpage/WeeklyVibeRanking';
import LatestProjects from './mainpage/LatestProjects';
import VibeNews from './mainpage/VibeNews';

const HomePage = () => {
  return (
    <div className="group/design-root relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Top navigation bar */}
      <TopNav />
      
      {/* Main content area with sidebar and main content */}
      <div className="flex flex-1">
        {/* Left sidebar navigation */}
        <Navbar />
        
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