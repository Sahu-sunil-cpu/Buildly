import React, { useEffect, useState } from 'react';
import { ChatInterface } from './ChatInterface';
import { PreviewArea } from './PreviewArea';
import { TopNavigation } from './TopNavigation';
import { Footer } from './Footer';

export const EditorLayout = ({userPrompt}: {userPrompt: any}) => {
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('preview');
  const projectName = "makt chat app";

  useEffect(() => {
  
  }, [])
  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Top Navigation */}
      <TopNavigation />
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Chat Interface */}
        <div className="w-1/2 border-r border-gray-800">
          <ChatInterface projectName={projectName} />
        </div>
        
        {/* Right Panel - Code/Preview */}
        <div className="w-1/2">
          <PreviewArea activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};