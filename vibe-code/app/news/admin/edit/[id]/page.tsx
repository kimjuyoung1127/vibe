"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { NewsArticle } from '../../types';
import ArticleEditor from './components/ArticleEditor';
import EditorHeader from './components/EditorHeader';
import EditorActions from './components/EditorActions';
import EditorContainer from './components/EditorContainer';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import ArticleNotFound from './components/ArticleNotFound';
import AccessDenied from './components/AccessDenied';
import DeleteArticleButton from './components/DeleteArticleButton';

const EditNewsArticlePage = () => {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [originalArticle, setOriginalArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setIsAdmin(true); // In a real app, you'd check user roles
    };
    
    checkAdmin();
  }, [router]);

  useEffect(() => {
    if (!isAdmin || !id) return;
    
    const fetchArticle = async () => {
      try {
        const { data, error } = await supabase
          .from('news_articles')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        
        setArticle(data);
        setOriginalArticle(data);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, isAdmin]);

  const handleSave = async () => {
    if (!article || !originalArticle) return;
    
    setSaving(true);
    setError(null);
    
    try {
      const updates: Partial<NewsArticle> = {};
      
      if (article.title !== originalArticle.title) updates.title = article.title;
      if (article.summary !== originalArticle.summary) updates.summary = article.summary;
      if (article.content !== originalArticle.content) updates.content = article.content;
      if (article.hero_image_url !== originalArticle.hero_image_url) updates.hero_image_url = article.hero_image_url;
      if (article.source_name !== originalArticle.source_name) updates.source_name = article.source_name;
      if (article.source_url !== originalArticle.source_url) updates.source_url = article.source_url;
      if (article.is_published !== originalArticle.is_published) updates.is_published = article.is_published;
      
      if (Object.keys(updates).length > 0) {
        updates.updated_at = new Date().toISOString();
        const { error } = await supabase
          .from('news_articles')
          .update(updates)
          .eq('id', article.id);

        if (error) throw error;
        
        setOriginalArticle({...article, ...updates});
        
        toast.success('Article updated successfully');
      } else {
        toast('No changes to save', { icon: 'ℹ️' });
      }
    } catch (err) {
      console.error('Error saving article:', err);
      setError('Failed to save article');
      toast.error('Failed to save article');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof NewsArticle, value: any) => {
    setArticle(prev => prev ? { ...prev, [field]: value } : null);
  };

  if (!isAdmin) {
    return <AccessDenied />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!article) {
    return <ArticleNotFound />;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <EditorHeader articleId={article.id} />

      <ErrorMessage message={error} />

      <EditorContainer>
        <ArticleEditor
          article={article}
          originalArticle={originalArticle}
          setArticle={setArticle}
          setOriginalArticle={setOriginalArticle}
          handleSave={handleSave}
          saving={saving}
          handleInputChange={(field: string, value: any) => handleInputChange(field as keyof NewsArticle, value)}
        />

        <div className="flex justify-between p-6 border-t border-gray-200 dark:border-gray-700">
          <DeleteArticleButton articleId={article.id} />
          <EditorActions
            saving={saving}
            onSave={handleSave}
          />
        </div>
      </EditorContainer>
    </div>
  );
};

export default EditNewsArticlePage;