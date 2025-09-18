// pages/showcase/index.js (또는 원하는 경로)
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// 더미 데이터 (실제로는 API로부터 받아옵니다)
const allProjects = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Project Title ${i + 1}`,
  description: 'A brief description of this awesome project.',
  author: `User${i + 1}`,
  likes: Math.floor(Math.random() * 1000),
  imageUrl: `https://picsum.photos/seed/${i + 1}/400/300` // 임시 이미지
}));

const ITEMS_PER_PAGE = 6;

const ShowcaseListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedProjects = allProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // 페이지 변경 시 맨 위로 스크롤
  };

  return (
    <div className="min-h-screen bg-[#0D0A11] text-white">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 페이지 제목 및 설명 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold neon-text cyber-heading">Project Experiences</h1>
          <p className="text-lg text-gray-400 mt-4 font-modern">Browse and discover projects shared by our vibrant community.</p>
        </div>

        {/* 필터 및 검색 섹션 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <span className="font-modern">Filter by:</span>
            <select className="bg-[#1F172C] border border-[#362348] rounded-md px-4 py-2 focus:outline-none focus:border-[#8013ec]">
              <option>All Categories</option>
              <option>Web Service</option>
              <option>AI/ML</option>
            </select>
            <span className="font-modern">Sort by:</span>
            <select className="bg-[#1F172C] border border-[#362348] rounded-md px-4 py-2 focus:outline-none focus:border-[#8013ec]">
              <option>Newest</option>
              <option>Most Liked</option>
            </select>
          </div>
          <div className="relative">
            <input 
              type="text"
              placeholder="Search projects..."
              className="bg-[#1F172C] border border-[#362348] rounded-md pl-10 pr-4 py-2 w-full md:w-64 focus:outline-none focus:border-[#8013ec]"
            />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          </div>
        </div>

        {/* 프로젝트 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedProjects.map(project => (
            <Link href={`/showcase/${project.id}`} key={project.id}>
              <div className="group glass-effect rounded-lg p-4 border border-[#362348] hover:border-[#8013ec] transition-all hover:neon-glow cursor-pointer">
                <div className="w-full h-48 bg-cover bg-center rounded-md mb-4 overflow-hidden">
                   <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h3 className="text-white text-xl font-bold mb-2 cyber-heading">{project.title}</h3>
                <p className="text-[#ad92c9] text-sm mb-4 font-modern">{project.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#8013ec] font-modern text-sm">@{project.author}</span>
                  <div className="flex items-center gap-1 text-[#ad92c9] font-modern text-sm">
                    <span className="material-symbols-outlined text-base">favorite</span>
                    {project.likes}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center items-center mt-12 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-md font-bold transition-colors ${currentPage === page ? 'bg-[#8013ec] text-white' : 'bg-[#1F172C] text-gray-400 hover:bg-[#362348]'}`}
            >
              {page}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ShowcaseListPage;