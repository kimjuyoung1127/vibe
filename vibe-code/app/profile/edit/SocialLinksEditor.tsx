// SocialLinksEditor.tsx
// This component handles editing social media links
"use client";

import React, { useState } from 'react';

const SocialLinksEditor = () => {
  const [links, setLinks] = useState([
    { id: 1, name: 'GitHub', url: 'https://github.com/sophiacarter', icon: 'code' },
    { id: 2, name: 'LinkedIn', url: 'https://linkedin.com/in/sophiacarter', icon: 'work' },
    { id: 3, name: 'Personal Website', url: 'https://sophiacarter.dev', icon: 'link' }
  ]);

  const addLink = () => {
    setLinks([
      ...links,
      { id: links.length + 1, name: '', url: '', icon: 'link' }
    ]);
  };

  const updateLink = (id: number, field: 'name' | 'url', value: string) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const removeLink = (id: number) => {
    setLinks(links.filter(link => link.id !== id));
  };

  return (
    <div className="p-4 border-b border-primary/10 dark:border-primary/20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[#161118] dark:text-[#f5f7f8] text-[22px] font-bold leading-tight tracking-[-0.015em]">
          Social & External Links
        </h2>
        <button
          type="button"
          onClick={addLink}
          className="flex items-center gap-1 text-primary hover:text-primary/80"
        >
          <span className="material-symbols-outlined">add</span>
          <span>Add Link</span>
        </button>
      </div>
      
      <div className="space-y-4">
        {links.map((link) => (
          <div key={link.id} className="flex gap-3">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label htmlFor={`link-name-${link.id}`} className="block text-sm font-medium text-[#161118] dark:text-[#f5f7f8] mb-1">
                  Platform Name
                </label>
                <input
                  type="text"
                  id={`link-name-${link.id}`}
                  value={link.name}
                  onChange={(e) => updateLink(link.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-[#e2dbe6] dark:border-[#1a1a2e] rounded-lg text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Twitter, Dribbble"
                />
              </div>
              
              <div>
                <label htmlFor={`link-url-${link.id}`} className="block text-sm font-medium text-[#161118] dark:text-[#f5f7f8] mb-1">
                  URL
                </label>
                <input
                  type="url"
                  id={`link-url-${link.id}`}
                  value={link.url}
                  onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                  className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-[#e2dbe6] dark:border-[#1a1a2e] rounded-lg text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://example.com"
                />
              </div>
            </div>
            
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => removeLink(link.id)}
                className="p-2 text-red-500 hover:text-red-700"
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialLinksEditor;