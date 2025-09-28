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
import DropdownMenu from '@/app/components/DropdownMenu';
import ReportModal from '@/app/components/ReportModal';
import { supabase } from '@/app/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  alt_text: string | null;
  created_at: string;
}

const ProjectShowcaseDetail = ({ projectId }: { projectId: string }) => {
  const [project, setProject] = useState<ProjectItem | null>(null);
  const [projectImages, setProjectImages] = useState<ProjectImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
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
      
      // Fetch project images from the project-images bucket
      await fetchProjectImages(projectId);
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

  const fetchProjectImages = async (projectId: string) => {
    try {
      // First, let's try to list all files in the project-images bucket for this project
      // We'll look for files with names containing the project ID
      const { data, error } = await supabase
        .storage
        .from('project-images')
        .list(projectId, { 
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) throw error;

      if (data && data.length > 0) {
        // Generate public URLs for each image
        const imageUrls = await Promise.all(
          data.map(async (file) => {
            const { data: urlData } = supabase
              .storage
              .from('project-images')
              .getPublicUrl(`${projectId}/${file.name}`);
            
            return {
              id: file.id || '',
              project_id: projectId,
              image_url: urlData?.publicUrl || '',
              alt_text: file.name,
              created_at: file.created_at || new Date().toISOString()
            };
          })
        );
        
        setProjectImages(imageUrls);
      }
    } catch (error: any) {
      console.error('Error fetching project images:', error);
      // Don't throw an error here as project images are optional
      // The project can still be displayed without images
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
        {/* Vibe Check button and Report menu - Mobile view */}
        <div className="flex items-center md:hidden">
          <VibeCheckButton 
            targetId={project.id} 
            targetType="project" 
            initialCount={project.vibe_check_count} 
          />
          <div className="ml-2">
            <DropdownMenu targetId={project.id} contentType="project">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-[#161118] dark:text-[#f5f7f8] hover:bg-primary/10 dark:hover:bg-primary/20"
                onClick={(e) => {
                  e.preventDefault();
                  setIsReportModalOpen(true);
                }}
              >
                Report
              </button>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* 데스크탑 전용: 헤더 아래로 위치 */}
      <div className="hidden md:block px-4">
        <div className="flex items-center pb-4">
          <VibeCheckButton 
            targetId={project.id} 
            targetType="project" 
            initialCount={project.vibe_check_count} 
          />
          <div className="ml-4">
            
            <DropdownMenu targetId={project.id} contentType="project">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-[#161118] dark:text-[#f5f7f8] hover:bg-primary/10 dark:hover:bg-primary/20"
                onClick={(e) => {
                  e.preventDefault();
                  setIsReportModalOpen(true);
                }}
              >
                Report
              </button>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {/* Report Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        targetId={project.id}
        targetType="project"
      />
      
      {/* Project image(s) */}
      <div className="@container px-4">
        <div className="@[480px]:py-3">
          {projectImages.length > 0 ? (
            // Display project images from the project-images bucket
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectImages.map((image, index) => (
                <div 
                  key={index}
                  className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-white rounded-lg min-h-60"
                  style={{ backgroundImage: `url("${image.image_url}")` }}
                ></div>
              ))}
            </div>
          ) : (
            // Fallback to the hero image if no project images are available
            <div
              className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-white rounded-lg min-h-80"
              style={{ backgroundImage: `url("${project.hero_image_url}")` }}
            ></div>
          )}
        </div>
      </div>
      
      {/* Project content */}
      <div className="px-4 pb-6 text-[#161118] dark:text-[#f5f7f8] max-w-none pt-6">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-10 mb-6 text-primary dark:text-primary/90 border-b border-primary/20 pb-2" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-5 text-primary dark:text-primary/90 border-b border-primary/10 pb-1.5" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-6 mb-4 text-[#161118] dark:text-[#f5f7f8]" {...props} />,
            p: ({node, ...props}) => <p className="mb-5 leading-relaxed text-base text-[#161118] dark:text-[#f5f7f8] px-1" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc list-inside mb-5 space-y-3 pl-6" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-5 space-y-3 pl-6" {...props} />,
            li: ({node, ...props}) => <li className="pl-2 text-[#161118] dark:text-[#f5f7f8]" {...props} />,
            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 italic bg-primary/5 dark:bg-primary/10 p-5 rounded-r-lg text-[#161118] dark:text-[#f5f7f8]" {...props} />,
            code: ({node, ...props}) => <code className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/90 px-2.5 py-1 rounded text-sm font-mono" {...props} />,
            pre: ({node, ...props}) => <pre className="bg-[#1a1a2e] p-5 rounded-lg overflow-x-auto my-6 text-sm" {...props} />,
            a: ({node, ...props}) => <a className="text-primary hover:underline font-medium" {...props} />,
            strong: ({node, ...props}) => <strong className="font-bold text-[#161118] dark:text-[#f5f7f8]" {...props} />,
            em: ({node, ...props}) => <em className="italic" {...props} />,
            hr: ({node, ...props}) => <hr className="my-8 border-t border-primary/20" {...props} />,
            table: ({node, ...props}) => <table className="min-w-full border-collapse my-6" {...props} />,
            thead: ({node, ...props}) => <thead className="bg-primary/10 dark:bg-primary/20" {...props} />,
            tbody: ({node, ...props}) => <tbody {...props} />,
            tr: ({node, ...props}) => <tr className="border-b border-primary/10" {...props} />,
            th: ({node, ...props}) => <th className="px-4 py-2 text-left font-semibold text-[#161118] dark:text-[#f5f7f8] border border-primary/20" {...props} />,
            td: ({node, ...props}) => <td className="px-4 py-3 text-[#161118] dark:text-[#f5f7f8] border border-primary/20" {...props} />,
          }}
        >
          {project.content}
        </ReactMarkdown>
      </div>
      
      {/* Key features section */}
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">주요 기능</h2>
      <FeatureList projectId={project.id} />
      
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