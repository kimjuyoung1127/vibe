'use client';

import React from 'react';
import Link from 'next/link';
import type { Metadata, ResolvingMetadata } from 'next';

interface NewsArticle {
  id: number;
  title: string;
  author: string;
  publishDate: string;
  image: string;
  content: string;
}

import type { Metadata, ResolvingMetadata } from 'next';

const NewsArticlePage = ({ params }: any) => {
  // 임시 데이터 - 실제 구현에서는 Supabase에서 데이터를 가져와야 합니다.
  const article: NewsArticle = {
    id: parseInt(params.id),
    title: "Cyberpunk Aesthetics in Modern Coding",
    author: "Alex Mercer",
    publishDate: "January 15, 2024",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhFEt1rxA6R2SB5nFVuI-3CYjDAr6OLnEb7YVJQr6if0RQCsI8dlKmtDcFWtHpTPTpqNB0ALuatG39Kn33g8huZLZkVTQWZ1tJNDMe8w6ZrNpk0MUAXkUoc6MXHdA11Ly_bJDGic5R6NI9lsX6a9-kuyJEO86rua41CKcd4fhC7AcxzP7rK3OIE39lSZ3akpNcH2XdqyMCdbsZ20CvxegmvLWC_wseP9tGJPRwOgSl7r9_xNy6z-HFH0RXOVyoYh3qA2FgiupI584",
    content: `
      <p>In the neon-lit alleys of the digital city, where code flows like electric rivers, a new aesthetic has emerged, blending the futuristic allure of cyberpunk with the functional elegance of modern coding practices. This fusion, dubbed 'Cyberpunk Coding,' is more than just a visual style; it's a philosophy that embraces the gritty, high-tech, and often rebellious spirit of cyberpunk culture.</p>
      
      <p>Cyberpunk coding is characterized by its bold use of color, often featuring neon hues against dark backgrounds, reminiscent of the glowing signs and holographic displays of a futuristic metropolis. Fonts are typically monospaced, echoing the digital displays of classic cyberpunk media, and layouts are designed to be both visually striking and highly functional. The aesthetic extends beyond the code itself, influencing the entire development environment, from custom themes and plugins to the physical setup of the coder's workspace.</p>
      
      <p>But cyberpunk coding is not just about aesthetics; it also embodies the core values of the cyberpunk genre. It encourages a hacker mindset, emphasizing creativity, resourcefulness, and a willingness to challenge the status quo. Coders who embrace this style often seek to push the boundaries of technology, exploring new and unconventional approaches to problem-solving. They are drawn to projects that are innovative, disruptive, and have a touch of the subversive, reflecting the genre's themes of rebellion against corporate control and technological dystopia.</p>
      
      <p>The rise of cyberpunk coding reflects a broader trend in the tech industry, where developers are increasingly seeking to express their individuality and creativity through their work. In a field often perceived as purely technical, this aesthetic movement highlights the artistic and expressive potential of coding. It's a way for developers to not only build functional software but also to create immersive and visually engaging experiences, both for themselves and for the users of their creations.</p>
      
      <p>As technology continues to evolve, the cyberpunk aesthetic is likely to remain a significant influence in the coding world. Its blend of futuristic visuals, rebellious spirit, and emphasis on creativity resonates with a new generation of developers who see coding not just as a profession but as a form of artistic expression. In the neon-lit world of cyberpunk coding, the lines between technology and art blur, creating a vibrant and dynamic landscape where innovation and aesthetics go hand in hand.</p>
    `
  };

  return (
    <div className="min-h-screen bg-[#0D0A11] text-white bg-grid-pattern-animated">
      <div className="mx-auto max-w-4xl px-4 pt-0 pb-8 sm:px-6 lg:pb-16">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-[#8013ec]/80">
            <Link href="/news" className="hover:text-[#8013ec] transition-colors link-neon font-modern">Vibe News</Link>
            <span>/</span>
            <span className="text-[#ad92c9] font-modern">Article</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tighter text-white lg:text-5xl neon-text hover-glitch cyber-heading">
            {article.title}
          </h1>
          <p className="text-sm text-white font-modern">
            By {article.author} · Published on {article.publishDate}
          </p>
          <div 
            className="my-4 aspect-video w-full overflow-hidden rounded-xl bg-cover bg-center bg-no-repeat hover-glitch"
            style={{ backgroundImage: `url(${article.image})` }}
          ></div>
          <div 
            className="prose prose-lg max-w-none text-white font-modern glass-effect p-6 rounded-lg"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsArticlePage;