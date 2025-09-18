'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Project {
  id: number;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  likes: number;
  image: string;
}

const WeeklyVibeRanking = () => {
  const [rankedProjects, setRankedProjects] = useState<Project[]>([]);

  // 임시 데이터 - 실제 구현에서는 Supabase에서 데이터를 가져와야 합니다.
  const mockProjects: Project[] = [
    {
      id: 1,
      title: "Project: Neon City",
      description: "A vibrant city simulation with neon lights and retro aesthetics.",
      author: "SynthWaveDev",
      authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBu6CgNai0Ijy2g9vheNU_aSgS8_dQQzSjtVuU95M9bSLtPlJl2BYSNRbiYFOn2xfjNICkgjWD0ikHtiaNTKZL6hmf4PrhNSY3iR3Rfg59HXDj1VxsawaU7LN7eZmf0N8Gp8-zepKb3P9GwpuYpGvTl5FOAcZ8_N54H4JnfTGjCelT1BKKoyOusQzvLxI9HcViTgw_G2dPFllY6Ucx14ylz8kQXrIpKX9HD51n92F2mQFYpR4SrnYyB_867IGqqJvFRkixqT6V-r4E",
      likes: 1200,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFAg3rrmwOsOvOasC5HFTijMj0_J_pgsnki9ycy5T-TYLh7p0YFejasGvEoz6PEuGY_iQDJwsNhXR1Al4R-x93B9P39CG4bzQ1b8m9Wtx-6n6xggH13LmJ8zq3G6MnqIhng1WjmuIsFzpzALAZ7Yy7Ps7ofFbDmzuHEpYuNbJF1ISsGLglvUFgm2gNg8Y5OO7fUA2DBbUTFajHRZwYcxzL2yhFjliqBVve6XZg7nHJztLzRjL2-2lsL90KtuiG6ozLrXPHS92RRGI"
    },
    {
      id: 2,
      title: "Project: Retro Wave",
      description: "A music visualizer with retro wave style graphics.",
      author: "PixelPioneer",
      authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4W6WTXVBLSTFTcBzR_DQ7gfwnqzaKTNGXT3H8VgjTbvPzlQolLaq56ExKxO7_mSQp9wn8VPjqilBS44hrq3Mn15k1cU461SqVwTXUEQ84wZJSZIUEfMgYGgvEjuxD3I3AFDJ07v6s-8Oj0SYfhBBAp-vbwvwEqL9Z_2OB43phqW6-5kJGVvDSm1LVJvIsju9Ux6PHhWQ0s1BmRUO4Bwp4sVpfeJxImNxTdhDJmJ3Cy3LAPCnE6Qvzg8GgeC6a5a5GcHoTLR7Qc-k",
      likes: 980,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8yTaZ7s2VuLwNFMikB3Ki7mN9Ffl6ZtPdaMprRZM7fjcAGUm5bzGGRBNi133zYscCpjM612blMgNvxx54eFyQcoium4p8Xc2wbckKYoLv8ji4m9QBZaehYkl8pLhoGs329TohRdLUOXkX5TzdydjDVy8zbYHVWDayhRlmR7aKGSX0kvIPJx1wheljy23m_WIg8P_VygU8YiW7dU0iiyPfoF2jDbzKZMGvlo2sMgDtCDvPNzQmvNah-4cW6EC-dCWDhrqgTzP72W8"
    },
    {
      id: 3,
      title: "Project: Cyberpunk Dreams",
      description: "A cyberpunk-themed adventure game with stunning visuals.",
      author: "VR_Architect",
      authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhS0R0FDn7VsJRs3qGk1fQDi5QSCgsjqM6QXdgYuUXMWdRcgwIDh3WqgwqfLAMcAqxdL5wwaVyHoRjw8IZKAWWGDuVB_w0RuuYqQd3qdtrSPatdkaEBRPbhZp_NEcnqx4Y6ypV0BAjXicKJITHNj_sr8610r5tWqdBNZCaQq-x-AGfzpmMuXLcQwloqJBZCabiucAKS5wsR_TPD18VYmLGcGi_Y9fOzW-6Xa9H3m76JdqIqMg9707zjT0U3XyOj6qI7JLjA8xVeWI",
      likes: 854,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOjNUDgNlCQvJR4Xwcud5SbJqBidWq3bCU5sFQHOBbpVIUhkJuubI3vuKbIthUqSl6svjq2B5k4qyEJmVYdQ2EDRWmF8j4FnCbsw3rYcKCdQ91wrxgpsuPT8pKTnIZVVJIgbu6il5tIdyU-m_PjuWMG-c_Jg4swwz1XzbahNUu1fJ4u0U8TEvw0ZMbqD5hjrx1k9KRqhR048obQ_lIpP7bOLTeHepK1GNRt1eGT-k_FAtDOfpVy_-wzG6PhToSHLBLFh4affZIwbU"
    }
  ];

  useEffect(() => {
    // 실제 구현에서는 Supabase에서 좋아요 수가 가장 많은 상위 3개 프로젝트를 가져와야 합니다.
    // 여기서는 임시 데이터를 사용합니다.
    setRankedProjects(mockProjects);
  }, []);

  return (
    <section className="py-10 glass-effect rounded-lg">
      <h2 className="text-white text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-5 pt-5 neon-text hover-glitch cyber-heading">Weekly Vibe Ranking</h2>
      <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden p-4 -mx-4">
        <div className="flex items-stretch gap-6">
          {rankedProjects.map((project, index) => (
            <Link href={`/showcase/${project.id}`} key={project.id} className="flex flex-col gap-4 rounded-lg min-w-72 group card-neon glass-effect-strong">
              <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg flex flex-col overflow-hidden border border-transparent group-hover:border-[var(--primary-color)] transition-all duration-300 group-hover:neon-glow">
                <img 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 hover-glitch" 
                  src={project.image} 
                />
              </div>
              <div>
                <p className="text-white text-lg font-bold leading-normal hover-glitch font-heading">{project.title}</p>
                <p className="text-[#ad92c9] text-sm font-normal leading-normal font-modern">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeeklyVibeRanking;