// NewsArticles.tsx
// This component displays the grid of news articles
"use client";

import React from 'react';
import NewsArticleCard from './NewsArticleCard';

const NewsArticles = () => {
  // Sample data for news articles
  const articles = [
    {
      id: 1,
      category: "AI & Machine Learning",
      title: "Breakthrough in Natural Language Processing: New Model Understands Context Like Never Before",
      excerpt: "Researchers have developed a revolutionary NLP model that demonstrates unprecedented understanding of context and nuance in human language, potentially transforming how we interact with AI systems.",
      author: "Tech Insights",
      date: "2024-07-15",
      readTime: "5 min read",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvgUcL_hA91VNACmXmpqviDNTm2ghWGbTH6S1WJyTOl2ax0BPFZ9wJ9wnpj6ZGdzvEIm8sf9ZLUUWhyu2rHucrm5h72rhBaK8YzI82suQ809KrzZiY6-maXtPDtFFDOmEXOkYIPDP3Y8pmD2CaB_bDr7nn3SsjbnyLuuqWPBKZc5IHvLQn87OEv0UgHn67IRBxejoIelQpqmLt6RgnNMXn821bIXeN2rjqywMLlGomNqMuHzLu4D3aoRvJ3mRRtBL1WFfkH6Nx0w"
    },
    {
      id: 2,
      category: "Web Development",
      title: "The Rise of Edge Computing: How It's Changing Web Application Architecture",
      excerpt: "Edge computing is revolutionizing how we build and deploy web applications, bringing processing power closer to users and dramatically reducing latency. We explore the implications for modern web developers.",
      author: "Web Weekly",
      date: "2024-07-12",
      readTime: "7 min read",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkZIXu3S3nKThhWpnsAAVfZfFNZuBDwRoe_56k_woEKe2rJbsS6h1vR-OFmnYa2pKXqMT0qUKbQF4VR3iZ22uCCuazva_mr7LiGR7ZrUeAtz7ubAIWqlaXq3OskF4tBN8ZvLvl8Qg6WOL5zy7u3ylaWWDc4dKhJWV_q92NfrwpzSkWWnQu_9H7NIl9_5drFxsk_WWqALtQ2aM1wjup2dqtsFWqQ-h365laHzHpEXYo9J8AYfKPKnyCkkjH2OhP9E9C81x_gi9Utg"
    },
    {
      id: 3,
      category: "UI/UX Design",
      title: "Glassmorphism 2.0: The Evolution of a Design Trend",
      excerpt: "Two years after glassmorphism took the design world by storm, we examine how the trend has evolved and where it's heading. Featuring interviews with leading designers and analysis of recent implementations.",
      author: "Design Digest",
      date: "2024-07-10",
      readTime: "6 min read",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeznZ5iJOdkhX5fAa-qPRRlFxKVv7QqxjEYC6dVaniryFqb3uUlDCnAVyJZAoqx8hD5BNaboewbLQ2OIpmjgsxbEHWfXvBeNO8HcXB6R8uUrqoseRIKVx9vioGFOxeINaIQJE-lRKjitJCM5JG7DG0rZe_M9deHdy-IFsaCLD6tkMuaI_f3f8DNIHyo7PSA0-QLmsMogFi0hjdCZZXr-b1vKS3rIiyGVmY14oFcfYYjNKHXvQNQSkDkcTLa5qoHgXbJ8yla2izMw"
    },
    {
      id: 4,
      category: "Cybersecurity",
      title: "Quantum Computing Threatens Current Encryption Methods: What Developers Need to Know",
      excerpt: "As quantum computers become more powerful, traditional encryption methods face unprecedented challenges. We break down the implications for software developers and explore quantum-resistant cryptography.",
      author: "Security Today",
      date: "2024-07-08",
      readTime: "8 min read",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMs4agmgsT_TySTlJ0Po4vO3Rw3U5qql7BaRSjQJR6J1zPy5M_KVRqY3CoXpPB5FNyt_vUl11Zp1xuIuKIO9IP2zs5nE6BOetqONJdPWeNNfo4mn7UosGiCioIyuA6COyv4-hvDPv_MCcsenfgqFlRvwMYPC3TGVMqY4rYKB-cZknd4YBFOhI4dd_K8d_DnGFfMW3D2Ui-fMLi-uOJ7IejzVK3JimGyaazHG1SI2h6r6cu-TpwwLIsKRLwS3UFQQOTx63xJhkYIPMm"
    },
    {
      id: 5,
      category: "Mobile Development",
      title: "The Future of Cross-Platform Development: Comparing Flutter, React Native, and SwiftUI",
      excerpt: "With multiple frameworks vying for dominance in cross-platform development, we compare the latest features, performance benchmarks, and developer experience of Flutter, React Native, and SwiftUI.",
      author: "Mobile Mag",
      date: "2024-07-05",
      readTime: "9 min read",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYhQ3HpLGyjGPkldMxBvSyTCn8CHLczONedvWGd6Rmcl29bqR6UcBPJKGbwxh08cS0fnmwFWoA7E9NMPqr8t3TdcR8yWASBssFjirD3H69GrciKA7VR2t31ssSCRiJtSOBpc3Eazc-_WOn12ePb5eO16Gr6Bh_MS_jp9fBkiDUHCzQlUX4JR_znmb7B3R4wHMwVVSx-6JXuK6GexEdS-qB6wgoL9majNQwakSEFf5kHJADLDh5z3xsQfKxrX1YJZZoAfLMXb7"
    },
    {
      id: 6,
      category: "Cloud Computing",
      title: "Serverless Architecture: Beyond the Hype",
      excerpt: "Serverless computing promises reduced operational overhead and automatic scaling, but is it always the right choice? We examine real-world use cases and potential pitfalls developers should be aware of.",
      author: "Cloud Chronicles",
      date: "2024-07-02",
      readTime: "6 min read",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWCd2y_WTUsSTKPboXp8QT7aTIiCBsECOjyob_c8MA5Zj65GiR2ghomAhLC-2nuBkdoc9fv3MVsdZbdVaYTg4OyhKeKe6tArUCwS6eEGYeygwK6KPqhJW7XvQR0gf5ltmepqBzv-LRxTy45CIs9dHfEog_FbF6ep23zHDmPg4sNwmyOm3TpcdcF5_EGmjufDLRQOWvtSQvcS1o-yQOznqRZncnlDmGFnUPWexMNP_Pm3_ULqwXrH9_BW87I8pycJwNqzt4fFg26g"
    }
  ];

  return (
    <div className="px-4 pb-8 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsArticleCard
            key={article.id}
            id={article.id}
            category={article.category}
            title={article.title}
            excerpt={article.excerpt}
            author={article.author}
            date={article.date}
            readTime={article.readTime}
            imageUrl={article.imageUrl}
          />
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
            1
          </button>
          <button className="px-4 py-2 rounded-lg bg-background-light dark:bg-background-dark text-black dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors">
            2
          </button>
          <button className="px-4 py-2 rounded-lg bg-background-light dark:bg-background-dark text-black dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors">
            3
          </button>
          <button className="px-4 py-2 rounded-lg bg-background-light dark:bg-background-dark text-black dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsArticles;