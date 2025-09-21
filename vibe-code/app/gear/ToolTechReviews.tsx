// ToolTechReviews.tsx
// This component displays the grid of tool/tech reviews
"use client";

import React from 'react';
import ToolTechReviewCard from './ToolTechReviewCard';

const ToolTechReviews = () => {
  // Sample data for tool/tech reviews
  const reviews = [
    {
      id: 1,
      title: "RetroWave Syntax Theme for VS Code",
      category: "IDE Themes",
      description: "A vibrant syntax theme that brings the aesthetics of the 80s to your coding environment with neon colors and synthwave-inspired design.",
      author: "Alex Ryder",
      date: "2024-07-15",
      rating: 5,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMs4agmgsT_TySTlJ0Po4vO3Rw3U5qql7BaRSjQJR6J1zPy5M_KVRqY3CoXpPB5FNyt_vUl11Zp1xuIuKIO9IP2zs5nE6BOetqONJdPWeNNfo4mn7UosGiCioIyuA6COyv4-hvDPv_MCcsenfgqFlRvwMYPC3TGVMqY4rYKB-cZknd4YBFOhI4dd_K8d_DnGFfMW3D2Ui-fMLi-uOJ7IejzVK3JimGyaazHG1SI2h6r6cu-TpwwLIsKRLwS3UFQQOTx63xJhkYIPMm"
    },
    {
      id: 2,
      title: "Neonify UI Theme for VS Code",
      category: "UI Themes",
      description: "Transform your VS Code interface with this sleek neon-themed UI that complements any syntax highlighting scheme.",
      author: "Taylor Swift",
      date: "2024-07-10",
      rating: 4,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYhQ3HpLGyjGPkldMxBvSyTCn8CHLczONedvWGd6Rmcl29bqR6UcBPJKGbwxh08cS0fnmwFWoA7E9NMPqr8t3TdcR8yWASBssFjirD3H69GrciKA7VR2t31ssSCRiJtSOBpc3Eazc-_WOn12ePb5eO16Gr6Bh_MS_jp9fBkiDUHCzQlUX4JR_znmb7B3R4wHMwVVSx-6JXuK6GexEdS-qB6wgoL9majNQwakSEFf5kHJADLDh5z3xsQfKxrX1YJZZoAfLMXb7"
    },
    {
      id: 3,
      title: "Glassmorphism Terminal Theme",
      category: "Terminal Themes",
      description: "A collection of terminal themes featuring the popular glassmorphism effect, perfect for modern retro setups.",
      author: "Jordan Lee",
      date: "2024-07-05",
      rating: 5,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDH1V5tXCF55MHTdxHWdmzpF0ekEnW8LPzYx_cJAZ3X0BKMEHYkWUJmo9uZmuLRjgh8xF7tq7VSrf5K5_3_Gx2-N4_iUQDMlojfKry4McWTqxBazzUfHA6VSxJEGqzvDXId5VQoTCRWGCavL11fl_qRJNRKD1F9Q7PHpnaKL14gp_GNpmMCYpB4veX_JqU_O7zeeSl61C_XC6IwyqSBJs5xEXj5y5lhaucoZSqF_k9l"
    },
    {
      id: 4,
      title: "Synthwave Icon Pack",
      category: "IDE Icons",
      description: "A complete set of retro-futuristic icons for your file explorer, designed to match synthwave aesthetics.",
      author: "Casey Smith",
      date: "2024-06-28",
      rating: 4,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkDnDfJQ8K8fJZJ1nF0bQJQ9q1Z8nF0bQJQ9q1"
    },
    {
      id: 5,
      title: "RetroGrid Backgrounds",
      category: "Desktop Themes",
      description: "A collection of animated grid backgrounds inspired by classic cyberpunk aesthetics for your desktop.",
      author: "Riley Jones",
      date: "2024-06-22",
      rating: 5,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWCd2y_WTUsSTKPboXp8QT7aTIiCBsECOjyob_c8MA5Zj65GiR2ghomAhLC-2nuBkdoc9fv3MVsdZbdVaYTg4OyhKeKe6tArUCwS6eEGYeygwK6KPqhJW7XvQR0gf5ltmepqBzv-LRxTy45CIs9dHfEog_FbF6ep23zHDmPg4sNwmyOm3TpcdcF5_EGmjufDLRQOWvtSQvcS1o-yQOznqRZncnlDmGFnUPWexMNP_Pm3_ULqwXrH9_BW87I8pycJwNqzt4fFg26g"
    },
    {
      id: 6,
      title: "Vaporwave Color Palette Generator",
      category: "Design Tools",
      description: "Generate harmonious color palettes inspired by vaporwave aesthetics for your projects and designs.",
      author: "Morgan Lee",
      date: "2024-06-18",
      rating: 4,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWDmIQOhYUQTTR1YTHFTnisyjApD96trEoMF7oenlE4gi46DXUnz5QDD3uQK7HHoOobgIdQ4gu_8ryy639q8m32p0el26Budv6Z7iYCd9NSx2Kj5_WpmjAKwQQU53j_0q9EO3yY5w-wMHCoZ9KarGKzcYkwBMEISfsSDNv4u7xzjpIj-uDDC0gCA-nUYIsRhyceiRIAnX31EOVBdG0CqyCu9mNh_Wg3duLeijtUxsGojbNtwqDCbqkfbwY02T5_eyu8Ix5HvQu6bKs"
    }
  ];

  return (
    <div className="px-4 pb-8 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <ToolTechReviewCard
            key={review.id}
            id={review.id}
            title={review.title}
            category={review.category}
            description={review.description}
            author={review.author}
            date={review.date}
            rating={review.rating}
            imageUrl={review.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default ToolTechReviews;