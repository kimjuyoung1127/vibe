import React from 'react';
import Link from 'next/link';

interface NewProjectButtonProps {
  isCollapsed: boolean;
}

const NewProjectButton: React.FC<NewProjectButtonProps> = ({ isCollapsed }) => {
  return (
    <Link href="/projects/create">
      <button
        className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-white shadow-md transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        {isCollapsed ? (
          <span className="material-symbols-outlined">add</span>
        ) : (
          <span className="truncate">New Project</span>
        )}
      </button>
    </Link>
  );
};

export default NewProjectButton;