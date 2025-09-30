// TechnologyStack.tsx
// This component displays the technology stack and tools used in the project
"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { ProjectTechnology, ProjectTool } from '@/app/types/project';

const TechnologyStack = ({ projectId }: { projectId: string }) => {
  const [technologies, setTechnologies] = useState<ProjectTechnology[]>([]);
  const [tools, setTools] = useState<ProjectTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) {
      setLoading(false);
      return;
    }

    fetchTechnologyStack();
  }, [projectId]);

  const fetchTechnologyStack = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch technologies from Supabase
      // Since `project_technologies` is a join table, we query it directly
      const { data: techData, error: techError } = await supabase
        .from('project_technologies')
        .select('project_id, tech_name')
        .eq('project_id', projectId);

      if (techError) throw techError;

      setTechnologies(techData || []);
      
      // Fetch tools from Supabase
      // Since `project_tools` is a join table, we query it directly
      const { data: toolData, error: toolError } = await supabase
        .from('project_tools')
        .select('project_id, tool_name')
        .eq('project_id', projectId);

      if (toolError) throw toolError;

      setTools(toolData || []);
      
    } catch (error: any) {
      console.error('Error fetching technology stack:', error);
      setError('기술 스택 및 도구 목록을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="px-4 py-2 text-gray-500">기술 스택 및 도구 목록을 불러오는 중...</div>;
  }

  if (error) {
    return <div className="px-4 py-2 text-red-500">{error}</div>;
  }

  // Combine technologies and tools for display
  const allTechAndTools = [
    ...technologies.map(t => t.tech_name),
    ...tools.map(t => t.tool_name)
  ];

  if (allTechAndTools.length === 0) {
    return <div className="px-4 py-2 text-gray-500">등록된 기술 스택 또는 도구가 없습니다.</div>;
  }

  return (
    <div className="flex gap-3 p-3 flex-wrap pr-4">
      {allTechAndTools.map((name, index) => (
        <div key={index} className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#f3f0f5] pl-4 pr-4">
          <p className="text-[#161118] text-sm font-medium leading-normal">{name}</p>
        </div>
      ))}
    </div>
  );
};

export default TechnologyStack;