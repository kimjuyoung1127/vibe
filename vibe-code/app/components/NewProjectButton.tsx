import React from 'react';
import Link from 'next/link';

interface NewProjectButtonProps {
  isCollapsed: boolean;
}

const NewProjectButton: React.FC<NewProjectButtonProps> = ({ isCollapsed }) => {
  return (
    <Link href="/projects/create">
      <button
        className="flex h-16 items-center justify-center whitespace-nowrap rounded-lg bg-primary px-10 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-primary/40"
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