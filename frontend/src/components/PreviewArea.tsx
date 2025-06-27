import React from 'react';
import { Monitor, Smartphone, Tablet, ExternalLink, RefreshCw } from 'lucide-react';

interface PreviewAreaProps {
  activeTab: 'code' | 'preview';
  onTabChange: (tab: 'code' | 'preview') => void;
}

export const PreviewArea: React.FC<PreviewAreaProps> = ({ activeTab, onTabChange }) => {
  const [viewMode, setViewMode] = React.useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Tabs */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => onTabChange('code')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'code'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            Code
          </button>
          <button
            onClick={() => onTabChange('preview')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'preview'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            Preview
          </button>
        </div>

        {activeTab === 'preview' && (
          <div className="flex items-center space-x-2">
            {/* Responsive Controls */}
            <div className="flex items-center space-x-1 bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('desktop')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'desktop' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('tablet')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'tablet' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'mobile' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
            
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors duration-200">
              <RefreshCw className="w-4 h-4" />
            </button>
            
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors duration-200">
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        {activeTab === 'code' ? (
          <div className="h-full bg-gray-950 rounded-lg border border-gray-800 p-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-400 text-sm">index.html</span>
            </div>
            <div className="text-gray-300 font-mono text-sm">
              <div className="text-gray-500">1</div>
              <div className="text-gray-500">2</div>
              <div className="text-gray-500">3</div>
              <div className="text-gray-400 mt-4">// Your generated code will appear here...</div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                <Monitor className="w-10 h-10 text-gray-500" />
              </div>
              <div>
                <h3 className="text-white text-lg font-medium mb-2">Your preview will appear here</h3>
                <p className="text-gray-400 text-sm max-w-sm">
                  Start a conversation to generate code and see the live preview of your application.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};