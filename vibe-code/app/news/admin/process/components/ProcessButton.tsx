// components/ProcessButton.tsx
import React from 'react';

interface ProcessButtonProps {
  onClick: () => void;
  isProcessing: boolean;
}

const ProcessButton: React.FC<ProcessButtonProps> = ({ onClick, isProcessing }) => {
  return (
    <button
      onClick={onClick}
      disabled={isProcessing}
      className={`px-6 py-3 rounded-lg text-white ${
        isProcessing 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-primary hover:bg-primary/90'
      }`}
    >
      {isProcessing ? 'Processing...' : 'Start Processing'}
    </button>
  );
};

export default ProcessButton;