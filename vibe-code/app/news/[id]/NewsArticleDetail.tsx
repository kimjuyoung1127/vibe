// NewsArticleDetail.tsx
// This component displays the detailed view of a news article with source links and related news
"use client";

import React from 'react';
import Link from 'next/link';
import ExploreMoreSection from './ExploreMoreSection';
import RelatedNewsSection from './RelatedNewsSection';

const NewsArticleDetail = () => {
  // Sample article data
  const articleData = {
    id: 1,
    category: "AI & Machine Learning",
    title: "Breakthrough in Natural Language Processing: New Model Understands Context Like Never Before",
    author: "Tech Insights",
    publishDate: "July 15, 2024",
    readTime: "5 min read",
    sourceUrl: "https://techinsights.example.com/nlp-breakthrough-contextai",
    content: `
      <p>In a landmark development for artificial intelligence, researchers at a leading tech institute have unveiled a new natural language processing model that demonstrates an unprecedented understanding of context and nuance in human language. This breakthrough could transform how we interact with AI systems, making them more intuitive and human-like than ever before.</p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4 text-primary">The Technology Behind the Breakthrough</h2>
      
      <p>The new model, dubbed "ContextAI," builds upon transformer architecture but incorporates several novel techniques that allow it to maintain context over longer passages of text. Unlike previous models that often struggled with pronoun resolution and implicit references, ContextAI can track entities and relationships throughout an entire conversation or document.</p>
      
      <p>Dr. Sarah Chen, the lead researcher on the project, explains: "What sets ContextAI apart is its ability to create and maintain a dynamic knowledge graph as it processes text. This allows it to understand not just individual sentences, but the relationships between concepts across an entire document."</p>
      
      <div class="my-6 p-4 bg-[#1a1a2e] rounded-lg border-l-4 border-primary/30">
        <h3 className="text-lg font-semibold mb-2 text-primary">Key Features</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Context retention across documents up to 100,000 words</li>
          <li>98% accuracy in pronoun resolution</li>
          <li>Real-time entity relationship mapping</li>
          <li>Reduced hallucination by 75% compared to previous models</li>
        </ul>
      </div>
      
      <h2 className="text-2xl font-bold mt-8 mb-4 text-primary">Implications for Developers</h2>
      
      <p>For developers building conversational AI applications, this advancement could significantly reduce the complexity of context management. Instead of implementing complex state tracking mechanisms, developers can rely on the model's inherent ability to maintain context.</p>
      
      <p>The research team has also made the model available as an open-source project, with APIs for major cloud platforms expected to launch in the coming months. Early testing suggests that ContextAI performs well even with limited computational resources, making it accessible to a wide range of developers.</p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4 text-primary">Future Applications</h2>
      
      <p>The potential applications for this technology are vast. From more sophisticated chatbots and virtual assistants to automated content analysis and legal document processing, ContextAI could revolutionize several industries.</p>
      
      <p>One particularly promising application is in education, where the model could serve as a personalized tutor capable of understanding a student's learning context and adapting explanations accordingly. Early pilot programs in several universities have shown promising results, with students reporting improved comprehension and engagement.</p>
      
      <div class="my-6 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-primary/30">
        <h3 className="text-lg font-semibold mb-2 text-primary">Try It Yourself</h3>
        <p>To experiment with ContextAI:</p>
        <ol className="list-decimal pl-5 mt-2 space-y-1">
          <li>Visit the official GitHub repository</li>
          <li>Clone the project and follow the setup instructions</li>
          <li>Run the provided examples to see context retention in action</li>
          <li>Join the developer community to share your findings</li>
        </ol>
      </div>
      
      <p>As this technology continues to evolve, it will be exciting to see how developers leverage these capabilities to create more intuitive and helpful AI applications. The era of truly contextual AI may be closer than we think.</p>
    `,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvgUcL_hA91VNACmXmpqviDNTm2ghWGbTH6S1WJyTOl2ax0BPFZ9wJ9wnpj6ZGdzvEIm8sf9ZLUUWhyu2rHucrm5h72rhBaK8YzI82suQ809KrzZiY6-maXtPDtFFDOmEXOkYIPDP3Y8pmD2CaB_bDr7nn3SsjbnyLuuqWPBKZc5IHvLQn87OEv0UgHn67IRBxejoIelQpqmLt6RgnNMXn821bIXeN2rjqywMLlGomNqMuHzLu4D3aoRvJ3mRRtBL1WFfkH6Nx0w",
    authorImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCo5dNNwFjDMmEaYNb7-PDlp04IHGCJMRcz4Rwo9Pyic5p90ruulC9zF1g18xpoYIhOGYISILuXYAu1oAJZGVLKpxVjbJDHAvOmRfr-I73SXReDiLzutf-T0qacfoztxNpMVXvhws4tW-uAHpoGlerAZ8tpkYHNk7rWGl02fVSSld6yUHn1C7_7kXsTVu1Buhk5WPf37vHYuVYejj5BnhwBjps3nfW7pdddvO6G0GOkjajsZDBa5ANgmbp8k1v0EB2EyiBp1rSpVbPM"
  };

  // Sample related news data
  const relatedNews = [
    {
      id: 2,
      title: "The Rise of Edge Computing: How It's Changing Web Application Architecture",
      category: "Web Development",
      excerpt: "Edge computing is revolutionizing how we build and deploy web applications, bringing processing power closer to users and dramatically reducing latency.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkZIXu3S3nKThhWpnsAAVfZfFNZuBDwRoe_56k_woEKe2rJbsS6h1vR-OFmnYa2pKXqMT0qUKbQF4VR3iZ22uCCuazva_mr7LiGR7ZrUeAtz7ubAIWqlaXq3OskF4tBN8ZvLvl8Qg6WOL5zy7u3ylaWWDc4dKhJWV_q92NfrwpzSkWWnQu_9H7NIl9_5drFxsk_WWqALtQ2aM1wjup2dqtsFWqQ-h365laHzHpEXYo9J8AYfKPKnyCkkjH2OhP9E9C81x_gi9Utg"
    },
    {
      id: 3,
      title: "Glassmorphism 2.0: The Evolution of a Design Trend",
      category: "UI/UX Design",
      excerpt: "Two years after glassmorphism took the design world by storm, we examine how the trend has evolved and where it's heading.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeznZ5iJOdkhX5fAa-qPRRlFxKVv7QqxjEYC6dVaniryFqb3uUlDCnAVyJZAoqx8hD5BNaboewbLQ2OIpmjgsxbEHWfXvBeNO8HcXB6R8uUrqoseRIKVx9vioGFOxeINaIQJE-lRKjitJCM5JG7DG0rZe_M9deHdy-IFsaCLD6tkMuaI_f3f8DNIHyo7PSA0-QLmsMogFi0hjdCZZXr-b1vKS3rIiyGVmY14oFcfYYjNKHXvQNQSkDkcTLa5qoHgXbJ8yla2izMw"
    },
    {
      id: 4,
      title: "Quantum Computing Threatens Current Encryption Methods: What Developers Need to Know",
      category: "Cybersecurity",
      excerpt: "As quantum computers become more powerful, traditional encryption methods face unprecedented challenges.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMs4agmgsT_TySTlJ0Po4vO3Rw3U5qql7BaRSjQJR6J1zPy5M_KVRqY3CoXpPB5FNyt_vUl11Zp1xuIuKIO9IP2zs5nE6BOetqONJdPWeNNfo4mn7UosGiCioIyuA6COyv4-hvDPv_MCcsenfgqFlRvwMYPC3TGVMqY4rYKB-cZknd4YBFOhI4dd_K8d_DnGFfMW3D2Ui-fMLi-uOJ7IejzVK3JimGyaazHG1SI2h6r6cu-TpwwLIsKRLwS3UFQQOTx63xJhkYIPMm"
    }
  ];

  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      {/* Back button */}
      <div className="px-4 py-6">
        <Link 
          href="/news" 
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span>Back to News</span>
        </Link>
      </div>
      
      {/* Page header */}
      <div className="px-4 pb-6">
        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#161118] dark:text-[#f5f7f8] tracking-light text-[32px] font-bold leading-tight">
              {articleData.title}
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 dark:bg-primary/20 rounded-full">
                {articleData.category}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Author information and metadata */}
      <div className="flex px-4 pb-6 @container">
        <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
          <div className="flex gap-4">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-16 w-16"
              style={{ backgroundImage: `url("${articleData.authorImageUrl}")` }}
            ></div>
            <div className="flex flex-col justify-center">
              <p className="text-[#161118] dark:text-[#f5f7f8] text-[18px] font-bold leading-tight tracking-[-0.015em]">
                {articleData.author}
              </p>
              <p className="text-[#7c608a] dark:text-[#c5b3d1] text-base font-normal leading-normal">
                {articleData.publishDate} · {articleData.readTime}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 px-3 py-1 text-[#7c608a] dark:text-[#c5b3d1] hover:text-[#161118] dark:hover:text-[#f5f7f8] rounded-full hover:bg-primary/10 dark:hover:bg-primary/20">
              <span className="material-symbols-outlined">share</span>
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Article image */}
      <div className="@container mb-6">
        <div className="px-4">
          <div
            className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-white dark:bg-[#0f0f1a] rounded-lg min-h-80"
            style={{ backgroundImage: `url("${articleData.imageUrl}")` }}
          ></div>
        </div>
      </div>
      
      {/* Article content */}
      <div 
        className="px-4 pb-6 text-[#161118] dark:text-[#f5f7f8] prose max-w-none prose-headings:text-[#161118] dark:prose-headings:text-[#f5f7f8] prose-p:text-[#161118] dark:prose-p:text-[#f5f7f8] prose-strong:text-[#161118] dark:prose-strong:text-[#f5f7f8]"
        dangerouslySetInnerHTML={{ __html: articleData.content }}
      ></div>
      
      {/* Explore More Section */}
      <ExploreMoreSection sourceUrl={articleData.sourceUrl} />
      
      {/* Related News Section */}
      <RelatedNewsSection relatedNews={relatedNews} />
    </div>
  );
};

export default NewsArticleDetail;