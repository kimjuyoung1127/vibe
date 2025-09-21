// CommentsSection.tsx
// This component displays the comments section
"use client";

import React from 'react';
import ProjectCommentsSection from '../../components/ProjectCommentsSection'; // 새로 생성한 컴포넌트 임포트

const CommentsSection = () => {
  return (
    <div className="px-4 pb-6">
      <h2 className="text-[#161118] dark:text-[#f5f7f8] text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
        Comments
      </h2>
      <ProjectCommentsSection /> {/* ProjectCommentsSection 컴포넌트 사용 */}
    </div>
  );
};

export default CommentsSection;