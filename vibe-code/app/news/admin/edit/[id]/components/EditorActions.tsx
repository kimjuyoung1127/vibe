// components/EditorActions.tsx
import { useRouter } from 'next/navigation';

interface EditorActionsProps {
  saving: boolean;
  onSave: () => void;
}

const EditorActions: React.FC<EditorActionsProps> = ({ saving, onSave }) => {
  const router = useRouter();

  return (
    <div className="flex justify-end space-x-4">
      <button
        onClick={() => router.back()}
        className="px-4 py-2 border border-gray-300 rounded-lg text-[#161118] dark:text-[#f5f7f8] hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Cancel
      </button>
      <button
        onClick={onSave}
        disabled={saving}
        className={`px-4 py-2 rounded-lg text-white ${
          saving ? 'bg-gray-400' : 'bg-primary hover:bg-primary/90'
        }`}
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
};

export default EditorActions;