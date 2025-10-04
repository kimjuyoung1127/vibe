// components/ArticleNotFound.tsx
import { useRouter } from 'next/navigation';

const ArticleNotFound: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Article Not Found</h2>
        <p className="mb-4">The requested article could not be found.</p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Back to Admin Dashboard
        </button>
      </div>
    </div>
  );
};

export default ArticleNotFound;