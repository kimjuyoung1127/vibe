'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Thread {
  id: number;
  author: string;
  authorAvatar: string;
  postedTime: string;
  title: string;
  content: string;
  comments: number;
  views: number;
}

function CommunityPage() {
  const [newPost, setNewPost] = useState('');

  // 임시 데이터 - 실제 구현에서는 Supabase에서 데이터를 가져와야 합니다.
  const threads: Thread[] = [
    {
      id: 1,
      author: "@glitch_coder",
      authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHbikFONo1Rz5GndBoQVAQ7oV2p7vAdboPuMGfVyrmqhEu7JPPxmVwAVMIPk2qo6rWO5jRh-dfmuxz28XuSi8wy94Kyncq5uJShcjtcHN2WQPkqM6hlPp4_FDsiVm4vBGbpwKC9rzeujt4h2IAD8cXv0kdFbTmEKDDzOeb6OhnDejS9t-Be8rIbvMHD3hQQYpu6sFasiWkyzU_-K0ij3nR5XTPP-9rqFh1ygA9LGYR1TV85rezhQY6txj1g9c4Nce36Pd2ojuGmRU",
      postedTime: "2 hours ago",
      title: "Show me your terminal setup! What's your go-to shell and prompt?",
      content: "I'm currently running zsh with Oh My Zsh and the Powerlevel10k theme. It's solid, but I'm always curious to see what other people are using. Any hidden gems out there for prompts or useful plugins?",
      comments: 12,
      views: 142
    },
    {
      id: 2,
      author: "@syntax_sorcerer",
      authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4VxxVR1-TOKH7FzYXOujG-HjqJ27RqLItfOoZjCvwjoNJz55NqCk_asrIcRUXrlK-fw6FRS9uE5R2oEsn5jIa2QghuY6enZ-IjGEFXAXUJ2xVF-SKegR9O00MXKVrOIdBESKt1BwlJ28eNc4bPWFyKHPWsA9ST-RVtyXyvZLbtIlv3SeijHpuUwgK9M-B_0TZ02CWO4jrzBu9yg2OrC-HYB0LXOxGEdJwUrviV5Ld5Med71Y02yhSdzPgfdCMRL7ywDiysM9kOVA",
      postedTime: "8 hours ago",
      title: "Hot take: CSS is the most underrated programming language. Change my mind.",
      content: "With container queries, has(), and all the new color functions, modern CSS is incredibly powerful. I feel like it doesn't get the respect it deserves from the \"pure\" programming crowd. What do you think?",
      comments: 28,
      views: 310
    },
    {
      id: 3,
      author: "@cyber_type",
      authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvpGqlyei7p00oZVsHls0a095rZl90m1xDStbL9FxMJBA2p_Z-6-XAh3lysvuVDi4QkXATsnLZxGCyLfep8K0oRkkGePXScy2cTvjiv6moQSmADtbChwIT12La-ZAWcMzCX92IW-Wa7ay0cYHcENIrpOyQ9Pnxxde5OFV01NcIjU099n_1czvj5ptPJZNmZ1MMT5hXGy56afzRHtQffFNsrXVekLfwIBRiw4hrI0gJTFYfR3wQ2NJNj9Af9OqY5HDAiyfzTyuprtQ",
      postedTime: "yesterday",
      title: "What non-tech hobbies do you have that help you with coding?",
      content: "For me, it's playing music. The patterns, the practice, the creative problem solving... it all feels very connected to writing code. Curious to hear what other passions fuel your developer brains.",
      comments: 5,
      views: 98
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 구현에서는 여기서 새 게시물을 생성하는 로직이 필요합니다.
    console.log('New post:', newPost);
    setNewPost('');
  };

  return (
    <div className="min-h-screen bg-[#0D0A11] text-white bg-grid-pattern-animated">
      <div className="mx-auto max-w-5xl px-4 pt-0 pb-8 sm:px-6 lg:pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-retro text-white neon-text mb-4">The Grid</h1>
          <p className="text-xl text-white max-w-3xl mx-auto font-modern">
            A free-form space for the community. Share your thoughts, ask questions, or just hang out.
          </p>
        </div>
        
        {/* New Post Form */}
        <div className="glass-effect rounded-lg p-6 mb-8 border border-[#362348]">
          <h2 className="font-retro text-2xl text-[#00ffe0] text-shadow-neon-cyan mb-4">Start a New Discussion &gt;&gt;</h2>
          <form onSubmit={handleSubmit}>
            <textarea 
              className="w-full p-4 rounded-md bg-[#1c102a] border border-[#362348] text-white font-modern text-base focus:outline-none focus:border-[#8013ec] focus:shadow-neon-glow-cyan focus:bg-[#2c1a3b] transition-all"
              placeholder="What's on your mind, developer?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              rows={4}
            />
            <div className="flex justify-end mt-4">
              <button 
                type="submit"
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-6 bg-[#8013ec] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-all neon-glow btn-neon font-heading gap-2"
              >
                <span className="material-symbols-outlined">send</span>
                Post
              </button>
            </div>
          </form>
        </div>
        
        {/* Threads */}
        <div className="space-y-6">
          {threads.map((thread) => (
            <div 
              key={thread.id} 
              className="glass-effect rounded-lg p-6 border border-[#362348] hover:border-[#ff00ff] transition-all hover:neon-glow-pink"
            >
              <div className="flex items-start gap-4">
                <img 
                  alt={`Avatar of ${thread.author}`} 
                  className="h-12 w-12 rounded-full border-2 border-[#8013ec]" 
                  src={thread.authorAvatar} 
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-bold text-lg text-[#ff00ff]">
                      <Link href="#" className="hover:underline">{thread.author}</Link>
                      <span className="text-sm font-modern text-white ml-2">posted {thread.postedTime}</span>
                    </p>
                    <div className="flex items-center gap-4 text-white font-retro">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">forum</span> {thread.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">visibility</span> {thread.views}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold font-modern text-white mb-3">
                    <Link href="#" className="hover:text-[#00ffe0] transition-colors">
                      {thread.title}
                    </Link>
                  </h3>
                  <p className="text-[#ad92c9] leading-relaxed font-modern">
                    {thread.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;