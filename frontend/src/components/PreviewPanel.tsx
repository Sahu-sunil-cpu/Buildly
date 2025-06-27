import React from 'react';
import { ExternalLink, RefreshCw, Smartphone, Tablet, Monitor } from 'lucide-react';

interface PreviewPanelProps {
  code: string;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ code }) => {
  const [viewMode, setViewMode] = React.useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  
  const getPreviewWidth = () => {
    switch (viewMode) {
      case 'mobile': return 'max-w-sm';
      case 'tablet': return 'max-w-2xl';
      case 'desktop': return 'w-full';
      default: return 'w-full';
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 font-medium">Preview</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Responsive Controls */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('desktop')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'desktop' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('tablet')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'tablet' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'mobile' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
          
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200">
            <RefreshCw className="w-4 h-4" />
          </button>
          
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200">
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Preview Content */}
      <div className="flex-1 p-4 overflow-auto bg-gray-100">
        <div className={`mx-auto transition-all duration-300 ${getPreviewWidth()}`}>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden" style={{ minHeight: '400px' }}>
            <iframe
              srcDoc={code}
              className="w-full h-full min-h-[400px] border-0"
              title="Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="px-4 py-2 bg-white border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Live preview • Auto-refresh enabled</span>
          <span className="flex items-center space-x-1">
            <span>Viewport:</span>
            <span className="font-medium text-gray-700 capitalize">{viewMode}</span>
          </span>
        </div>
      </div>
    </div>
  );
};