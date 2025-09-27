// components/AccessDenied.tsx
const AccessDenied: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Access Denied</h2>
        <p>You must be logged in as an admin to access this page.</p>
      </div>
    </div>
  );
};

export default AccessDenied;