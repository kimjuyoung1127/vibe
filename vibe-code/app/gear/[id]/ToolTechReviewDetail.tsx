// ToolTechReviewDetail.tsx
// This component displays the detailed view of a tool/tech review
"use client";

import React, { useState } from 'react';
import BackButton from './BackButton';
import Header from './Header';
import AuthorInfo from './AuthorInfo';
import ReviewImage from './ReviewImage';
import ReviewContent from './ReviewContent';
import Tags from './Tags';
import CommentsSection from './CommentsSection';

const ToolTechReviewDetail = () => {
  const [isLiked, setIsLiked] = useState(false);
  
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  // Review data
  const reviewData = {
    id: 1,
    title: "RetroWave Syntax Theme for VS Code",
    category: "IDE Themes",
    author: "Alex Ryder",
    authorRole: "Full-stack Developer",
    publishDate: "July 15, 2024",
    lastUpdated: "July 20, 2024",
    readTime: "5 min read",
    tags: ["VS Code", "Themes", "Productivity", "Retro"],
    content: `
      <p>As developers, we spend countless hours staring at our code editors. Having a visually appealing and comfortable theme can significantly impact our productivity and overall well-being. Today, I want to share my experience with the RetroWave Syntax Theme for VS Code, a theme that brings the vibrant aesthetics of the 80s to your coding environment.</p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4 text-primary">First Impressions</h2>
      
      <p>From the moment I installed the RetroWave theme, I was transported back to the neon-soaked nights of the 80s. The theme features a dark background with vibrant pinks, purples, and blues reminiscent of classic synthwave aesthetics. The contrast is well-balanced, ensuring code remains readable while providing a visually stimulating environment.</p>
      
      <div class="my-6 p-4 bg-[#1a1a2e] rounded-lg border-l-4 border-primary/30">
        <h3 className="text-lg font-semibold mb-2 text-primary">Editor's Note</h3>
        <p>This theme pairs exceptionally well with the "Synthwave '84" icon theme, creating a cohesive retro-futuristic experience.</p>
      </div>
      
      <h2 className="text-2xl font-bold mt-8 mb-4 text-primary">Syntax Highlighting</h2>
      
      <p>The syntax highlighting is where this theme truly shines. Keywords pop with electric blue, strings glow with a warm pink hue, and comments are subtly displayed in a muted purple. Variables and functions have distinct colors that make them easily distinguishable at a glance. After using this theme for several weeks, I found my ability to parse code improved significantly.</p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4 text-primary">Customization Options</h2>
      
      <p>One of the standout features of the RetroWave theme is its extensive customization options. Users can adjust the intensity of the neon glow effects, toggle bold keywords, and even modify the background gradient. This flexibility ensures that the theme can be tailored to individual preferences while maintaining its core aesthetic.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div class="bg-[#0f0f1a] p-4 rounded-lg border border-primary/30">
          <h3 className="font-semibold mb-2 text-primary">Pros</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Vibrant, nostalgic color scheme</li>
            <li>Excellent contrast for readability</li>
            <li>Highly customizable</li>
            <li>Active community support</li>
          </ul>
        </div>
        <div class="bg-[#0f0f1a] p-4 rounded-lg border border-primary/30">
          <h3 className="font-semibold mb-2 text-primary">Cons</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>May be too bright for some users</li>
            <li>Not ideal for daytime coding</li>
            <li>Can be resource-intensive with glow effects</li>
          </ul>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mt-8 mb-4 text-primary">Performance Impact</h2>
      
      <p>While the visual effects are stunning, I was initially concerned about potential performance impacts. After extensive use, I found that the theme has a negligible effect on VS Code's performance. The glow effects are implemented efficiently and don't cause noticeable lag, even in large projects.</p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4 text-primary">Final Verdict</h2>
      
      <p>The RetroWave Syntax Theme successfully combines nostalgic aesthetics with practical functionality. It's a fantastic choice for developers who want to inject some personality into their coding environment without sacrificing usability. Whether you're a fan of 80s aesthetics or simply looking for a refreshing change from standard dark themes, I highly recommend giving RetroWave a try.</p>
      
      <div class="my-6 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-primary/30">
        <h3 className="text-lg font-semibold mb-2 text-primary">Try It Yourself</h3>
        <p>To install the RetroWave theme:</p>
        <ol className="list-decimal pl-5 mt-2 space-y-1">
          <li>Open VS Code</li>
          <li>Go to Extensions (Ctrl+Shift+X)</li>
          <li>Search for "RetroWave Syntax Theme"</li>
          <li>Click Install and apply the theme</li>
        </ol>
      </div>
    `,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMs4agmgsT_TySTlJ0Po4vO3Rw3U5qql7BaRSjQJR6J1zPy5M_KVRqY3CoXpPB5FNyt_vUl11Zp1xuIuKIO9IP2zs5nE6BOetqONJdPWeNNfo4mn7UosGiCioIyuA6COyv4-hvDPv_MCcsenfgqFlRvwMYPC3TGVMqY4rYKB-cZknd4YBFOhI4dd_K8d_DnGFfMW3D2Ui-fMLi-uOJ7IejzVK3JimGyaazHG1SI2h6r6cu-TpwwLIsKRLwS3UFQQOTx63xJhkYIPMm",
    authorImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCo5dNNwFjDMmEaYNb7-PDlp04IHGCJMRcz4Rwo9Pyic5p90ruulC9zF1g18xpoYIhOGYISILuXYAu1oAJZGVLKpxVjbJDHAvOmRfr-I73SXReDiLzutf-T0qacfoztxNpMVXvhws4tW-uAHpoGlerAZ8tpkYHNk7rWGl02fVSSld6yUHn1C7_7kXsTVu1Buhk5WPf37vHYuVYejj5BnhwBjps3nfW7pdddvO6G0GOkjajsZDBa5ANgmbp8k1v0EB2EyiBp1rSpVbPM",
    initialLikes: 24
  };

  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      {/* Back button */}
      <BackButton />
      
      {/* Page header */}
      <Header title={reviewData.title} category={reviewData.category} />
      
      {/* Author information and metadata */}
      <AuthorInfo 
        author={reviewData.author}
        authorRole={reviewData.authorRole}
        publishDate={reviewData.publishDate}
        lastUpdated={reviewData.lastUpdated}
        readTime={reviewData.readTime}
        authorImageUrl={reviewData.authorImageUrl}
        initialLikes={reviewData.initialLikes}
        onLike={handleLike}
        isLiked={isLiked}
      />
      
      {/* Review image */}
      <ReviewImage imageUrl={reviewData.imageUrl} />
      
      {/* Review content */}
      <ReviewContent content={reviewData.content} />
      
      {/* Tags */}
      <Tags tags={reviewData.tags} />
      
      {/* Comments section */}
      <div className="mt-12">
        <CommentsSection />
      </div>
    </div>
  );
};

export default ToolTechReviewDetail;