// components/StatusMessage.tsx
import React from 'react';

interface StatusMessageProps {
  message: string;
  type: 'info' | 'error' | 'success';
}

const StatusMessage: React.FC<StatusMessageProps> = ({ message, type }) => {
  const getStyle = () => {
    switch (type) {
      case 'error':
        return 'bg-red-100 border border-red-400 text-red-700';
      case 'success':
        return 'bg-green-100 border border-green-400 text-green-700';
      default:
        return 'bg-blue-100 border border-blue-400 text-blue-700';
    }
  };

  if (!message) return null;

  return (
    <div className={`mb-6 p-4 ${getStyle()} rounded-lg`}>
      {message}
    </div>
  );
};

export default StatusMessage;