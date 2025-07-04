import { Loader2 } from 'lucide-react';

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        {/* Loading Animation */}
        <div className="mb-6">
          <Loader2 className="w-12 h-12 text-blue-600 mx-auto animate-spin" />
        </div>
        
        {/* Loading Text */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Loading...
        </h2>
        <p className="text-gray-600">
          Please wait while we prepare your content
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;