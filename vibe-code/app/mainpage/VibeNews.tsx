// VibeNews.tsx
// This component displays the latest news articles in the Vibe News section
"use client";

import React from 'react';

// Define the type for a news item
interface NewsItem {
  id: number;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  imagePosition: 'left' | 'right';
}

const VibeNews = () => {
  // Sample data for the news items
  const newsItems: NewsItem[] = [
    {
      id: 1,
      category: "Tech News",
      title: "Retro Revival: The Resurgence of 80s Aesthetics",
      description: "Explore how the vibrant colors and bold designs of the 80s are influencing today's technology and design trends.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvgUcL_hA91VNACmXmpqviDNTm2ghWGbTH6S1WJyTOl2ax0BPFZ9wJ9wnpj6ZGdzvEIm8sf9ZLUUWhyu2rHucrm5h72rhBaK8YzI82suQ809KrzZiY6-maXtPDtFFDOmEXOkYIPDP3Y8pmD2CaB_bDr7nn3SsjbnyLuuqWPBKZc5IHvLQn87OEv0UgHn67IRBxejoIelQpqmLt6RgnNMXn821bIXeN2rjqywMLlGomNqMuHzLu4D3aoRvJ3mRRtBL1WFfkH6Nx0w",
      imagePosition: "left"
    },
    {
      id: 2,
      category: "Community Spotlight",
      title: "Meet the Creator: Alex Turner's Journey",
      description: "An interview with Alex Turner, a developer known for their innovative projects that blend modern tech with retro aesthetics.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkZIXu3S3nKThhWpnsAAVfZfFNZuBDwRoe_56k_woEKe2rJbsS6h1vR-OFmnYa2pKXqMT0qUKbQF4VR3iZ22uCCuazva_mr7LiGR7ZrUeAtz7ubAIWqlaXq3OskF4tBN8ZvLvl8Qg6WOL5zy7u3ylaWWDc4dKhJWV_q92NfrwpzSkWWnQu_9H7NIl9_5drFxsk_WWqALtQ2aM1wjup2dqtsFWqQ-h365laHzHpEXYo9J8AYfKPKnyCkkjH2OhP9E9C81x_gi9Utg",
      imagePosition: "right"
    },
    {
      id: 3,
      category: "Tutorials",
      title: "Creating Glassmorphism Effects",
      description: "A step-by-step guide on implementing glassmorphism, a popular design trend that adds a frosted glass effect to UI elements.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeznZ5iJOdkhX5fAa-qPRRlFxKVv7QqxjEYC6dVaniryFqb3uUlDCnAVyJZAoqx8hD5BNaboewbLQ2OIpmjgsxbEHWfXvBeNO8HcXB6R8uUrqoseRIKVx9vioGFOxeINaIQJE-lRKjitJCM5JG7DG0rZe_M9deHdy-IFsaCLD6tkMuaI_f3f8DNIHyo7PSA0-QLmsMogFi0hjdCZZXr-b1vKS3rIiyGVmY14oFcfYYjNKHXvQNQSkDkcTLa5qoHgXbJ8yla2izMw",
      imagePosition: "left"
    }
  ];

  return (
    <div className="space-y-6 px-4 pb-8 pt-4 md:px-6 lg:px-8">
      {/* Section title */}
      <h2 className="text-2xl font-bold text-black dark:text-white">Latest Vibe News</h2>
      
      {/* Map through news items to create article cards */}
      {newsItems.map((item) => (
        <div 
          key={item.id} 
          className="overflow-hidden rounded-xl border border-primary/20 bg-background-light shadow-lg shadow-primary/10 dark:border-primary/30 dark:bg-background-dark"
        >
          {/* Article content with image */}
          <div className={`flex flex-col items-stretch gap-4 md:flex-row${item.imagePosition === 'right' ? '-reverse' : ''}`}>
            {/* Article text content */}
            <div className="flex-1 p-6">
              <p className="text-sm font-bold text-primary">{item.category}</p>
              <p className="my-1 text-lg font-bold text-black dark:text-white">{item.title}</p>
              <p className="text-sm text-black/60 dark:text-white/60">{item.description}</p>
            </div>
            
            {/* Article image */}
            <div 
              className={`w-full bg-cover bg-center md:w-1/3`} 
              style={{ backgroundImage: `url("${item.imageUrl}")` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VibeNews;