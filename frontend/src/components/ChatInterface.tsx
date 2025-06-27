import React, { useState } from 'react';
import { Send, Link, Code, MessageSquare, Sparkles } from 'lucide-react';

interface ChatInterfaceProps {
  projectName: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ projectName }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'assistant'; content: string }>>([]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages(prev => [...prev, { type: 'user', content: message }]);
      setMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          type: 'assistant', 
          content: `I'll help you with "${message}". Let me generate some code for your ${projectName}.` 
        }]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Project Header */}
      <div className="p-6 border-b border-gray-800">
        <button className="flex items-center space-x-3 text-left w-full group hover:bg-gray-800 p-3 rounded-lg transition-colors duration-200">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">{projectName}</h2>
            <p className="text-gray-400 text-sm">Click to rename project</p>
          </div>
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-gray-500" />
            </div>
            <div>
              <h3 className="text-white text-lg font-medium mb-2">Start building with AI</h3>
              <p className="text-gray-400 text-sm max-w-sm">
                Describe what you want to build and I'll help you create it step by step.
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-lg ${
                msg.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-100 border border-gray-700'
              }`}>
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-gray-800">
        <div className="relative">
          <div className="flex items-center space-x-2 mb-3">
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200">
              <Link className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200">
              <Code className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200">
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
          
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`How can ${projectName} help you today?`}
              className="w-full bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-xl p-4 pr-14 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              rows={3}
            />
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="absolute right-3 bottom-3 w-8 h-8 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};