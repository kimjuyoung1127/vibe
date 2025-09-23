// ProjectCard.tsx
// This component displays a single project card
"use client";

import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const ProjectCard = ({ title, description, imageUrl }: ProjectCardProps) => {
  return (
    <div className="bg-background-light/50 dark:bg-background-dark/50 rounded-xl overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_20px_rgba(13,166,242,0.1)] border border-primary/20 dark:border-primary/30 backdrop-blur-sm transform hover:-translate-y-2 transition-all duration-300">
      {/* Project image */}
      <div className="w-full h-48 flex items-center justify-center bg-white">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">No image</span>
          </div>
        )}
      </div>
      
      {/* Project information */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1 text-primary">{title}</h3>
        <p className="text-[#101c22]/70 dark:text-[#f5f7f8]/70">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;