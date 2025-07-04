
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone, Tablet, RotateCcw } from "lucide-react";
import { useState } from "react";

interface PreviewPanelProps {
  code: string;
}

export const PreviewPanel = ({ code }: PreviewPanelProps) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const getPreviewWidth = () => {
    switch (viewMode) {
      case 'mobile': return 'w-80';
      case 'tablet': return 'w-96';
      default: return 'w-full';
    }
  };

  const refreshPreview = () => {
    // Force refresh the iframe
    const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-300">Live Preview</span>
        
        <div className="flex items-center space-x-2">
          {/* View Mode Buttons */}
          <div className="flex items-center space-x-1 bg-slate-700 rounded-lg p-1">
            <Button
              size="sm"
              variant={viewMode === 'desktop' ? 'default' : 'ghost'}
              onClick={() => setViewMode('desktop')}
              className="h-8 w-8 p-0"
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'tablet' ? 'default' : 'ghost'}
              onClick={() => setViewMode('tablet')}
              className="h-8 w-8 p-0"
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'mobile' ? 'default' : 'ghost'}
              onClick={() => setViewMode('mobile')}
              className="h-8 w-8 p-0"
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={refreshPreview}
            className="text-slate-400 hover:text-white h-8 w-8 p-0"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 p-4 bg-slate-800">
        <div className="h-full flex items-center justify-center">
          <div className={`h-full ${getPreviewWidth()} max-w-full transition-all duration-300`}>
            <iframe
              id="preview-iframe"
              srcDoc={code}
              className="w-full h-full bg-white rounded-lg shadow-2xl border border-slate-600"
              title="Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-800 border-t border-slate-700 px-4 py-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Live Preview</span>
          <span className="capitalize">{viewMode} View</span>
        </div>
      </div>
    </div>
  );
};
