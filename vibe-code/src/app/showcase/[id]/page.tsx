'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

interface Comment {
  id: number;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
}

const ShowcaseDetailPage = () => {
  const { session } = useAuth();
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Sarah Walker",
      authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBriRgbcmjHlFctAk61O-bSeMm1EnbfWjs81fyjInRuKBpkdk_VixHeY24TBWLttq_a6sDSR_etLTeW1De_UAKvzTzeXWLV6LyR4I6e_INUVq44hRapWtrHjMj_TwCdyAdMlGmzu5txh2GKVv59Xb-ckytMRbrdxuk3x5vqT8Dz4MuAJ83l7Livq4HmyEzcWrfBjo_-hh0xaIgMAGdNnHyamtxvCZ0OrP_2V1klo6MvxjUZfMhalTw8slBg5DQ6Q3QcLoIfy4Gunh4",
      content: "This project is absolutely stunning! The neon effects are mesmerizing, and the overall design is incredibly polished. I'm particularly impressed with the user authentication system. Great work!",
      timestamp: "1 day ago"
    },
    {
      id: 2,
      author: "Mark Johnson",
      authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXR9Y-M-2D87aGIZcAu9YJBN3VRCZraYcwWAEh8to1xR_TmW2X3RfZlqJuah2ao-C1drzjxRsG49j2zV_GzfwaJYCMUSVgDVGAKtBjhwfUkVcuB4ATa_qW3LjWsfMmHh6DHKy8aKiAA23iW0vJOGLx5KTLYyH6PVBM5NH6n9v9QRs77y1Gw-mVp3kWRh4ypLcq9OdotzaG70XPw_h1v_tGBwELBVbtyD6VaIVa6kKvHauKblOwbMNITCcOYPH0q--62MikjMQZamU",
      content: "I love the cyberpunk theme! It's so well executed. The project gallery is a fantastic feature, and I can't wait to see more projects from the community. Keep up the excellent work!",
      timestamp: "2 days ago"
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState(123); // 초기 좋아요 수
  const [userLiked, setUserLiked] = useState(false); // 사용자가 좋아요를 눌렀는지 여부

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    
    const comment: Comment = {
      id: comments.length + 1,
      author: "Current User", // 실제 구현에서는 session에서 사용자 정보를 가져옵니다.
      authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYM88q9iAc_iyKD_S0kYi-dm0KQoo_efkCN_cM2tkgjUHuhmPqx5zUR-HpGFAIOCpzzWP9N253DN_R-2HBAuB92lNQpRDceC5KxIF2Qvl1qji3J0fozi6j_WnrAzxmRzArEG-L9XzJPJZtFOEpiDX7IYuvssDXkQwa012S3YyH9I6MF4T1mvIMCTKwZF9rF8Gyrq_XDMw3JbFb-DdwadaHNxbPNVstGAOhgV_4KdlYW0TJubsak-5aF9bVKd4bHu692np-RpaoHP4",
      content: newComment,
      timestamp: "Just now"
    };
    
    setComments([...comments, comment]);
    setNewComment('');
  };

  const handleLike = () => {
    if (userLiked) {
      setLikes(likes - 1);
      setUserLiked(false);
    } else {
      setLikes(likes + 1);
      setUserLiked(true);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[var(--background-color)] text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="text-sm text-[var(--secondary-color)]">
              <a className="hover:text-[var(--primary-color)]" href="#">Showcase</a>
              <span className="mx-2">/</span>
              <span>Project Title: Neon Dreams</span>
            </span>
          </div>
          <article className="bg-[var(--surface-color)] rounded-lg shadow-lg shadow-[var(--primary-color)]/10">
            <div className="p-6 md:p-8">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Project Title: Neon Dreams</h2>
              <p className="text-[var(--secondary-color)] text-sm mb-6">Posted by <a className="font-medium text-white hover:text-[var(--primary-color)]" href="#">Alex Ryder</a> · 2 days ago</p>
              <div className="markdown-content text-gray-300">
                <p>Neon Dreams is a project that explores the fusion of retro aesthetics with modern web development techniques. It's a showcase of vibrant colors, dynamic animations, and interactive elements, all wrapped up in a cyberpunk theme. The project utilizes React for the frontend, Node.js for the backend, and MongoDB for data storage. Key features include a user authentication system, a project gallery, and a community forum where users can share their own creations and feedback.</p>
                <blockquote className="border-l-4 border-[var(--primary-color)] pl-4 my-4 text-[var(--secondary-color)] italic">"The future is already here – it's just not evenly distributed." - William Gibson</blockquote>
                <p>We drew a lot of inspiration from cyberpunk classics to create an immersive experience.</p>
                <h3 className="text-xl font-bold mt-6 mb-3">Tech Stack</h3>
                <ul className="list-disc pl-6 mb-4">
                  <li>React</li>
                  <li>Node.js</li>
                  <li>MongoDB</li>
                  <li>Tailwind CSS</li>
                </ul>
                <div className="terminal-block mt-6">
                  <div className="terminal-header">
                    <div className="terminal-dot bg-red-500"></div>
                    <div className="terminal-dot bg-yellow-500"></div>
                    <div className="terminal-dot bg-green-500"></div>
                  </div>
                  <pre className="!p-0 !m-0 bg-transparent"><code className="language-javascript text-[#00FF41]">function VibeCheck() &#123;
  const [likes, setLikes] = useState(123);
  return (
    &lt;button onClick=&#123;() =&gt; setLikes(likes + 1)&#125;&gt;
      Vibe Check: &#123;likes&#125;
    &lt;/button&gt;
  );
&#125;</code></pre>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-start">
                <button 
                  className={`vibe-check-button flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white transition-all duration-300 hover:scale-105 ${userLiked ? 'bg-pink-500' : 'bg-[var(--primary-color)]'}`}
                  onClick={handleLike}
                >
                  <span className="material-symbols-outlined">favorite</span>
                  <span>Vibe Check</span>
                  <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs">{likes}</span>
                </button>
              </div>
            </div>
          </article>
          <section className="mt-12" id="comments">
            <h3 className="text-2xl font-bold mb-6">Comments</h3>
            <div className="space-y-6">
              {comments.map((comment) => (
                <div className="flex gap-4" key={comment.id}>
                  <div className="size-10 rounded-full bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${comment.authorAvatar})` }}></div>
                  <div className="flex-1 bg-[var(--surface-color)] rounded-lg p-4 border border-[var(--border-color)]">
                    <div className="flex items-baseline justify-between mb-2">
                      <p className="font-bold text-white">{comment.author}</p>
                      <p className="text-xs text-[var(--secondary-color)]">{comment.timestamp}</p>
                    </div>
                    <p className="text-sm text-white">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <div className="mt-12 flex items-start gap-4">
            <div className="size-10 rounded-full bg-cover bg-center flex-shrink-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBYM88q9iAc_iyKD_S0kYi-dm0KQoo_efkCN_cM2tkgjUHuhmPqx5zUR-HpGFAIOCpzzWP9N253DN_R-2HBAuB92lNQpRDceC5KxIF2Qvl1qji3J0fozi6j_WnrAzxmRzArEG-L9XzJPJZtFOEpiDX7IYuvssDXkQwa012S3YyH9I6MF4T1mvIMCTKwZF9rF8Gyrq_XDMw3JbFb-DdwadaHNxbPNVstGAOhgV_4KdlYW0TJubsak-5aF9bVKd4bHu692np-RpaoHP4")' }}></div>
            <div className="flex-1">
              <form className="relative">
                <textarea
                  className="form-textarea w-full resize-y rounded-md bg-[var(--surface-color)] border border-[var(--border-color)] text-white placeholder-[var(--secondary-color)] focus:border-[var(--primary-color)] focus:ring focus:ring-[var(--primary-color)] focus:ring-opacity-50 transition"
                  placeholder="Add a comment..."
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <button
                  className="absolute bottom-3 right-3 min-w-[84px] cursor-pointer rounded-md h-8 px-4 bg-[var(--primary-color)] hover:bg-fuchsia-600 text-white text-sm font-medium leading-normal transition-colors"
                  type="button"
                  onClick={handleAddComment}
                >
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShowcaseDetailPage;