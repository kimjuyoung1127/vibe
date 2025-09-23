// LinksSection.tsx
// This component contains the project links section of the project create form
"use client";

import React from 'react';

// Define the props interface
interface LinksSectionProps {
  githubUrl: string;
  setGithubUrl: (url: string) => void;
  liveDemoUrl: string;
  setLiveDemoUrl: (url: string) => void;
  deploymentPlatform: string;
  setDeploymentPlatform: (platform: string) => void;
}

const LinksSection = ({
  githubUrl,
  setGithubUrl,
  liveDemoUrl,
  setLiveDemoUrl,
  deploymentPlatform,
  setDeploymentPlatform
}: LinksSectionProps) => {

  return (
    <div>
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Project Links</h2>
      
      {/* GitHub Repository */}
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#161118] text-base font-medium leading-normal pb-2">GitHub Repository</p>
          <input
            placeholder="Enter GitHub repository URL"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#161118] focus:outline-0 focus:ring-0 border-none bg-[#f3f0f5] focus:border-none h-14 placeholder:text-[#7c608a] p-4 text-base font-normal leading-normal"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
          />
        </label>
      </div>
      
      {/* Live Demo */}
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#161118] text-base font-medium leading-normal pb-2">Live Demo</p>
          <input
            placeholder="Enter live demo URL"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#161118] focus:outline-0 focus:ring-0 border-none bg-[#f3f0f5] focus:border-none h-14 placeholder:text-[#7c608a] p-4 text-base font-normal leading-normal"
            value={liveDemoUrl}
            onChange={(e) => setLiveDemoUrl(e.target.value)}
          />
        </label>
      </div>
      
      {/* Deployment Platform */}
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#161118] text-base font-medium leading-normal pb-2">Deployment Platform</p>
          <input
            placeholder="Enter deployment platform (e.g., Netlify, Vercel)"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#161118] focus:outline-0 focus:ring-0 border-none bg-[#f3f0f5] focus:border-none h-14 placeholder:text-[#7c608a] p-4 text-base font-normal leading-normal"
            value={deploymentPlatform}
            onChange={(e) => setDeploymentPlatform(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

export default LinksSection;