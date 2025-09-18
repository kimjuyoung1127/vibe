'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import { Heart } from 'lucide-react';

// --- 기존 Project 인터페이스 유지 ---
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

const staticProjects: Project[] = [
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
];

// --- 페이지네이션 설정 ---
const ITEMS_PER_PAGE = 6;

const ShowcasePage = () => {
  const { session } = useAuth();
  const [projects, setProjects] = useState<Project[]>(staticProjects);

  useEffect(() => {
    const randomProjects = Array.from({ length: 14 }, (_, i) => ({
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
    }));
    // 상태를 추가하는 대신, 항상 전체 목록으로 설정하여 멱등성을 보장합니다.
    setProjects([...staticProjects, ...randomProjects]);
  }, []);


  const [topicFilter, setTopicFilter] = useState('All Topics');
  const [creatorTypeFilter, setCreatorTypeFilter] = useState('All Creators');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = projects.filter(project => {
    if (topicFilter !== 'All Topics' && project.topic !== topicFilter) return false;
    if (creatorTypeFilter !== 'All Creators' && project.creatorType !== creatorTypeFilter) return false;
    if (searchQuery && 
        !project.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !project.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // --- 페이지네이션 로직 ---
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const topics = ['All Topics', ...Array.from(new Set(projects.map(p => p.topic)))];
  const creatorTypes = ['All Creators', ...Array.from(new Set(projects.map(p => p.creatorType)))];

  return (
    <div className="min-h-screen bg-[#0D0A11] text-white" style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}>
      <main className="px-4 sm:px-8 md:px-12 lg:px-16 py-10 w-full mx-auto">
        <div className="w-full text-center mb-6">
          <h1 className="text-white text-5xl font-black leading-tight tracking-[-0.033em] neon-text">Project Experiences</h1>
          <p className="text-gray-300 text-lg font-normal leading-normal mt-2">Browse and discover projects shared by our vibrant community.</p>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-[#1F172C] rounded-lg border border-[#362348] mb-8">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <span className="text-white font-medium">Filter by:</span>
            <div className="relative">
              <select 
                value={topicFilter}
                onChange={(e) => { setTopicFilter(e.target.value); setCurrentPage(1); }}
                className="bg-[#362348] text-white rounded-md pl-3 pr-8 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] border border-transparent focus:border-[var(--primary-color)] transition-all"
              >
                {topics.map(topic => (<option key={topic} value={topic}>{topic}</option>))}
              </select>
            </div>
            <div className="relative">
              <select 
                value={creatorTypeFilter}
                onChange={(e) => { setCreatorTypeFilter(e.target.value); setCurrentPage(1); }}
                className="bg-[#362348] text-white rounded-md pl-3 pr-8 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] border border-transparent focus:border-[var(--primary-color)] transition-all"
              >
                {creatorTypes.map(type => (<option key={type} value={type}>{type}</option>))}
              </select>
            </div>
          </div>
          <div className="relative w-full md:w-64">
            <input 
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full bg-[#362348] text-white rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] border border-transparent focus:border-[var(--primary-color)] transition-all"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {selectedProjects.map(project => (
            <Link href={`/showcase/${project.id}`} key={project.id} className="block rounded-lg bg-[#1F172C] p-4 border border-[#362348] transition-all duration-300 project-card hover:border-[var(--primary-color)] hover:neon-glow-sm">
              <div className="w-full h-48 rounded-md overflow-hidden mb-4">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
              </div>
              <div>
                <p className="text-white text-xl font-bold leading-tight mb-2">{project.title}</p>
                <p className="text-[#ad92c9] text-sm font-normal leading-normal mb-4 line-clamp-2">{project.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={project.authorAvatar} alt={project.author} className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-6 h-6 border border-[var(--primary-color)]" />
                    <span className="text-sm text-gray-300">@{project.author}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <Heart className="text-[var(--primary-color)] w-4 h-4" />
                    <span>{project.likes >= 1000 ? `${(project.likes / 1000).toFixed(1)}k` : project.likes}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 space-x-2">
            <button 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1} 
              className="px-4 py-2 rounded-md font-bold transition-colors bg-[#1F172C] text-gray-400 hover:bg-[#362348] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-md font-bold transition-colors ${currentPage === page ? 'bg-[var(--primary-color)] text-white' : 'bg-[#1F172C] text-gray-400 hover:bg-[#362348]'}`}
              >
                {page}
              </button>
            ))}
            <button 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages} 
              className="px-4 py-2 rounded-md font-bold transition-colors bg-[#1F172C] text-gray-400 hover:bg-[#362348] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &gt;
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

// 컴포넌트 export 추가: Element type invalid 에러를 해결하기 위해 default export를 명시
// 왜 이렇게 했는지: Next.js 페이지 파일은 export default로 컴포넌트를 내보내야 서버에서 인식되며, 누락 시 undefined 에러 발생. 이는 모듈화된 코드에서 import 안정성을 보장합니다.
export default ShowcasePage;

