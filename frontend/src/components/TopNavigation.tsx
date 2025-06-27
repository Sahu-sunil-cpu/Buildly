import React, { useState } from 'react';
import { ChevronDown, Download, Zap, Settings, HelpCircle, Users } from 'lucide-react';

export const TopNavigation: React.FC = () => {
  const [showIntegrations, setShowIntegrations] = useState(false);

  return (
    <nav className="bg-gray-950 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Logo/Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-white text-xl font-bold">Buildly</span>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-3">
          {/* Integrations Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowIntegrations(!showIntegrations)}
              className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
            >
              <Settings className="w-4 h-4" />
              <span>Integrations</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showIntegrations && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                <div className="p-2">
                  <button className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors duration-200">
                    GitHub
                  </button>
                  <button className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors duration-200">
                    Vercel
                  </button>
                  <button className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors duration-200">
                    Netlify
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Export Button */}
          <button className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>

          {/* Deploy Button */}
          <button className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg">
            <Zap className="w-4 h-4" />
            <span>Deploy</span>
          </button>
        </div>
      </div>
    </nav>
  );
};