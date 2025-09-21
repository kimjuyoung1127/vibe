"use client";

import React, { useState } from 'react';

interface VibeCheckButtonProps {
  initialVibes: number;
}

const VibeCheckButton: React.FC<VibeCheckButtonProps> = ({ initialVibes }) => {
  const [vibes, setVibes] = useState(initialVibes);
  const [isChecked, setIsChecked] = useState(false);

  const handleVibeCheck = () => {
    if (isChecked) {
      setVibes(vibes - 1);
    } else {
      setVibes(vibes + 1);
    }
    setIsChecked(!isChecked);
    // 실제 애플리케이션에서는 이 변경 사항을 백엔드로 보내
    // Weekly Vibe Ranking을 업데이트해야 합니다.
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleVibeCheck}
        className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors
          ${
            isChecked
              ? 'bg-[#af25f4] text-white shadow-lg shadow-purple-500/50'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
        <span>Vibe Check</span>
      </button>
      <p className="text-[#7c608a] text-base font-normal leading-normal">
        {vibes} Vibes
      </p>
    </div>
  );
};

export default VibeCheckButton;