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
  initialFontPreference?: string;
  onContentChange?: (content: string) => void;
  onFontChange?: (font: string) => void;
}

// Custom Paragraph with margin-bottom
const CustomParagraph = Paragraph.extend({
  addAttributes() {
    return {
      marginBottom: {
        default: '1rem',
        parseHTML: el => el.getAttribute('data-margin-bottom') || '1rem',
        renderHTML: attrs => ({
          'data-margin-bottom': attrs.marginBottom,
          style: `margin-bottom: ${attrs.marginBottom};`,
        }),
      },
    };
  },
});

// Custom FontSize extension
const FontSize = TextStyle.extend({
  addAttributes() {
    return {
      fontSize: {
        default: null,
        parseHTML: (el: { style: { fontSize: any; }; getAttribute: (arg0: string) => any; }) => el.style.fontSize || el.getAttribute('data-font-size'),
        renderHTML: (attrs: { fontSize: any; }) =>
          attrs.fontSize
            ? {
                style: `font-size: ${attrs.fontSize};`,
                'data-font-size': attrs.fontSize,
              }
            : {},
      },
    };
  },
});

// Vibe-specific block nodes
const createVibeBlockNode = (name: string, className: string) =>
  Node.create({
    name,
    group: 'block',
    content: 'inline*',
    parseHTML() {
      return [{ tag: 'div', getAttrs: node => node.classList.contains(className) ? {} : false }];
    },
    renderHTML({ HTMLAttributes }) {
      return ['div', { ...HTMLAttributes, class: className }, 0];
    },
    addCommands() {
      return {
        [`set${name}`]: () => ({ commands }: { commands: any }) => commands.setNode(name),
        [`toggle${name}`]: () => ({ commands }: { commands: any }) => commands.toggleNode(name),
      };
    },
  });

const VibeAlert = createVibeBlockNode('vibeAlert', 'vibe-alert');
const VibeInfo = createVibeBlockNode('vibeInfo', 'vibe-info');
const VibePixelBanner = createVibeBlockNode('vibePixelBanner', 'vibe-pixel-banner');
const VibeCodeBlock = createVibeBlockNode('vibeCodeBlock', 'vibe-code-block');

const VibeTipTapEditor: React.FC<VibeTipTapEditorProps> = ({
  initialContent = '',
  initialFontPreference = 'Modern Sans-serif',
  onContentChange,
  onFontChange,
  maxWidthClass = 'max-w-[65ch]',
  containerClass = 'max-w-[672px] md:max-w-[768px] lg:max-w-[896px] xl:max-w-[960px] mx-auto',
}) => {
  const [fontPreference, setFontPreference] = useState(initialFontPreference);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start typing your content here... Use the formatting toolbar above.',
      }),
      TextStyle,
      FontSize,
      Color,
      Highlight,
      Image,
      Link.configure({ openOnClick: false }),
      CustomParagraph,
      VibeAlert,
      VibeInfo,
      VibePixelBanner,
      VibeCodeBlock,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onContentChange?.(editor.getHTML());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  useEffect(() => {
    setFontPreference(initialFontPreference);
  }, [initialFontPreference]);

  const handleFontChange = (font: string) => {
    setFontPreference(font);
    onFontChange?.(font);
  };

  const applyVibeFormatting = (format: string) => {
    if (!editor) return;
    editor.chain().focus().setNode(format).run();
  };

  if (!editor) return <div>Loading editor...</div>;

  return (
    <div className={`break-words px-4 pb-6 text-[#161118] dark:text-[#f5f7f8] ${containerClass} pt-6`}>
      <VibeTipTapToolbar
        editor={editor}
        currentFont={fontPreference}
        onFontChange={handleFontChange}
        onVibeFormatting={applyVibeFormatting}
      />
      <div className="border border-[#e2dbe6] dark:border-[#1a1a2e] rounded-lg overflow-hidden relative">
        <EditorContent
          editor={editor}
          className="w-full min-h-[300px] p-4 border-0 focus:ring-0 resize-none text-base leading-relaxed bg-white dark:bg-[#0f0f1a] text-[#161118] dark:text-[#f5f7f8] font-sans break-words"
        />
        <div className="absolute top-4 right-4 bg-primary/10 dark:bg-primary/20 text-primary/80 text-xs px-2 py-1 rounded">
          Edit mode - TipTap editor
        </div>
      </div>
    </div>
  );
};

export default VibeTipTapEditor;