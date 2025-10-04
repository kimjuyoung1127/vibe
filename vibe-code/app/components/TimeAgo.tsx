// TimeAgo.tsx
// This component displays time in a human-readable format (e.g., "2 days ago")
import React from 'react';

interface TimeAgoProps {
  dateString: string;
}

const TimeAgo: React.FC<TimeAgoProps> = ({ dateString }) => {
  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    // Check if the date string is valid
    const parsedDate = Date.parse(dateString);
    if (isNaN(parsedDate)) {
      return "Invalid date"; // Return a fallback string if the date is invalid
    }
    const past = new Date(dateString);
    const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (seconds > 60 * 60 * 24 * 7) {
      return past.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    
    let interval = seconds / 86400;
    if (interval > 1) {
      const days = Math.floor(interval);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
      const hours = Math.floor(interval);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    interval = seconds / 60;
    if (interval > 1) {
      const minutes = Math.floor(interval);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
    return 'just now';
  };

  return <span>{formatTimeAgo(dateString)}</span>;
};

export default TimeAgo;