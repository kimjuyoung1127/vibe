// ProjectShowcaseDetail.tsx
// This component displays the detailed view of a project showcase
"use client";

import React, { useState, useEffect } from 'react';
import FeatureList from './FeatureList';
import TechnologyStack from './TechnologyStack';
import RelatedProjects from './RelatedProjects';
import AuthorProfile from './AuthorProfile';
import VibeCheckButton from '@/app/components/VibeCheckButton';
import DropdownMenu from '@/app/components/DropdownMenu';
import ReportModal from '@/app/components/ReportModal';
import CommentSection from '@/app/components/commentSection';

import { supabase } from '@/app/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { ProjectItem, ProjectImage } from '@/app/types/project';
import VibeEditorRenderer from '@/app/components/VibeEditorRenderer';

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
        setError('프로젝트를 찾을 수 없습니다.');
        return;
      }

      setProject(data);
      
      await fetchProjectImages(projectId);
    } catch (error: any) {
      console.error('Error fetching project details:', error);
      if (error.code === 'PGRST116') {
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
      
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        targetId={project.id}
        targetType="project"
      />
      
      {/* Project image(s) */}
      <div className="px-4 py-6">
        {projectImages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectImages.map((image, index) => (
              <img
                key={index}
                src={image.image_url}
                alt={project?.title || "Project image"}
                className="w-full h-80 object-cover rounded-xl shadow-lg"
              />
            ))}
          </div>
        ) : project.hero_image_url ? (
          <img
            src={project.hero_image_url}
            alt={project.title}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
          />
        ) : (
          <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-xl shadow-lg flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">No image available</span>
          </div>
        )}
      </div>

      {/* Live Demo Link */}
      {project.live_demo_url && (
        <div className="px-4 py-6 text-center">
          <a
            href={project.live_demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 text-lg font-bold text-white bg-primary rounded-full shadow-lg hover:bg-primary/80 transition-transform transform hover:scale-105"
          >
            <span className="material-symbols-outlined">open_in_new</span>
            <span>Live Demo</span>
          </a>
        </div>
      )}
      
      {/* Project description */}
      <div className="px-4 py-6">
        <VibeEditorRenderer 
          content={project.content || ''} 
          maxWidthClass="max-w-[65ch]" 
          containerClass="max-w-[672px] md:max-w-[768px] lg:max-w-[896px] xl:max-w-[960px] mx-auto"
        />
      </div>
      
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">주요 기능</h2>
      <FeatureList projectId={project.id} />
      
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">기술 스택 &amp; 도구</h2>
      <TechnologyStack projectId={project.id} />
      
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">프로젝트 링크 &amp; 정보</h2>
      <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
        {project.github_url && (
          <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#e2dbe6] py-5">
            <p className="text-[#7c608a] text-sm font-normal leading-normal">GitHub 리포지토리</p>
            <p className="text-[#161118] text-sm font-normal leading-normal">{project.github_url}</p>
          </div>
        )}
        {project.deployment_platform && (
          <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#e2dbe6] py-5">
            <p className="text-[#7c608a] text-sm font-normal leading-normal">배포 정보</p>
            <p className="text-[#161118] text-sm font-normal leading-normal">{project.deployment_platform}</p>
          </div>
        )}
      </div>
      
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">작성자 정보</h2>
      <div className="p-4">
        <AuthorProfile userId={project.user_id} />
      </div>
      
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">관련 프로젝트</h2>
      <RelatedProjects authorId={project.user_id} currentProjectId={project.id} />
      
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">댓글</h2>
      <CommentSection targetId={project.id} postType="project" />
    </div>
  );
};
   

export default ProjectShowcaseDetail;