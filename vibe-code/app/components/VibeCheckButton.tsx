"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabaseClient';

interface VibeCheckButtonProps {
  targetId: string;
  targetType: 'project' | 'review' | 'community' | 'news' | 'comment' | 'gear';
  initialCount: number;
}

const VibeCheckButton: React.FC<VibeCheckButtonProps> = ({ targetId, targetType, initialCount }) => {
  const [vibes, setVibes] = useState(initialCount);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  // 처리 중 상태를 추가하여 연속 클릭을 차단
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const checkUserVibeStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      // Check if the user has already liked this target
      const { data, error } = await supabase
        .from('vibe_checks')
        .select('*')
        .eq('user_id', user.id)
        .eq('target_id', targetId)
        .eq('target_type', targetType);

      if (error) {
        console.error('Error checking vibe status:', error);
      } else if (data && data.length > 0) {
        setIsChecked(true);
      }
      setLoading(false);
    };

    checkUserVibeStatus();
  }, [targetId, targetType]);

  const handleVibeCheck = async () => {
    // 이미 처리 중이면 추가 클릭 무시
    if (pending) return;
    setPending(true);

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      alert('로그인이 필요합니다.');
      setPending(false);
      return;
    }

    try {
      if (isChecked) {
        // Remove vibe check
        const { error } = await supabase
          .from('vibe_checks')
          .delete()
          .eq('user_id', user.id)
          .eq('target_id', targetId)
          .eq('target_type', targetType);

        if (error) throw error;

        // 함수형 업데이트로 동시성 안전성 강화
        setVibes((v) => v - 1);
        setIsChecked(false);
      } else {
        // Add vibe check
        const { error } = await supabase
          .from('vibe_checks')
          .insert([{ 
            user_id: user.id, 
            target_id: targetId, 
            target_type: targetType 
          }]);

        if (error) throw error;

        // 함수형 업데이트로 동시성 안전성 강화
        setVibes((v) => v + 1);
        setIsChecked(true);
      }
    } catch (error: any) {
      console.error('Error updating vibe check:', error);
      alert('Vibe Check 업데이트 중 오류가 발생했습니다.');
    } finally {
      // 처리 완료 후 해제
      setPending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="bg-gray-200 text-gray-700 rounded-lg px-3 py-1.5 text-sm font-medium animate-pulse">
          <span>Vibe Check</span>
        </div>
        <p className="text-[#7c608a] text-base font-normal leading-normal">
          {initialCount} Vibes
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleVibeCheck}
        disabled={pending}
        aria-disabled={pending}
        className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors
          ${
            isChecked
              ? 'bg-[#af25f4] text-white shadow-lg shadow-purple-500/50'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } ${pending ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        {pending ? (
          // 간단한 스피너 아이콘
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4A4 4 0 008 12H4z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        )}
        <span>{pending ? '처리 중...' : 'Vibe Check'}</span>
      </button>
      <p className="text-[#7c608a] text-base font-normal leading-normal">
        {vibes} Vibes
      </p>
    </div>
  );
};

export default VibeCheckButton;