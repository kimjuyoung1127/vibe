// VibeFormattingToolbar.tsx
// Toolbar component for Vibe-specific text formatting options

import React, { useState, useRef, useEffect } from 'react';

interface VibeFormattingToolbarProps {
  onFormat: (format: string) => void;
  onInsert: (content: string) => void;
  currentFont: string;
  onFontChange: (font: string) => void;
}

const VibeFormattingToolbar: React.FC<VibeFormattingToolbarProps> = ({
  onFormat,
  onInsert,
  currentFont,
  onFontChange
}) => {
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isFontSizeOpen, setIsFontSizeOpen] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolbarRef.current && !toolbarRef.current.contains(event.target as Node)) {
        setIsColorOpen(false);
        setIsFontSizeOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFormatClick = (format: string) => {
    onFormat(format);
    setIsColorOpen(false);
    setIsFontSizeOpen(false);
  };

  const handleInsertClick = (content: string) => {
    onInsert(content);
    setIsColorOpen(false);
    setIsFontSizeOpen(false);
  };

  const handleFontSizeClick = (size: string) => {
    // For markdown, we'll apply custom classes to achieve font size changes
    onFormat(`font-size-${size}`);
    setIsFontSizeOpen(false);
  };

  const handleColorClick = (color: string) => {
    onFormat(`highlight-${color}`);
    setIsColorOpen(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-[#f3f0f5] dark:bg-[#1a1a2e] border border-[#e2dbe6] dark:border-[#1a1a2e] rounded-lg mb-2" ref={toolbarRef}>
      {/* Font Selection */}
      <div className="relative">
        <select
          value={currentFont}
          onChange={(e) => onFontChange(e.target.value)}
          className="px-3 py-1.5 rounded text-sm bg-white dark:bg-[#0f0f1a] border border-[#e2dbe6] dark:border-[#1a1a2e] text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="Modern Sans-serif">Modern Sans-serif</option>
          <option value="Retro Casual">Retro Casual</option>
        </select>
      </div>

      {/* Separator */}
      <div className="w-px h-6 bg-[#e2dbe6] dark:bg-[#1a1a2e] mx-1"></div>

      {/* Formatting Buttons */}
      <button
        onClick={() => handleFormatClick('bold')}
        className="p-2 rounded hover:bg-[#e2dbe6] dark:hover:bg-[#2a2a3e] text-[#161118] dark:text-[#f5f7f8]"
        title="Bold"
        type="button"
      >
        <span className="font-bold">B</span>
      </button>
      
      <button
        onClick={() => handleFormatClick('italic')}
        className="p-2 rounded hover:bg-[#e2dbe6] dark:hover:bg-[#2a2a3e] text-[#161118] dark:text-[#f5f7f8]"
        title="Italic"
        type="button"
      >
        <span className="italic">I</span>
      </button>
      
      <button
        onClick={() => handleFormatClick('underline')}
        className="p-2 rounded hover:bg-[#e2dbe6] dark:hover:bg-[#2a2a3e] text-[#161118] dark:text-[#f5f7f8]"
        title="Underline"
        type="button"
      >
        <span className="underline">U</span>
      </button>
      
      <button
        onClick={() => handleFormatClick('strikethrough')}
        className="p-2 rounded hover:bg-[#e2dbe6] dark:hover:bg-[#2a2a3e] text-[#161118] dark:text-[#f5f7f8]"
        title="Strikethrough"
        type="button"
      >
        <span className="line-through">S</span>
      </button>

      {/* Separator */}
      <div className="w-px h-6 bg-[#e2dbe6] dark:bg-[#1a1a2e] mx-1"></div>

      {/* Pop Color Highlight - Now as a dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsColorOpen(!isColorOpen)}
          className="p-2 rounded hover:bg-[#e2dbe6] dark:hover:bg-[#2a2a3e] text-[#161118] dark:text-[#f5f7f8]"
          title="Pop Color Highlight"
          type="button"
        >
          <span className="material-symbols-outlined">format_color_fill</span>
        </button>
        
        {isColorOpen && (
          <div className="absolute z-10 mt-1 w-40 bg-white dark:bg-[#0f0f1a] shadow-lg rounded-md border border-[#e2dbe6] dark:border-[#1a1a2e] p-2">
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => handleColorClick('red')}
                className="w-8 h-8 rounded-full bg-[#ff6b6b] hover:opacity-90"
                title="Red Highlight"
                type="button"
              ></button>
              <button
                onClick={() => handleColorClick('purple')}
                className="w-8 h-8 rounded-full bg-[#9c27b0] hover:opacity-90"
                title="Purple Highlight"
                type="button"
              ></button>
              <button
                onClick={() => handleColorClick('cyan')}
                className="w-8 h-8 rounded-full bg-[#00bcd4] hover:opacity-90"
                title="Cyan Highlight"
                type="button"
              ></button>
              <button
                onClick={() => handleColorClick('orange')}
                className="w-8 h-8 rounded-full bg-[#ff9800] hover:opacity-90"
                title="Orange Highlight"
                type="button"
              ></button>
              <button
                onClick={() => handleColorClick('green')}
                className="w-8 h-8 rounded-full bg-[#4caf50] hover:opacity-90"
                title="Green Highlight"
                type="button"
              ></button>
              <button
                onClick={() => handleColorClick('pink')}
                className="w-8 h-8 rounded-full bg-[#e91e63] hover:opacity-90"
                title="Pink Highlight"
                type="button"
              ></button>
            </div>
          </div>
        )}
      </div>

      {/* Font Size Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsFontSizeOpen(!isFontSizeOpen)}
          className="p-2 rounded hover:bg-[#e2dbe6] dark:hover:bg-[#2a2a3e] text-[#161118] dark:text-[#f5f7f8]"
          title="Font Size"
          type="button"
        >
          <span className="material-symbols-outlined">format_size</span>
        </button>
        
        {isFontSizeOpen && (
          <div className="absolute z-10 mt-1 w-32 bg-white dark:bg-[#0f0f1a] shadow-lg rounded-md border border-[#e2dbe6] dark:border-[#1a1a2e] p-2">
            <div className="flex flex-col gap-1">
              <button
                onClick={() => handleFontSizeClick('small')}
                className="px-2 py-1 text-sm text-left hover:bg-[#e2dbe6] dark:hover:bg-[#2a2a3e] rounded"
                title="Small"
                type="button"
              >
                Small
              </button>
              <button
                onClick={() => handleFontSizeClick('normal')}
                className="px-2 py-1 text-base text-left hover:bg-[#e2dbe6] dark:hover:bg-[#2a2a3e] rounded"
                title="Normal"
                type="button"
              >
                Normal
              </button>
              <button
                onClick={() => handleFontSizeClick('large')}
                className="px-2 py-1 text-lg text-left hover:bg-[#e2dbe6] dark:hover:bg-[#2a2a3e] rounded"
                title="Large"
                type="button"
              >
                Large
              </button>
              <button
                onClick={() => handleFontSizeClick('xlarge')}
                className="px-2 py-1 text-xl text-left hover:bg-[#e2dbe6] dark:hover:bg-[#2a2a3e] rounded"
                title="Extra Large"
                type="button"
              >
                Extra Large
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Separator */}
      <div className="w-px h-6 bg-[#e2dbe6] dark:bg-[#1a1a2e] mx-1"></div>

      {/* Vibe-specific formatting */}
      <button
        onClick={() => handleInsertClick('<div class="vibe-alert">\nAlert message\n</div>')}
        className="p-2 rounded hover:bg-[#e2dbe6] dark:hover:bg-[#2a2a3e] text-[#161118] dark:text-[#f5f7f8]"
        title="Alert Box"
        type="button"
      >
        <span className="material-symbols-outlined">warning</span>
      </button>
      
      <button
        onClick={() => handleInsertClick('<div class="vibe-info">\nInfo message\n</div>')}
        className="p-2 rounded hover:bg-[#e2dbe6] dark:hover:bg-[#2a2a3e] text-[#161118] dark:text-[#f5f7f8]"
        title="Info Box"
        type="button"
      >
        <span className="material-symbols-outlined">info</span>
      </button>
      
      <button
        onClick={() => handleInsertClick('<div class="vibe-pixel-banner">PIXEL BANNER</div>')}
        className="p-2 rounded hover:bg-[#e2dbe6] dark:hover:bg-[#2a2a3e] text-[#161118] dark:text-[#f5f7f8]"
        title="Pixel Art Banner"
        type="button"
      >
        <span className="material-symbols-outlined">theaters</span>
      </button>
      
      <button
        onClick={() => handleInsertClick('<div class="vibe-code-block">\ncode\n</div>')}
        className="p-2 rounded hover:bg-[#e2dbe6] dark:hover:bg-[#2a2a3e] text-[#161118] dark:text-[#f5f7f8]"
        title="Colorful Code Block"
        type="button"
      >
        <span className="material-symbols-outlined">code</span>
      </button>
    </div>
  );
};

export default VibeFormattingToolbar;