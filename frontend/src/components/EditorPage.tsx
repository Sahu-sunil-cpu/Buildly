import React, { useState } from 'react';
import { CodeEditor } from './CodeEditor';
import { PreviewPanel } from './PreviewPanel';
import { FileText, Code2, Palette, Zap } from 'lucide-react';

export const EditorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'javascript'>('html');
  const [codes, setCodes] = useState({
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Awesome Page</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            text-align: center;
            color: white;
            max-width: 600px;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        .btn {
            background: rgba(255,255,255,0.2);
            border: 2px solid white;
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .btn:hover {
            background: white;
            color: #667eea;
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hello World!</h1>
        <p>Welcome to your new website. Start editing to see changes in real-time.</p>
        <button class="btn">Get Started</button>
    </div>
</body>
</html>`,
    css: '',
    javascript: ''
  });

  const handleCodeChange = (language: 'html' | 'css' | 'javascript', code: string) => {
    setCodes(prev => ({ ...prev, [language]: code }));
  };

  const getCurrentCode = () => {
    if (activeTab === 'html') return codes.html;
    
    // Combine HTML with CSS and JS for preview
    const styleTag = codes.css ? `<style>${codes.css}</style>` : '';
    const scriptTag = codes.javascript ? `<script>${codes.javascript}</script>` : '';
    
    return codes.html.replace('</head>', `${styleTag}</head>`).replace('</body>', `${scriptTag}</body>`);
  };

  const tabs = [
    { id: 'html' as const, label: 'HTML', icon: FileText, color: 'text-orange-600' },
    { id: 'css' as const, label: 'CSS', icon: Palette, color: 'text-blue-600' },
    { id: 'javascript' as const, label: 'JavaScript', icon: Zap, color: 'text-yellow-600' }
  ];

  return (
    <div className="h-screen pt-16 bg-gray-100">
      <div className="h-full flex">
        {/* Left Panel - Code Editor */}
        <div className="w-1/2 p-4 bg-gray-50">
          <div className="h-full flex flex-col">
            {/* Tabs */}
            <div className="flex space-x-1 mb-4 bg-white rounded-lg p-1 shadow-sm">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gray-900 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-white' : tab.color}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
            
            {/* Editor */}
            <div className="flex-1">
              <CodeEditor
                code={codes[activeTab]}
                onChange={(code) => handleCodeChange(activeTab, code)}
                language={activeTab}
              />
            </div>
          </div>
        </div>
        
        {/* Right Panel - Preview */}
        <div className="w-1/2 p-4">
          <PreviewPanel code={getCurrentCode()} />
        </div>
      </div>
    </div>
  );
};