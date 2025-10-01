// C:\Users\gmdqn\vibe\vibe-code\app\components\Accordion.tsx
"use client";

import React, { useState, ReactNode } from 'react';

interface AccordionProps {
  title: string;
  children: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full rounded-xl bg-background-light/50 dark:bg-background-dark/50 border border-primary/20 dark:border-primary/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 font-medium text-left"
      >
        <span>{title}</span>
        <span className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
      >
        <div className="p-4 border-t border-primary/20">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;