// components/ErrorMessage.tsx
interface ErrorMessageProps {
  message: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
      {message}
    </div>
  );
};

export default ErrorMessage;