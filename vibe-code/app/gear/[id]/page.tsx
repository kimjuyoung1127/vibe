"use client";

import React, { useEffect } from 'react';
import ToolTechReviewDetail from './ToolTechReviewDetail';

const ToolTechReviewDetailPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Tool/tech review detail content */}
      <ToolTechReviewDetail />
    </>
  );
};

export default ToolTechReviewDetailPage;