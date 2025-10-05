// This is the main Tool & Tech Review page
// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';

import React from 'react';
import ToolTechHeader from './ToolTechHeader';
import ToolTechReviews from './ToolTechReviews';

const ToolTechPage = () => {
  return (
    <>
      {/* Tool & Tech header */}
      <ToolTechHeader />
      
      {/* Tool & Tech reviews */}
      <ToolTechReviews />
    </>
  );
};

export default ToolTechPage;