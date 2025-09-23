// FeatureList.tsx
// This component displays the key features of the project with checkboxes
"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabaseClient';

// Define the type for a project feature
interface ProjectFeature {
  id: string;
  project_id: string;
  feature_text: string;
  order_index: number | null;
}

const FeatureList = ({ projectId }: { projectId: string }) => {
  const [features, setFeatures] = useState<ProjectFeature[]>([]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) {
      setLoading(false);
      return;
    }

    fetchFeatures();
  }, [projectId]);

  const fetchFeatures = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch features from Supabase
      const { data, error } = await supabase
        .from('project_features')
        .select('id, project_id, feature_text, order_index')
        .eq('project_id', projectId)
        .order('order_index', { ascending: true });

      if (error) throw error;

      setFeatures(data || []);
      
      // Initialize checked items state
      const initialCheckedState: Record<string, boolean> = {};
      (data || []).forEach(feature => {
        initialCheckedState[feature.id] = false;
      });
      setCheckedItems(initialCheckedState);
    } catch (error: any) {
      console.error('Error fetching features:', error);
      setError('기능 목록을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (featureId: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [featureId]: !prev[featureId]
    }));
  };

  if (loading) {
    return <div className="px-4 py-2 text-gray-500">기능 목록을 불러오는 중...</div>;
  }

  if (error) {
    return <div className="px-4 py-2 text-red-500">{error}</div>;
  }

  if (features.length === 0) {
    return <div className="px-4 py-2 text-gray-500">등록된 기능이 없습니다.</div>;
  }

  return (
    <div className="px-4">
      {features.map((feature) => (
        <label key={feature.id} className="flex gap-x-3 py-3 flex-row">
          <input
            type="checkbox"
            className="h-5 w-5 rounded border-[#e2dbe6] border-2 bg-transparent text-[#af25f4] checked:bg-[#af25f4] checked:border-[#af25f4] checked:bg-[image:--checkbox-tick-svg] focus:ring-0 focus:ring-offset-0 focus:border-[#e2dbe6] focus:outline-none"
            checked={checkedItems[feature.id] || false}
            onChange={() => handleCheckboxChange(feature.id)}
          />
          <p className="text-[#161118] text-base font-normal leading-normal">{feature.feature_text}</p>
        </label>
      ))}
    </div>
  );
};

export default FeatureList;