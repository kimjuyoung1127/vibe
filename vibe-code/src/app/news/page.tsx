'use client';

import React from 'react';
import Link from 'next/link';

interface NewsArticle {
  id: number;
  title: string;
  description: string;
  image: string;
}

const NewsPage = () => {
  // 임시 데이터 - 실제 구현에서는 Supabase에서 데이터를 가져와야 합니다.
  const newsArticles: NewsArticle[] = [
    {
      id: 1,
      title: "The AI Revolution: What's Next?",
      description: "A deep dive into the latest breakthroughs in generative AI, and how they're reshaping the developer landscape. From code generation to automated testing.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuChVLAUu1JgJjxCqLhhj8TslSIfU5aqE8A112RjwugLtyH01TrkyZigXASL__e1zfEzOVLxGV3gvagS8nXvbnfEZG7gSuNjNOeZuWprJ3NBZBJLzR7re3Hfd4FKlGmB0m7RBzSOW1k8F6yYLap3nCMPIu4mkTapGQseRatY4YM1tdzndIj9QRAC8BIZOvjypx0FHADfnoa-XMeGjOI0dSsft3mHqTf6TJyclJYskIa9r0n4oFMgfQMFOUCFz_t2kPW5MSONspHyY9Y"
    },
    {
      id: 2,
      title: "Quantum Computing: Hype vs. Reality",
      description: "Is quantum computing finally within reach for mainstream applications? We explore the current state of the technology and its potential impact on cryptography and science.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtzkjKknXPFdURlW8fRc0Cwsu8ZXZekrIM-vPh-G1Uj1VcAyumn4nslI9lw7dZnJp37UXb2hdsFpPaTpoLwevgGaGdWQSaTy5vm9B-kJV2a-Z08xs0V_Sd-2QsTEgNmQeTR9Ti87smsASUB7BySfoPmWLc4YZvdUv4bztW18WyS1gjSqEWq_GnCmVzQ1UnZ96k4LuyRoGrf5LQ5JkEps2MgL34ptXeE-bPDejGY7N-Ba3U6Fkt4bMxvAOPe8BVvsubZtVhZj_HBbc"
    },
    {
      id: 3,
      title: "The Rise of WebAssembly",
      description: "Beyond the browser: how WebAssembly (Wasm) is enabling near-native performance for web applications and expanding to server-side and edge computing.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA845sztz1ESjZOuXDCzwYZNGfFRRpz9gKvuH7kHd1yGNMr95DY-i7LqAp_igBVNvOdf8_jJLA6PDF36XnFqCFco9hPQHCGudmzC3s3ntSSFdHhMtiRgtu87hN4atK_qtxStacTJesLe7tAdcElfaXlqA_CGrxhUQgpPrSLP2pnSfypkSQ_DpnmuHyKjSUdMUEShHeQjJ0ZmNM-v2jmulOK5_s6nKLtzPRxGBYFKyCvUOQgfzq_M1HRjiwYJIwHGRWNTOqjrvhftA8"
    },
    {
      id: 4,
      title: "Cybersecurity in a Post-AI World",
      description: "As AI tools become more sophisticated, so do cyber threats. Discover the emerging trends in AI-driven security and how to protect your projects from new vulnerabilities.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtIGR_PyzBTbq_L0DhVm-eQKV1NS-J3d78uyBxLHADqhqyLNIj0EEc1exdu0KbWj5w-NykVghW0Ot7tfNcTVmnOzb370nREWSakYpp2_wXU3NgQrIY-7ihK9xHBmB9mwjiOkkSwbQsOOp7p7F7oUrmC7IR35PAlu6E19wc8zwIYhgoPDInOLP7uEe6X5SY83ZdvLeXveTp6YD-yfgQ297gG52hnOLwzw92YASbqKiWJct4jyca40tR-qlVHu9jsk9c10T9bzuE3Gs"
    },
    {
      id: 5,
      title: "Spatial Computing & The Metaverse",
      description: "Exploring the next generation of user interfaces. How AR and VR are converging to create immersive digital experiences, and what it means for developers.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1EORHMvFI_TYez1y2EjNv9ma36Ntc-o9VyaCOiZef7qHpD9JRFQD36F5ZBYI2Sg7bJY7IP7ABd5KxCjty5VGMuQsULtioLO0VJPhIPHAQ3OmQUud1uKiRPoUo7GJhhy7azB34TyDxpIySL0XlP076mzJluVcynGQNZvrUtQx9bAk1BpUZQjIqBxVeOFh_1xWYLZEIdsW54Rpi2PHM6f1miyF_caxm_qe14TgxFdYMpGEQa2qkW_qllSczVGBJ7a8TnO7-3Kfle-o"
    },
    {
      id: 6,
      title: "The Future of Developer Experience",
      description: "From cloud-based development environments to AI-powered pair programmers, we look at the tools and platforms that are redefining how we code and collaborate.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcdS_Y4l3O1AdnT9tRnVRfAbp4s9OijaIf6NDMFf8LzepvUFpvOCiKEOwNwpi5_gYP81KFz3Qxkmuo_hdC-XttFpGtl2ftXV8ysgiVJS4fs-xiL6EFrqLX1FN9Jrpagl2NHxhZPIMaCoQufVUbaNcY1jGrvOrG800X8LI7OK_ailtfdF5-oZLejuE2cbov1lp6H_rQ1QffPln8y1mg2E1tE5c7WCV9AO0z159FfMDCOVzS9g8Ax9wkp3kmZJdYsq4NfOleT3xcvtE"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0D0A11] text-white bg-grid-pattern-animated">
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-0 pb-12">
        <div className="text-center mb-16 glass-effect rounded-lg p-8">
          <h1 className="text-4xl md:text-5xl font-retro text-white neon-text mb-4 hover-glitch cyber-heading-retro">Tech Pulse</h1>
          <p className="text-xl text-white max-w-2xl mx-auto font-modern">
            The latest AI and tech trends, curated for the Vibe Code community. Stay ahead of the curve.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article) => (
            <Link 
              href={`/news/${article.id}`} 
              key={article.id}
              className="block article-card bg-[#2c1a3b] rounded-lg overflow-hidden group border border-[#362348] hover:border-[#8013ec] transition-all duration-300 hover:neon-glow card-neon glass-effect-strong"
            >
              <div className="w-full h-48 bg-center bg-no-repeat bg-cover opacity-80 group-hover:opacity-100 transition-opacity hover-glitch" 
                   style={{ backgroundImage: `url(${article.image})` }}></div>
              <div className="p-6">
                <h2 className="text-2xl font-bold font-retro text-white mb-2 group-hover:text-shadow-neon transition-all hover-glitch cyber-heading-retro">
                  {article.title}
                </h2>
                <p className="text-white font-modern text-base leading-relaxed">
                  {article.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;