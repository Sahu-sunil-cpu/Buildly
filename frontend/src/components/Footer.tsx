import React from 'react';
import { HelpCircle, Users } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 px-6 py-4">
      <div className="flex items-center justify-center space-x-8">
        <a
          href="#"
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <HelpCircle className="w-4 h-4" />
          <span className="text-sm">Help Center</span>
        </a>
        
        <a
          href="#"
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <Users className="w-4 h-4" />
          <span className="text-sm">Join our Community</span>
        </a>
      </div>
    </footer>
  );
};