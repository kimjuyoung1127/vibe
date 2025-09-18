'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

// --- Project 인터페이스 ---
interface Project {
  id: number;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  likes: number;
  image: string;
  topic: string;
  creatorType: string;
  techStack: string[];
  codingTool: string;
}

const AllShowcasePage = () => {
  const { session } = useAuth();
  // --- 프로젝트 데이터 ---
  const [projects] = useState<Project[]>([
    {
      id: 1,
      title: "Cybernetic Interface",
      description: "A futuristic UI/UX design for a brain-computer interface.",
      author: "SynthWaveDev",
      authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBu6CgNai0Ijy2g9vheNU_aSgS8_dQQzSjtVuU95M9bSLtPlJl2BYSNRbiYFOn2xfjNICkgjWD0ikHtiaNTKZL6hmf4PrhNSY3iR3Rfg59HXDj1VxsawaU7LN7eZmf0N8Gp8-zepKb3P9GwpuYpGvTl5FOAcZ8_N54H4JnfTGjCelT1BKKoyOusQzvLxI9HcViTgw_G2dPFllY6Ucx14ylz8kQXrIpKX9HD51n92F2mQFYpR4SrnYyB_867IGqqJvFRkixqT6V-r4E",
      likes: 1200,
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      topic: "Web Development",
      creatorType: "Developer",
      techStack: ["React", "Node.js", "Stitches"],
      codingTool: "VS Code"
    },
    {
      id: 2,
      title: "Retro Game Emulator",
      description: "A web-based emulator for classic 8-bit and 16-bit games.",
      author: "PixelPioneer",
      authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4W6WTXVBLSTFTcBzR_DQ7gfwnqzaKTNGXT3H8VgjTbvPzlQolLaq56ExKxO7_mSQp9wn8VPjqilBS44hrq3Mn15k1cU461SqVwTXUEQ84wZJSZIUEfMgYGgvEjuxD3I3AFDJ07v6s-8Oj0SYfhBBAp-vbwvwEqL9Z_2OB43phqW6-5kJGVvDSm1LVJvIsju9Ux6PHhWQ0s1BmRUO4Bwp4sVpfeJxImNxTdhDJmJ3Cy3LAPCnE6Qvzg8GgeC6a5a5GcHoTLR7Qc-k",
      likes: 980,
      image: "https://images.unsplash.com/photo-1582804932243-9d3a3418f8b2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      topic: "Game Development",
      creatorType: "Developer",
      techStack: ["JavaScript", "HTML5", "CSS3"],
      codingTool: "Sublime Text"
    },
    {
      id: 3,
      title: "Glitch Art Generator",
      description: "An interactive tool to create unique glitch art from images.",
      author: "DataDaemon",
      authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfObs8xg4eTMi1xPbLs003sq63Ql2vEaJjbHPAM4Mh1y-s4SIB0Je9G7cky19b9H5dTFWTdEXbLChPRZMvpGBHxE7Zv56WsLWptMNTjgsquzm9aKiQScZhIce9SSkPgxvX2bxoP_ZZoLxG1N4ETd6HsLT_8yq9BYbDiJEDuWy5_URWyS-by6wWBL0OXIIqC6k4yjSr7nXv4tLFZ7dE4HpZM0-ZmCC6CcnIHZ5oj4MqxGKmV2Wux81tO69xNM_a7FGJa3Y5yhTTFEc",
      likes: 854,
      image: "https://images.unsplash.com/photo-1526374965328-5f61d4dc18c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      topic: "AI/ML",
      creatorType: "Developer",
      techStack: ["Python", "TensorFlow", "OpenCV"],
      codingTool: "PyCharm"
    },
    {
      id: 4,
      title: "Holo-Deck VR",
      description: "A virtual reality environment for collaborative coding sessions.",
      author: "VR_Architect",
      authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhS0R0FDn7VsJRs3qGk1fQDi5QSCgsjqM6QXdgYuUXMWdRcgwIDh3WqgwqfLAMcAqxdL5wwaVyHoRjw8IZKAWWGDuVB_w0RuuYqQd3qdtrSPatdkaEBRPbhZp_NEcnqx4Y6ypV0BAjXicKJITHNj_sr8610r5tWqdBNZCaQq-x-AGfzpmMuXLcQwloqJBZCabiucAKS5wsR_TPD18VYmLGcGi_Y9fOzW-6Xa9H3m76JdqIqMg9707zjT0U3XyOj6qI7JLjA8xVeWI",
      likes: 789,
      image: "https://images.unsplash.com/photo-1535378620166-273708d40e1c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      topic: "Mobile Apps",
      creatorType: "Developer",
      techStack: ["Unity", "C#", "Oculus SDK"],
      codingTool: "Rider"
    },
    {
      id: 5,
      title: "AI Music Composer",
      description: "Generating original synthwave tracks using a recurrent neural network.",
      author: "SonicCoder",
      authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOjNUDgNlCQvJR4Xwcud5SbJqBidWq3bCU5sFQHOBbpVIUhkJuubI3vuKbIthUqSl6svjq2B5k4qyEJmVYdQ2EDRWmF8j4FnCbsw3rYcKCdQ91wrxgpsuPT8pKTnIZVVJIgbu6il5tIdyU-m_PjuWMG-c_Jg4swwz1XzbahNUu1fJ4u0U8TEvw0ZMbqD5hjrx1k9KRqhR048obQ_lIpP7bOLTeHepK1GNRt1eGT-k_FAtDOfpVy_-wzG6PhToSHLBLFh4affZIwbU",
      likes: 672,
      image: "https://images.unsplash.com/photo-1617289732448-9776a4c612b8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      topic: "AI/ML",
      creatorType: "Developer",
      techStack: ["Python", "PyTorch", "MIDI"],
      codingTool: "Jupyter Notebook"
    },
    {
      id: 6,
      title: "Neon Weather App",
      description: "A visually striking weather application with a retro-futuristic theme.",
      author: "CodeCascade",
      authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLE-1Wi_jh1AI1MxIFo9tg3NLe5THooWjE0yyu0wL3p1x0UKBlH--X7yhhjYcfNb5buLOe4IKTfCPA07D5_4vK8NUD96f9ZzoxQtaHevSC5TiYM49B6lwwxgmaA7PS3HQ1HNusrqEI6bQOPweYA1QZc7XsMpjUeQBhomj0lw1wX8GMImcYySAiQQSaFtPW--E14U_BRhI-JLKA7Vt0jIhT8492Cja835BPOLNEQwPS85_UPHW-CLcRVR2xuO11QfuklE-cc8jdfVc",
      likes: 541,
      image: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      topic: "Web Development",
      creatorType: "Non-Developer",
      techStack: ["React", "Weather API", "CSS3"],
      codingTool: "CodePen"
    },
    // --- 추가 더미 데이터 ---
    ...Array.from({ length: 14 }, (_, i) => ({
      id: i + 7,
      title: `Vibe Project ${i + 7}`,
      description: 'Exploring new dimensions of code and design.',
      author: `Coder${i + 7}`,
      authorAvatar: `https://i.pravatar.cc/150?u=coder${i + 7}`,
      likes: Math.floor(Math.random() * 1500),
      image: `https://picsum.photos/seed/${i + 7}/400/300`,
      topic: ['Web Development', 'AI/ML', 'Game Development', 'Mobile Apps'][i % 4],
      creatorType: ['Developer', 'Non-Developer'][i % 2],
      techStack: [['React', 'Next.js'], ['Python', 'FastAPI'], ['Unity', 'C#'], ['Flutter', 'Dart']][i % 4],
      codingTool: ['VS Code', 'PyCharm', 'Rider', 'Android Studio'][i % 4]
    }))
  ]);

  const [topicFilter, setTopicFilter] = useState('All Topics');
  const [creatorTypeFilter, setCreatorTypeFilter] = useState('All Creators');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(project => {
    if (topicFilter !== 'All Topics' && project.topic !== topicFilter) return false;
    if (creatorTypeFilter !== 'All Creators' && project.creatorType !== creatorTypeFilter) return false;
    if (searchQuery && 
        !project.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !project.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const topics = ['All Topics', ...Array.from(new Set(projects.map(p => p.topic)))];
  const creatorTypes = ['All Creators', ...Array.from(new Set(projects.map(p => p.creatorType)))];

  return (
    <div className="min-h-screen bg-[#0D0A11] text-white" style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold neon-text cyber-heading">All Projects</h1>
          <p className="text-lg text-gray-400 mt-4 font-modern">Browse and discover all projects shared by our vibrant community.</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 p-4 bg-[#1F172C]/50 rounded-lg border border-[#362348]">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-modern">Filter by:</span>
            <select 
              value={topicFilter}
              onChange={(e) => { setTopicFilter(e.target.value); }}
              className="bg-[#1F172C] border border-[#362348] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8013ec]"
            >
              {topics.map(topic => (<option key={topic} value={topic}>{topic}</option>))}
            </select>
            <select 
              value={creatorTypeFilter}
              onChange={(e) => { setCreatorTypeFilter(e.target.value); }}
              className="bg-[#1F172C] border border-[#362348] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8013ec]"
            >
              {creatorTypes.map(type => (<option key={type} value={type}>{type}</option>))}
            </select>
          </div>
          <div className="relative w-full md:w-auto">
            <input 
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); }}
              className="bg-[#1F172C] border border-[#362348] rounded-md pl-10 pr-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[#8013ec]"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" x2="16.65" y1="21" y2="16.65"></line></svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div key={project.id} className="group flex flex-col glass-effect rounded-lg p-4 border border-[#362348] hover:border-[#8013ec] transition-all duration-300 hover:neon-glow">
              <Link href={`/showcase/${project.id}`} className="flex flex-col flex-grow" aria-label={`View project: ${project.title}`}>
                <div className="w-full h-48 bg-cover bg-center rounded-md mb-4 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="text-white text-xl font-bold mb-2 cyber-heading">{project.title}</h3>
                  <p className="text-[#ad92c9] text-sm mb-4 font-modern flex-grow">{project.description}</p>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-[#362348]/50">
                    <div className="flex items-center gap-2">
                      <img src={project.authorAvatar} alt={project.author} className="w-6 h-6 rounded-full border-2 border-[#8013ec]" />
                      <span className="text-[#ad92c9] font-modern text-sm">@{project.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#ad92c9] font-modern text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-red-500"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                      {project.likes}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllShowcasePage;