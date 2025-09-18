'use client';

import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import '@/app/globals.css';

// 마크다운 렌더러를 동적으로 임포트 (클라이언트 사이드에서만 로드)
const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });
const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter').then(mod => mod.Prism), { ssr: false });
const { oneDark } = require('react-syntax-highlighter/dist/cjs/styles/prism');

const VibeEditor = () => {
  const { session } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [activeFont, setActiveFont] = useState('modern');
  const [activeTool, setActiveTool] = useState('terminal');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 폰트 변경 핸들러
  const handleFontChange = (font: string) => {
    setActiveFont(font);
  };

  // 툴바 버튼 클릭 핸들러
  const handleToolClick = (tool: string) => {
    setActiveTool(tool);
    
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let insertedText = '';
    
    switch (tool) {
      case 'neon':
        insertedText = `<span class="neon-highlight">${selectedText || 'Neon Text'}</span>`;
        break;
      case 'info':
        insertedText = `<div class="info-box">${selectedText || 'Info content'}</div>`;
        break;
      case 'warning':
        insertedText = `<div class="warning-box">${selectedText || 'Warning content'}</div>`;
        break;
      case 'banner':
        insertedText = `<div class="banner-8bit">${selectedText || '8-BIT BANNER'}</div>`;
        break;
      case 'terminal':
        insertedText = `\`\`\`terminal
${selectedText || 'command'}
\`\`\``;
        break;
      default:
        return;
    }
    
    const newContent = content.substring(0, start) + insertedText + content.substring(end);
    setContent(newContent);
    
    // 커서 위치 조정
    setTimeout(() => {
      if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(start + insertedText.length, start + insertedText.length);
      }
    }, 0);
  };

  // 게시물 저장 핸들러
  const handleSave = () => {
    // 실제 구현에서는 여기에 Supabase에 저장하는 로직이 들어갑니다.
    console.log('Saving post:', { title, content, font: activeFont });
    alert('Post saved successfully!');
    router.push('/showcase');
  };

  // 게시물 발행 핸들러
  const handlePublish = () => {
    // 실제 구현에서는 여기에 Supabase에 저장하고 공개 상태로 설정하는 로직이 들어갑니다.
    console.log('Publishing post:', { title, content, font: activeFont });
    alert('Post published successfully!');
    router.push('/showcase');
  };

  // 마크다운 렌더러 커스터마이징
  const renderers = {
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      
      if (!inline && match && match[1] === 'terminal') {
        return (
          <div className="terminal-block">
            <div className="terminal-header">
              <div className="terminal-dot bg-red-500"></div>
              <div className="terminal-dot bg-yellow-500"></div>
              <div className="terminal-dot bg-green-500"></div>
            </div>
            <pre className="!p-0 !m-0 bg-transparent">
              <code className="language-javascript text-[#00FF41]">{children}</code>
            </pre>
          </div>
        );
      } else if (!inline && match) {
        return (
          <SyntaxHighlighter
            style={oneDark}
            language={match[1]}
            PreTag="div"
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        );
      } else {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }
    },
    // span 태그에 클래스 적용을 위해 components를 사용
    span: ({ node, className, children, ...props }: any) => {
      if (className === 'neon-highlight') {
        return <span className="neon-highlight" {...props}>{children}</span>;
      }
      return <span {...props}>{children}</span>;
    },
    // div 태그에 클래스 적용을 위해 components를 사용
    div: ({ node, className, children, ...props }: any) => {
      if (className === 'info-box') {
        return <div className="info-box" {...props}>{children}</div>;
      }
      if (className === 'warning-box') {
        return <div className="warning-box" {...props}>{children}</div>;
      }
      if (className === 'banner-8bit') {
        return <div className="banner-8bit" {...props}>{children}</div>;
      }
      return <div {...props}>{children}</div>;
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[var(--background-color)] text-white font-modern">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Create New Post</h2>
          <p className="text-[var(--secondary-color)] text-base mb-8">Share your project experiences, code snippets, and design philosophies with the Vibe Code community.</p>
          <div className="bg-[var(--surface-color)] rounded-lg shadow-lg shadow-[var(--primary-color)]/20 border border-[var(--border-color)]">
            <div className="p-4 border-b border-[var(--border-color)]">
              <input
                className="w-full bg-transparent text-2xl font-bold text-white placeholder-[var(--secondary-color)]/50 focus:ring-0 border-0 p-0"
                placeholder="Enter post title here..."
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="p-4 border-b border-[var(--border-color)] flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1">
                <button className="p-2 rounded hover:bg-[var(--border-color)] text-[var(--secondary-color)] hover:text-white transition-colors" title="Bold">
                  <span className="material-symbols-outlined text-xl">format_bold</span>
                </button>
                <button className="p-2 rounded hover:bg-[var(--border-color)] text-[var(--secondary-color)] hover:text-white transition-colors" title="Italic">
                  <span className="material-symbols-outlined text-xl">format_italic</span>
                </button>
                <button className="p-2 rounded hover:bg-[var(--border-color)] text-[var(--secondary-color)] hover:text-white transition-colors" title="Link">
                  <span className="material-symbols-outlined text-xl">link</span>
                </button>
                <button className="p-2 rounded hover:bg-[var(--border-color)] text-[var(--secondary-color)] hover:text-white transition-colors" title="List">
                  <span className="material-symbols-outlined text-xl">format_list_bulleted</span>
                </button>
              </div>
              <div className="h-6 w-px bg-[var(--border-color)] mx-2"></div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[var(--secondary-color)] mr-2">Vibe Tools:</span>
                <button
                  className={`vibe-tool-button p-2 rounded text-[var(--secondary-color)] ${activeTool === 'neon' ? 'active' : ''}`}
                  title="Neon Highlight"
                  onClick={() => handleToolClick('neon')}
                >
                  <span className="material-symbols-outlined text-xl">format_paint</span>
                </button>
                <button
                  className={`vibe-tool-button p-2 rounded text-[var(--secondary-color)] ${activeTool === 'info' ? 'active' : ''}`}
                  title="Info Box"
                  onClick={() => handleToolClick('info')}
                >
                  <span className="material-symbols-outlined text-xl">info</span>
                </button>
                <button
                  className={`vibe-tool-button p-2 rounded text-[var(--secondary-color)] ${activeTool === 'warning' ? 'active' : ''}`}
                  title="Warning Box"
                  onClick={() => handleToolClick('warning')}
                >
                  <span className="material-symbols-outlined text-xl">warning</span>
                </button>
                <button
                  className={`vibe-tool-button p-2 rounded text-[var(--secondary-color)] ${activeTool === 'banner' ? 'active' : ''}`}
                  title="8-Bit Banner"
                  onClick={() => handleToolClick('banner')}
                >
                  <span className="material-symbols-outlined text-xl">view_carousel</span>
                </button>
                <button
                  className={`vibe-tool-button p-2 rounded text-[var(--secondary-color)] ${activeTool === 'terminal' ? 'active' : ''}`}
                  title="Terminal Code Block"
                  onClick={() => handleToolClick('terminal')}
                >
                  <span className="material-symbols-outlined text-xl">terminal</span>
                </button>
              </div>
              <div className="flex-grow"></div>
              <div className="flex items-center gap-2">
                <button
                  className={`px-3 py-1 rounded text-sm font-semibold transition-colors ${activeFont === 'retro' ? 'bg-[var(--primary-color)]' : 'bg-[var(--border-color)] hover:bg-[var(--primary-color)]'}`}
                  onClick={() => handleFontChange('retro')}
                >
                  Retro
                </button>
                <button
                  className={`px-3 py-1 rounded text-sm font-semibold transition-colors ${activeFont === 'modern' ? 'bg-[var(--primary-color)]' : 'bg-[var(--border-color)] hover:bg-[var(--primary-color)]'}`}
                  onClick={() => handleFontChange('modern')}
                >
                  Modern
                </button>
              </div>
            </div>
            <div className="p-4">
              <textarea
                ref={textareaRef}
                className={`editor-textarea w-full h-96 resize-none bg-transparent text-white placeholder-[var(--secondary-color)]/50 focus:ring-0 border-0 p-0 ${activeFont === 'retro' ? 'font-retro' : 'font-modern'}`}
                placeholder="Start writing your post in Markdown... Add some vibe!"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="p-4 border-t border-[var(--border-color)]">
              <h3 className="text-lg font-bold mb-4 text-[var(--secondary-color)]">Live Preview</h3>
              <div className="prose prose-invert max-w-none text-gray-300">
                <ReactMarkdown components={renderers}>{content}</ReactMarkdown>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-4">
            <button
              className="min-w-[120px] rounded-md h-10 px-4 bg-[var(--surface-color)] hover:bg-[var(--border-color)] text-sm font-bold transition-colors"
              onClick={handleSave}
            >
              Save Draft
            </button>
            <button
              className="min-w-[120px] rounded-md h-10 px-4 bg-[var(--primary-color)] vibe-check-button text-white text-sm font-bold"
              onClick={handlePublish}
            >
              Publish Post
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VibeEditor;