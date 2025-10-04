// components/EditorHeader.tsx
import { useRouter } from 'next/navigation';

interface EditorHeaderProps {
  articleId: string;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({ articleId }) => {
  const router = useRouter();

  return (
    <div className="mb-6">
      <button
        onClick={() => router.back()}
        className="flex items-center text-primary hover:underline mb-4"
      >
        <span className="material-symbols-outlined mr-1">arrow_back</span>
        <span>Back to Admin Dashboard</span>
      </button>
      
      <h1 className="text-3xl font-bold text-[#161118] dark:text-[#f5f7f8]">
        Edit News Article
      </h1>
      <p className="text-[#7c608a] dark:text-[#c5b3d1]">
        ID: {articleId}
      </p>
    </div>
  );
};

export default EditorHeader;