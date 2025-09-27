// components/ArticleEditor.tsx
import { NewsArticle } from '../../../types';
import { useState } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { toast } from 'react-hot-toast';
import ImageUpload from '@/app/components/ImageUpload';

interface ArticleEditorProps {
  article: NewsArticle | null;
  originalArticle: NewsArticle | null;
  setArticle: (article: NewsArticle) => void;
  setOriginalArticle: (article: NewsArticle) => void;
  handleSave: () => void;
  saving: boolean;
  handleInputChange: (field: keyof NewsArticle, value: any) => void;
}

const ArticleEditor: React.FC<ArticleEditorProps> = ({
  article,
  originalArticle,
  setArticle,
  setOriginalArticle,
  handleSave,
  saving,
  handleInputChange
}) => {
  if (!article) return null;

  // Handler for image upload success
  const handleImageUploadSuccess = (url: string) => {
    handleInputChange('hero_image_url', url);
  };

  // Handler for image upload error
  const handleImageUploadError = (error: string) => {
    toast.error(`Image upload error: ${error}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-[#161118] dark:text-[#f5f7f8] mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={article.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-[#e2dbe6] dark:border-[#1a1a2e] rounded-lg text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter article title"
        />
      </div>

      {/* Summary Field */}
      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-[#161118] dark:text-[#f5f7f8] mb-2">
          Summary
        </label>
        <textarea
          id="summary"
          value={article.summary}
          onChange={(e) => handleInputChange('summary', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-[#e2dbe6] dark:border-[#1a1a2e] rounded-lg text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter article summary"
        />
      </div>

      {/* Content Field */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-[#161118] dark:text-[#f5f7f8] mb-2">
          Content (Markdown)
        </label>
        <textarea
          id="content"
          value={article.content}
          onChange={(e) => handleInputChange('content', e.target.value)}
          rows={12}
          className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-[#e2dbe6] dark:border-[#1a1a2e] rounded-lg text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter article content in markdown format"
        />
      </div>

      {/* Source Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="source_name" className="block text-sm font-medium text-[#161118] dark:text-[#f5f7f8] mb-2">
            Source Name
          </label>
          <input
            type="text"
            id="source_name"
            value={article.source_name || ''}
            onChange={(e) => handleInputChange('source_name', e.target.value)}
            className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-[#e2dbe6] dark:border-[#1a1a2e] rounded-lg text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., TechCrunch, The Verge"
          />
        </div>
        <div>
          <label htmlFor="source_url" className="block text-sm font-medium text-[#161118] dark:text-[#f5f7f8] mb-2">
            Source URL
          </label>
          <input
            type="url"
            id="source_url"
            value={article.source_url}
            onChange={(e) => handleInputChange('source_url', e.target.value)}
            className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-[#e2dbe6] dark:border-[#1a1a2e] rounded-lg text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://example.com/article"
          />
        </div>
      </div>

      {/* Hero Image */}
      <div>
        <label className="block text-sm font-medium text-[#161118] dark:text-[#f5f7f8] mb-2">
          Hero Image (Optional)
        </label>
        <ImageUpload
          onUploadSuccess={handleImageUploadSuccess}
          onUploadError={handleImageUploadError}
          currentImageUrl={article.hero_image_url || undefined}
          bucketName="news_images"
          allowedFileTypes="image/*"
          maxFileSize={5}
        />
      </div>

      {/* Publishing Status */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="is_published"
          checked={article.is_published}
          onChange={(e) => handleInputChange('is_published', e.target.checked)}
          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
        />
        <label htmlFor="is_published" className="ml-2 block text-sm text-[#161118] dark:text-[#f5f7f8]">
          Published
        </label>
      </div>

      {/* Article Meta Information */}
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <h3 className="font-medium text-[#161118] dark:text-[#f5f7f8] mb-2">Article Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600 dark:text-gray-300">Created:</p>
            <p className="text-[#161118] dark:text-[#f5f7f8]">{new Date(article.created_at).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-300">Last Updated:</p>
            <p className="text-[#161118] dark:text-[#f5f7f8]">{new Date(article.updated_at).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-300">Crawled:</p>
            <p className="text-[#161118] dark:text-[#f5f7f8]">{new Date(article.crawled_at).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-300">Published:</p>
            <p className="text-[#161118] dark:text-[#f5f7f8]">
              {article.published_at ? new Date(article.published_at).toLocaleString() : 'Not published'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;