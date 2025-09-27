

"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { NewsArticle } from './types';
import AdminHeader from './components/AdminHeader';
import ArticleList from './components/ArticleList';
import QuickActions from './components/QuickActions';

const NewsAdminPage = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      // In a real app, you'd have a user role system.
      // For now, we'll allow all authenticated users.
      setIsAdmin(true);
    };
    
    checkAdmin();
  }, [router]);

  useEffect(() => {
    if (!isAdmin) return;
    
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from('news_articles')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        setArticles(data || []);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [isAdmin]);

  const handlePublish = async (id: string) => {
    try {
      const { error } = await supabase
        .from('news_articles')
        .update({ 
          is_published: true, 
          published_at: new Date().toISOString() 
        })
        .eq('id', id);

      if (error) throw error;

      setArticles(articles.map(article => 
        article.id === id 
          ? { ...article, is_published: true, published_at: new Date().toISOString() } 
          : article
      ));
    } catch (err) {
      console.error('Error publishing article:', err);
      setError('Failed to publish article');
    }
  };

  const handleUnpublish = async (id: string) => {
    try {
      const { error } = await supabase
        .from('news_articles')
        .update({ is_published: false, published_at: null })
        .eq('id', id);

      if (error) throw error;

      setArticles(articles.map(article => 
        article.id === id 
          ? { ...article, is_published: false, published_at: null } 
          : article
      ));
    } catch (err) {
      console.error('Error unpublishing article:', err);
      setError('Failed to unpublish article');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('news_articles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setArticles(articles.filter(article => article.id !== id));
    } catch (err) {
      console.error('Error deleting article:', err);
      setError('Failed to delete article');
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Access Denied</h2>
          <p>You must be logged in as an admin to access this page.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <AdminHeader 
        title="News Admin Dashboard" 
        description="Review and manage news articles. Published articles appear on the news page." 
      />
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <ArticleList 
        articles={articles}
        handlePublish={handlePublish}
        handleUnpublish={handleUnpublish}
        handleDelete={handleDelete}
      />
      
      <QuickActions />
    </div>
  );
};

export default NewsAdminPage;