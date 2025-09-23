// page.tsx
// This is the dynamic route page for individual project showcase cards
"use client";

import React from 'react';
import TopNav from '../../components/topnav';
import Navbar from '../../components/navbar';
import ProjectShowcaseDetail from './ProjectShowcaseDetail';
import { useParams } from 'next/navigation';

const ProjectCardPage = () => {
  const params = useParams();
  const projectId = params.id;

  // projectId가 문자열이 아니거나 없는 경우를 처리합니다.
  if (typeof projectId !== 'string') {
    // 예를 들어, 로딩 상태를 보여주거나 에러 페이지로 리디렉션할 수 있습니다.
    // 여기서는 간단히 null을 반환하여 렌더링하지 않도록 합니다.
    return null; 
  }

  return (
    <div className="group/design-root relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Top navigation bar */}
      <TopNav />
      
      {/* Main content area with sidebar and main content */}
      <div className="flex flex-1">
        {/* Left sidebar navigation */}
        <Navbar />
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto">
          {/* Project showcase detail content */}
          <ProjectShowcaseDetail projectId={projectId} />
        </main>
      </div>
    </div>
  );
};

export default ProjectCardPage;