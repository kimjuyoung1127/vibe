// WeeklyVibeRanking.tsx
// This component displays the weekly ranking of projects based on likes
"use client";

import React from 'react';

// Define the type for a ranking item
interface RankingItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const WeeklyVibeRanking = () => {
  // Sample data for the ranking items
  const rankingItems: RankingItem[] = [
    {
      id: 1,
      title: "Project: RetroWave Visualizer",
      description: "A dynamic visualizer with retro-inspired effects.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBs18yizH0eESsbdhR-TRX5nKfpHROcAhJRI2PeKouRxFPeuBQu-sx9sINnWqpVrSOnD9ULkjSzj3NM2iblt3IFrVfwoW5KfTSaGw3Q6DwXL6Gc3VoJm8A5Xj4b5QCicrH6tUVLzkr5hSYe4s7LXm-_zW0TQb7hCsWAcXkQ8HIvJ46Po4hNDftLxVJ4EnEB35rBjMhCW0WOd_hpzlTlo2USb8bGv22cWua-VP1bCJPhqVMhygGwndSZ-vl8M2CdOLrQJXoX7dpekA"
    },
    {
      id: 2,
      title: "Project: Neon City Generator",
      description: "Generate stunning neon cityscapes with customizable parameters.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-tjs1JzcxR0lCeTqzFOpKj5OhumRFKZxthg6K5u5g-oV_FvBP_8hlNlxjyzhfXSA9m0gm_O2Z8wfcS7cqq2K2b8JhbygqUu76ACWOzI9AugaOVxM4M6q3mwz31du169N7lFClakMA6IYgnuEDdUIWmKWNo6nDTAf2-MTGUTr9ZjaecCpqsWbKO9I6xOTT85Vzp0pTPNad-HV08sXXOXtaFYVNyPJhoi4iK0BUxA2EF3mMnCWRhH6HcaRZ1Rrfwo_PeUO5xJ1KNA"
    },
    {
      id: 3,
      title: "Project: Pixel Art Editor",
      description: "Create and edit pixel art with a user-friendly interface.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2mJDjK6aDgMHJu9ql5pzC2ogsyOkRQigrkDjUu095YR0n0ZqBwcw4B2YiEZpB7jB9hVycj0kL8VPkvKNEfE6lBrISQ0_cVPS1rqunIlGzcj6WC8RFEOX5PqSHyTIXSjydidB40PaQE5Ikj7AvhqeJhdrNuOGysCP9UGsyqJeaba9CZ4SK92Mvm8yg9Ep0YNlCG2-Ka_Tc_d7YUCMrOsFRczIxpSkLk9sQXVIXxiRiIvejQmBuSKUiOQEcEIg2P98uXstluyP-Dg"
    }
  ];

  return (
    <div className="px-4 pb-6 pt-4 md:px-6 lg:px-8">
      {/* Section title */}
      <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">Weekly Vibe Ranking</h2>
      
      {/* Horizontal scrollable container for ranking items */}
      <div className="flex gap-6 overflow-x-auto pb-4 [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Map through ranking items to create cards */}
        {rankingItems.map((item) => (
          <div 
            key={item.id} 
            className="flex w-72 flex-shrink-0 flex-col gap-3 rounded-xl border border-primary/20 bg-background-light p-3 shadow-lg shadow-primary/10 transition-all hover:border-primary/40 hover:shadow-primary/20 dark:border-primary/30 dark:bg-background-dark dark:hover:border-primary/50"
          >
            {/* Project image */}
            <div 
              className="aspect-video w-full rounded-lg bg-cover bg-center" 
              style={{ backgroundImage: `url("${item.imageUrl}")` }}
            ></div>
            
            {/* Project information */}
            <div>
              <p className="font-bold text-black dark:text-white">{item.title}</p>
              <p className="text-sm text-black/60 dark:text-white/60">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyVibeRanking;