// TechnologyStack.tsx
// This component displays the technology stack and tools used in the project
"use client";

import React from 'react';

const TechnologyStack = () => {
  const technologies = [
    { name: "React" },
    { name: "Node.js" },
    { name: "PostgreSQL" },
    { name: "Tailwind CSS" },
    { name: "Figma" }
  ];

  return (
    <div className="flex gap-3 p-3 flex-wrap pr-4">
      {technologies.map((tech, index) => (
        <div key={index} className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#f3f0f5] pl-4 pr-4">
          <p className="text-[#161118] text-sm font-medium leading-normal">{tech.name}</p>
        </div>
      ))}
    </div>
  );
};

export default TechnologyStack;