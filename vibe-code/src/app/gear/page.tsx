'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const GearPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Mock data for gear reviews
  const reviews = [
    {
      id: 1,
      title: "VS Code vs. Zed: 2024 Showdown",
      category: "IDEs",
      rating: 4.5,
      excerpt: "Is the new Rust-based editor a true contender? We compare performance, extensions, and the overall developer experience.",
      author: "@glitch_coder",
      date: "May 20, 2024",
      image: ""
    },
    {
      id: 2,
      title: "Keychron Q1 Pro: A Coder's Dream?",
      category: "Hardware",
      rating: 5,
      excerpt: "We put the popular mechanical keyboard through its paces. An in-depth look at build quality, switch feel, and programmability.",
      author: "@cyber_type",
      date: "May 18, 2024",
      image: ""
    },
    {
      id: 3,
      title: "SvelteKit vs. Next.js: The Verdict",
      category: "Frameworks",
      rating: 4,
      excerpt: "Performance, developer experience, and ecosystem. A comprehensive comparison for your next web project.",
      author: "@syntax_sorcerer",
      date: "May 15, 2024",
      image: ""
    },
    {
      id: 4,
      title: "Logitech MX Master 3S Review",
      category: "Hardware",
      rating: 4.5,
      excerpt: "The king of productivity mice? We analyze ergonomics, customization, and whether it's worth the premium price tag for developers.",
      author: "@pixel_pioneer",
      date: "May 12, 2024",
      image: ""
    },
    {
      id: 5,
      title: "Is Astro the Future of Content Sites?",
      category: "Frameworks",
      rating: 4,
      excerpt: "Exploring the island architecture of Astro and its impact on performance and SEO. A must-read for blog and portfolio builders.",
      author: "@dev_daemon",
      date: "May 10, 2024",
      image: ""
    },
    {
      id: 6,
      title: "Dell UltraSharp 4K Monitor Test",
      category: "Hardware",
      rating: 5,
      excerpt: "More screen real estate, more code. A detailed review of the U2723QE's color accuracy, connectivity, and value for coders.",
      author: "@cathode_ray",
      date: "May 08, 2024",
      image: ""
    }
  ];

  // Filter reviews based on active filter
  const filteredReviews = activeFilter === 'All' 
    ? reviews 
    : reviews.filter(review => review.category === activeFilter);

  // Function to render star rating
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="material-symbols-outlined filled text-[#f0f] text-shadow-neon-pink">
          star
        </span>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="material-symbols-outlined filled text-[#f0f] text-shadow-neon-pink">
          star_half
        </span>
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="material-symbols-outlined text-[#ad92c9]">
          star
        </span>
      );
    }
    
    return (
      <div className="flex items-center gap-1 mb-4 star-rating" title={`Rating: ${rating}/5`}>
        {stars}
        <span className="text-sm text-[#ad92c9] ml-2">({rating}/5)</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1122] text-white font-modern">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 flex-1 pt-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-retro text-shadow-neon cyber-heading">Gear Reviews</h2>
          <p className="text-xl text-[#ad92c9] mt-4 max-w-3xl mx-auto">
            Real-world reviews of the tools, tech, and hardware that power our code. No fluff, just facts from the community.
          </p>
        </div>
        <div className="mb-12 flex flex-wrap justify-center gap-4 font-retro text-lg">
          {['All', 'IDEs', 'Frameworks', 'Hardware'].map((filter) => (
            <button
              key={filter}
              className={`filter-btn px-6 py-2 rounded-md ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReviews.map((review) => (
            <div key={review.id} className="review-card bg-[#2c1a3b] rounded-lg overflow-hidden group flex flex-col glass-effect">
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold font-retro text-[#f0f] review-title-neon hover:text-shadow-neon-pink">
                    {review.title}
                  </h3>
                  <span className="font-retro text-sm bg-[#8013ec]/20 text-[#8013ec] px-2 py-1 rounded">
                    {review.category}
                  </span>
                </div>
                {renderRating(review.rating)}
                <p className="text-[#ad92c9] font-modern text-base leading-relaxed">
                  {review.excerpt}
                </p>
              </div>
              <div className="p-6 bg-black/20 border-t border-[#362348] flex justify-between items-center">
                <div className="text-sm text-[#ad92c9]">
                  <span>By <Link href="#" className="text-white hover:text-[#f0f] transition">@{review.author}</Link></span>
                  <span className="mx-2">|</span>
                  <span>{review.date}</span>
                </div>
                <Link href="#" className="font-retro text-[#f0f] hover:text-white transition-all">
                  Read More &gt;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="relative z-10 mt-24 text-center text-xs text-[#ad92c9]/50 p-4">
        <p>© 2024 Vibe Code. All rights reserved. System online.</p>
      </footer>
    </div>
  );
};

export default GearPage;