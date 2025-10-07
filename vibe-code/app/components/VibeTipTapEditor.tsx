'use client';

import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Paragraph from '@tiptap/extension-paragraph';
import { Node } from '@tiptap/core';

import VibeTipTapToolbar from './VibeTipTapToolbar';
import { ContentRendererProps } from '@/app/types/components';

interface VibeTipTapEditorProps extends ContentRendererProps {
  initialContent?: string;
  onContentChange?: (content: string) => void;
}

// Custom Paragraph with margin-bottom
const CustomParagraph = Paragraph.extend({
  addAttributes() {
    return {
      marginBottom: {
        default: '1rem',
        parseHTML: (el: HTMLElement) => el.getAttribute('data-margin-bottom') || '1rem',
        renderHTML: (attrs: { marginBottom: string }) => ({
          'data-margin-bottom': attrs.marginBottom,
          style: `margin-bottom: ${attrs.marginBottom};`,
        }),
      },
    };
  },
});





const VibeTipTapEditor: React.FC<VibeTipTapEditorProps> = ({
  initialContent = '',
  onContentChange,
  maxWidthClass = 'max-w-[65ch]',
  containerClass = 'max-w-[672px] md:max-w-[768px] lg:max-w-[896px] xl:max-w-[960px] mx-auto',
}) => {


  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start typing your content here... Use the formatting toolbar above.',
      }),
      TextStyle,
      Color,
      Highlight,
      Image,
      Link.configure({ openOnClick: false }),
      CustomParagraph,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onContentChange?.(editor.getHTML());
    },
    immediatelyRender: false,
    onFocus: ({ editor }) => {
      // Only focus when user actually interacts with the editor, not during font selection
    }
  });

  useEffect(() => {
    if (editor && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);







  if (!editor) return <div>Loading editor...</div>;

  return (
    <div 
      className={`break-words px-4 pb-6 text-[#161118] dark:text-[#f5f7f8] ${containerClass} pt-6`}
      onClick={() => editor?.commands.focus()}
    >
      <VibeTipTapToolbar
        editor={editor}
      />
      <div 
        className="border border-[#e2dbe6] dark:border-[#1a1a2e] rounded-lg overflow-hidden relative"
        onClick={() => editor?.commands.focus()}
      >
        <EditorContent
          editor={editor}
          className="w-full min-h-[300px] p-4 border-0 focus:ring-0 resize-none text-base leading-relaxed bg-white dark:bg-[#0f0f1a] text-[#161118] dark:text-[#f5f7f8] break-words font-sans"
        />
        <div className="absolute top-4 right-4 bg-primary/10 dark:bg-primary/20 text-primary/80 text-xs px-2 py-1 rounded">
          Edit mode 
        </div>
      </div>
    </div>
  );
};

export default VibeTipTapEditor;