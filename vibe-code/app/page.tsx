
// page.tsx
// This is the main home page
"use client";

import React from 'react';
import HeroSection from './mainpage/HeroSection';
import WeeklyVibeRanking from './mainpage/WeeklyVibeRanking';
import LatestProjects from './mainpage/LatestProjects';
import VibeNews from './mainpage/VibeNews';

const HomePage = () => {
  return (
    <>
      {/* Hero section */}
      <HeroSection />
      
      {/* Weekly Vibe Ranking section */}
      <WeeklyVibeRanking />
      
      {/* Latest Projects section */}
      <LatestProjects />
      
      {/* Vibe News section */}
      <VibeNews />
    </>
  );
};

export default HomePage;