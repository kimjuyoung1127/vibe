// components/DeleteArticleButton.tsx
import { useState } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface DeleteArticleButtonProps {
  articleId: string;
}

const DeleteArticleButton: React.FC<DeleteArticleButtonProps> = ({ articleId }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);

    try {
      const { error } = await supabase
        .from('news_articles')
        .delete()
        .eq('id', articleId);

      if (error) throw error;

      toast.success('Article deleted successfully');
      router.push('/news/admin'); // Redirect to admin dashboard after deletion
    } catch (err) {
      console.error('Error deleting article:', err);
      toast.error('Failed to delete article');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`px-4 py-2 rounded-lg text-white ${isDeleting ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'}`}
    >
      {isDeleting ? 'Deleting...' : 'Delete Article'}
    </button>
  );
};

export default DeleteArticleButton;