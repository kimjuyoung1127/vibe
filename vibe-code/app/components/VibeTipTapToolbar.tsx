// VibeTipTapToolbar.tsx
// Toolbar component for the TipTap editor with Vibe-specific formatting options

import React, { useState } from 'react';
import { Editor } from '@tiptap/core';

interface VibeTipTapToolbarProps {
  editor: Editor;
}

const VibeTipTapToolbar: React.FC<VibeTipTapToolbarProps> = ({
  editor
}) => {
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isFontSizeOpen, setIsFontSizeOpen] = useState(false);

  // Format handlers
  const handleBold = () => editor.chain().focus().toggleBold().run();
  const handleItalic = () => editor.chain().focus().toggleItalic().run();
  const handleUnderline = () => editor.chain().focus().toggleUnderline().run();
  const handleStrike = () => editor.chain().focus().toggleStrike().run();

  // Color handlers
  const handleColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
    setIsColorOpen(false);
  };

  const handleHighlight = (color: string) => {
    editor.chain().focus().toggleHighlight({ color }).run();
    setIsColorOpen(false);
  };

  // Font size handlers
  const handleFontSize = (size: string) => {
    editor.chain().focus().setMark('textStyle', { fontSize: size }).run();
    setIsFontSizeOpen(false);
  };



  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-[#f3f0f5] dark:bg-[#1a1a2e] border border-[#e2dbe6] dark:border-[#1a1a2e] rounded-lg mb-2">


      {/* Formatting Buttons */}
      <button
        onClick={handleBold}
        className={`p-2 rounded hover:bg-[#e2dbe6] dark:hover:bg-[#2a2a3e] text-[#161118] dark:text-[#f5f7f8] ${
          editor.isActive('bold') ? 'bg-[#e2dbe6] dark:bg-[#2a2a3e]' : ''
        }`}
        title="Bold"
        type="button"
      >
        <span className="font-bold">B</span>
      </button>
      
      <button
        onClick={handleItalic}
        className={`p-2 rounded hover:bg-[#e2dbe6] dark:hover:bg-[#2a2a3e] text-[#161118] dark:text-[#f5f7f8] ${
          editor.isActive('italic') ? 'bg-[#e2dbe6] dark:bg-[#2a2a3e]' : ''
        }`}
        title="Italic"
        type="button"
      >
        <span className="italic">I</span>
      </button>
      
      <button
        onClick={handleUnderline}
        className={`p-2 rounded hover:bg-[#e2dbe6] dark:hover:bg-[#2a2a3e] text-[#161118] dark:text-[#f5f7f8] ${
          editor.isActive('underline') ? 'bg-[#e2dbe6] dark:bg-[#2a2a3e]' : ''
        }`}
        title="Underline"
        type="button"
      >
        <span className="underline">U</span>
      </button>
      
      <button
        onClick={handleStrike}
        className={`p-2 rounded hover:bg-[#e2dbe6] dark:hover:bg-[#2a2a3e] text-[#161118] dark:text-[#f5f7f8] ${
          editor.isActive('strike') ? 'bg-[#e2dbe6] dark:bg-[#2a2a3e]' : ''
        }`}
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
          <div className="absolute z-10 mt-1 w-48 bg-white dark:bg-[#0f0f1a] shadow-lg rounded-md border border-[#e2dbe6] dark:border-[#1a1a2e] p-2">
            <div className="grid grid-cols-3 gap-1 mb-2">
              <button
                onClick={() => handleColor('#ff6b6b')}
                className="w-8 h-8 rounded-full bg-[#ff6b6b] hover:opacity-90"
                title="Red Color"
                type="button"
              ></button>
              <button
                onClick={() => handleColor('#9c27b0')}
                className="w-8 h-8 rounded-full bg-[#9c27b0] hover:opacity-90"
                title="Purple Color"
                type="button"
              ></button>
              <button
                onClick={() => handleColor('#00bcd4')}
                className="w-8 h-8 rounded-full bg-[#00bcd4] hover:opacity-90"
                title="Cyan Color"
                type="button"
              ></button>
              <button
                onClick={() => handleColor('#ff9800')}
                className="w-8 h-8 rounded-full bg-[#ff9800] hover:opacity-90"
                title="Orange Color"
                type="button"
              ></button>
              <button
                onClick={() => handleColor('#4caf50')}
                className="w-8 h-8 rounded-full bg-[#4caf50] hover:opacity-90"
                title="Green Color"
                type="button"
              ></button>
              <button
                onClick={() => handleColor('#e91e63')}
                className="w-8 h-8 rounded-full bg-[#e91e63] hover:opacity-90"
                title="Pink Color"
                type="button"
              ></button>
            </div>
            
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => handleHighlight('#ff6b6b')}
                className="w-8 h-8 rounded-full bg-[#ff6b6b] border-2 border-dashed border-gray-500 hover:opacity-90"
                title="Red Highlight"
                type="button"
              ></button>
              <button
                onClick={() => handleHighlight('#9c27b0')}
                className="w-8 h-8 rounded-full bg-[#9c27b0] border-2 border-dashed border-gray-500 hover:opacity-90"
                title="Purple Highlight"
                type="button"
              ></button>
              <button
                onClick={() => handleHighlight('#00bcd4')}
                className="w-8 h-8 rounded-full bg-[#00bcd4] border-2 border-dashed border-gray-500 hover:opacity-90"
                title="Cyan Highlight"
                type="button"
              ></button>
              <button
                onClick={() => handleHighlight('#ff9800')}
                className="w-8 h-8 rounded-full bg-[#ff9800] border-2 border-dashed border-gray-500 hover:opacity-90"
                title="Orange Highlight"
                type="button"
              ></button>
              <button
                onClick={() => handleHighlight('#4caf50')}
                className="w-8 h-8 rounded-full bg-[#4caf50] border-2 border-dashed border-gray-500 hover:opacity-90"
                title="Green Highlight"
                type="button"
              ></button>
              <button
                onClick={() => handleHighlight('#e91e63')}
                className="w-8 h-8 rounded-full bg-[#e91e63] border-2 border-dashed border-gray-500 hover:opacity-90"
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
                onClick={() => handleFontSize('0.8em')}
                className="px-2 py-1 text-sm text-left hover:bg-[#e2dbe6] dark:hover:bg-[#2a2a3e] rounded"
                title="Small"
                type="button"
              >
                Small
              </button>
              <button
                onClick={() => handleFontSize('1em')}
                className="px-2 py-1 text-base text-left hover:bg-[#e2dbe6] dark:hover:bg-[#2a2a3e] rounded"
                title="Normal"
                type="button"
              >
                Normal
              </button>
              <button
                onClick={() => handleFontSize('1.2em')}
                className="px-2 py-1 text-lg text-left hover:bg-[#e2dbe6] dark:hover:bg-[#2a2a3e] rounded"
                title="Large"
                type="button"
              >
                Large
              </button>
              <button
                onClick={() => handleFontSize('1.4em')}
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



      {/* Link button */}
      <button
        onClick={() => {
          const previousUrl = editor.getAttributes('link').href;
          const url = window.prompt('URL', previousUrl);
          if (url === null) return;
          if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
          }
          // Check if text is selected, if not, use the URL as link text
          const { from, to } = editor.state.selection;
          const selectedText = editor.state.doc.textBetween(from, to);
          
          if (!selectedText) {
            // If no text is selected, insert the URL as both text and link
            editor
              .chain()
              .focus()
              .insertContent(`<a href="${url}">${url}</a>`)
              .run();
          } else {
            // If text is selected, make it a link
            editor
              .chain()
              .focus()
              .extendMarkRange('link')
              .setLink({ href: url })
              .run();
          }
        }}
        className={`p-2 rounded hover:bg-[#e2dbe6] dark:hover:bg-[#2a2a3e] text-[#161118] dark:text-[#f5f7f8] ${
          editor.isActive('link') ? 'bg-[#e2dbe6] dark:bg-[#2a2a3e]' : ''
        }`}
        title="Link"
        type="button"
      >
        <span className="material-symbols-outlined">link</span>
      </button>
    </div>
  );
};

export default VibeTipTapToolbar;