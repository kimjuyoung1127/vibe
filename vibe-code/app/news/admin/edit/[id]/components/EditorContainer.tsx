// components/EditorContainer.tsx
interface EditorContainerProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const EditorContainer: React.FC<EditorContainerProps> = ({ 
  children, 
  title = "Article Details",
  description = "Review and edit the article content before publishing."
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-[#161118] dark:text-[#f5f7f8] mb-2">{title}</h2>
        <p className="text-[#7c608a] dark:text-[#c5b3d1]">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
};

export default EditorContainer;