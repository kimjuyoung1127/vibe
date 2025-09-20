// FeatureList.tsx
// This component displays the key features of the project with checkboxes
"use client";

import React, { useState } from 'react';

const FeatureList = () => {
  const [checkedItems, setCheckedItems] = useState({
    taskPrioritization: false,
    deadlineTracking: false,
    collaborativeWorkspaces: false
  });

  const handleCheckboxChange = (feature: keyof typeof checkedItems) => {
    setCheckedItems(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  return (
    <div className="px-4">
      <label className="flex gap-x-3 py-3 flex-row">
        <input
          type="checkbox"
          className="h-5 w-5 rounded border-[#e2dbe6] border-2 bg-transparent text-[#af25f4] checked:bg-[#af25f4] checked:border-[#af25f4] checked:bg-[image:--checkbox-tick-svg] focus:ring-0 focus:ring-offset-0 focus:border-[#e2dbe6] focus:outline-none"
          checked={checkedItems.taskPrioritization}
          onChange={() => handleCheckboxChange('taskPrioritization')}
        />
        <p className="text-[#161118] text-base font-normal leading-normal">Task Prioritization</p>
      </label>
      <label className="flex gap-x-3 py-3 flex-row">
        <input
          type="checkbox"
          className="h-5 w-5 rounded border-[#e2dbe6] border-2 bg-transparent text-[#af25f4] checked:bg-[#af25f4] checked:border-[#af25f4] checked:bg-[image:--checkbox-tick-svg] focus:ring-0 focus:ring-offset-0 focus:border-[#e2dbe6] focus:outline-none"
          checked={checkedItems.deadlineTracking}
          onChange={() => handleCheckboxChange('deadlineTracking')}
        />
        <p className="text-[#161118] text-base font-normal leading-normal">Deadline Tracking</p>
      </label>
      <label className="flex gap-x-3 py-3 flex-row">
        <input
          type="checkbox"
          className="h-5 w-5 rounded border-[#e2dbe6] border-2 bg-transparent text-[#af25f4] checked:bg-[#af25f4] checked:border-[#af25f4] checked:bg-[image:--checkbox-tick-svg] focus:ring-0 focus:ring-offset-0 focus:border-[#e2dbe6] focus:outline-none"
          checked={checkedItems.collaborativeWorkspaces}
          onChange={() => handleCheckboxChange('collaborativeWorkspaces')}
        />
        <p className="text-[#161118] text-base font-normal leading-normal">Collaborative Workspaces</p>
      </label>
    </div>
  );
};

export default FeatureList;