
import React from 'react';
import { Metadata } from 'next';
import Head from 'next/head';
import TopNav from './components/topnav';
import Navbar from './components/navbar';
import HeroSection from './mainpage/HeroSection';
import WeeklyVibeRanking from './mainpage/WeeklyVibeRanking';
import LatestProjects from './mainpage/LatestProjects';
import VibeNews from './mainpage/VibeNews';
import StructuredData from './components/StructuredData';

// Define the metadata for the page
export const metadata: Metadata = {
  title: 'Vibe Hub - A Developer Community for Creative Coding',
  description: 'A community website for developers who value the "vibe coding" and environment of coding, featuring modern retro pop art style. Share projects, reviews, and connect with like-minded developers.',
  openGraph: {
    title: 'Vibe Hub - A Developer Community for Creative Coding',
    description: 'A community website for developers who value the "vibe coding" and environment of coding, featuring modern retro pop art style.',
    type: 'website',
    url: 'https://www.vibehub.dev',
  },
  alternates: {
    canonical: 'https://www.vibehub.dev',
  },
};

const HomePage = () => {
  // Breadcrumb data for structured data
  const breadcrumbData = {
    type: 'BreadcrumbList' as const,
    data: {
      breadcrumbs: [
        { name: 'Home', url: 'https://www.vibehub.dev/' },
      ],
    },
  };

  // Website data for structured data
  const websiteData = {
    type: 'WebSite' as const,
    data: {
      name: 'Vibe Hub',
      url: 'https://www.vibehub.dev',
      description: 'A community website for developers who value the "vibe coding" and environment of coding, featuring modern retro pop art style.',
      publisher: {
        '@type': 'Organization',
        name: 'Vibe Hub',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.vibehub.dev/logo.png', // Replace with actual logo path
        },
      },
    },
  };

  return (
    <>
      <Head>
        <title>Vibe Hub - A Developer Community for Creative Coding</title>
        <meta name="description" content="A community website for developers who value the 'vibe coding' and environment of coding, featuring modern retro pop art style. Share projects, reviews, and connect with like-minded developers." />
        <meta name="keywords" content="developer community, vibe coding, creative coding, programming, tech reviews, project showcase, developer tools" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.vibehub.dev" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.vibehub.dev" />
        <meta property="og:title" content="Vibe Hub - A Developer Community for Creative Coding" />
        <meta property="og:description" content="A community website for developers who value the 'vibe coding' and environment of coding, featuring modern retro pop art style." />
        <meta property="og:image" content="https://www.vibehub.dev/og-image.png" /> {/* Replace with actual image path */}
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.vibehub.dev" />
        <meta property="twitter:title" content="Vibe Hub - A Developer Community for Creative Coding" />
        <meta property="twitter:description" content="A community website for developers who value the 'vibe coding' and environment of coding, featuring modern retro pop art style." />
        <meta property="twitter:image" content="https://www.vibehub.dev/twitter-image.png" /> {/* Replace with actual image path */}
      </Head>
      
      {/* Structured Data */}
      <StructuredData data={breadcrumbData} />
      <StructuredData data={websiteData} />
      
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
    </>
  );
};

export default HomePage;