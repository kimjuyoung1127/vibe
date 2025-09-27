// ProjectShowcaseDetail.tsx
// This component displays the detailed view of a project showcase
"use client";

import React, { useState, useEffect } from 'react';
import FeatureList from './FeatureList';
import TechnologyStack from './TechnologyStack';
import RelatedProjects from './RelatedProjects';
import CommentsSection from './CommentsSection';
import AuthorProfile from './AuthorProfile';
import VibeCheckButton from '@/app/components/VibeCheckButton';
import { supabase } from '@/app/lib/supabaseClient';
import { useRouter } from 'next/navigation';

// Define the type for a project item based on the database schema
interface ProjectItem {
  id: string;
  user_id: string; // UUID of the project creator
  title: string;
  tagline: string;
  hero_image_url: string;
  content: string; // This is the detailed description
  github_url: string | null;
  live_demo_url: string | null;
  deployment_platform: string | null;
  font_preference: string;
  vibe_check_count: number;
  comment_count: number;
  is_public: boolean;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  // We will fetch related data (features, tech stack) separately
}

const ProjectShowcaseDetail = ({ projectId }: { projectId: string }) => {
  const [project, setProject] = useState<ProjectItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!projectId) {
      setError('프로젝트 ID가 없습니다.');
      setLoading(false);
      return;
    }

    fetchProjectDetails();
  }, [projectId]);

  const fetchProjectDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch project details from Supabase
      const { data, error } = await supabase
        .from('projects')
        .select(`
          id,
          user_id,
          title,
          tagline,
          hero_image_url,
          content,
          github_url,
          live_demo_url,
          deployment_platform,
          font_preference,
          vibe_check_count,
          comment_count,
          is_public,
          created_at,
          updated_at
        `)
        .eq('id', projectId)
        .eq('is_public', true) // Only fetch public projects
        .single(); // Expect a single result

      if (error) throw error;

      if (!data) {
        // This case should ideally be handled by the .single() query failing,
        // but it's good to check.
        setError('프로젝트를 찾을 수 없습니다.');
        return;
      }

      setProject(data);
    } catch (error: any) {
      console.error('Error fetching project details:', error);
      // Handle specific error types
      if (error.code === 'PGRST116') {
        // No rows returned by .single()
        setError('프로젝트를 찾을 수 없습니다.');
      } else {
        setError('프로젝트 정보를 불러오는 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1 p-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1 p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">오류! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
        >
          뒤로 가기
        </button>
      </div>
    );
  }

  if (!project) {
    // This case should be covered by the error state, but added for safety
    return (
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1 p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">오류! </strong>
          <span className="block sm:inline">프로젝트 데이터가 없습니다.</span>
        </div>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
        >
          뒤로 가기
        </button>
      </div>
    );
  }

  // Format dates for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };
  
  const postedDate = formatDate(project.created_at);
  const updatedDate = formatDate(project.updated_at);

  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      {/* Page header */}
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-[#161118] tracking-light text-[32px] font-bold leading-tight">{project.title}</p>
          <p className="text-[#7c608a] text-sm font-normal leading-normal">
            {project.tagline}
          </p>
        </div>
        {/* Vibe Check button */}
        <div className="flex items-center md:hidden">
          <VibeCheckButton 
            targetId={project.id} 
            targetType="project" 
            initialCount={project.vibe_check_count} 
          />
        </div>
      </div>

      {/* 데스크탑 전용: 헤더 아래로 위치 */}
      <div className="hidden md:block px-4">
        <div className="flex items-center">
          <VibeCheckButton 
            targetId={project.id} 
            targetType="project" 
            initialCount={project.vibe_check_count} 
          />
        </div>
      </div>
      
      {/* Project image */}
      <div className="@container">
        <div className="@[480px]:px-4 @[480px]:py-3">
          <div
            className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-white @[480px]:rounded-lg min-h-80"
            style={{ backgroundImage: `url("${project.hero_image_url}")` }}
          ></div>
        </div>
      </div>
      
      {/* Project description */}
      <p className="text-[#161118] text-base font-normal leading-normal pb-3 pt-1 px-4">
        {project.content}
      </p>
      
      {/* Key features section */}
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">주요 기능</h2>
      <FeatureList projectId={project.id} />
      
      {/* Project content section - This is the detailed description from 'content' field */}
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">프로젝트 내용</h2>
      
      {/* Technology stack section */}
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">기술 스택 &amp; 도구</h2>
      <TechnologyStack projectId={project.id} />
      
      {/* Project links section */}
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">프로젝트 링크 &amp; 정보</h2>
      <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
        {project.github_url && (
          <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#e2dbe6] py-5">
            <p className="text-[#7c608a] text-sm font-normal leading-normal">GitHub 리포지토리</p>
            <p className="text-[#161118] text-sm font-normal leading-normal">{project.github_url}</p>
          </div>
        )}
        {project.live_demo_url && (
          <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#e2dbe6] py-5">
            <p className="text-[#7c608a] text-sm font-normal leading-normal">라이브 데모</p>
            <p className="text-[#161118] text-sm font-normal leading-normal">{project.live_demo_url}</p>
          </div>
        )}
        {project.deployment_platform && (
          <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#e2dbe6] py-5">
            <p className="text-[#7c608a] text-sm font-normal leading-normal">배포 정보</p>
            <p className="text-[#161118] text-sm font-normal leading-normal">{project.deployment_platform}</p>
          </div>
        )}
      </div>
      
      {/* Author information section */}
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">작성자 정보</h2>
      <div className="p-4">
        <AuthorProfile userId={project.user_id} />
      </div>
      
      {/* Related projects section */}
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">관련 프로젝트</h2>
      <RelatedProjects authorId={project.user_id} currentProjectId={project.id} />
      
      {/* Comments section */}
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">댓글</h2>
      <CommentsSection projectId={project.id} />
    </div>
  );
};

export default ProjectShowcaseDetail;