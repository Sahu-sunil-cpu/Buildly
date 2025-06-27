import React, { useRef, useState } from 'react';
import { 
  ArrowRight, 
  ChevronDown, 
  Github, 
  Figma,
  Sparkles,
  
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { BACKEND_URL } from '../config';

export const HomePage = ({setUserPrompt}: {setUserPrompt: any}) => {
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false);
  const navigate = useNavigate();

  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async (e: any) => {

   
   console.log(messageRef.current?.value) 

   const response = await axios.post(`${BACKEND_URL}/template`, {
    data: {
      prompt: messageRef.current?.value
    }
   }) 

   console.log(response.data)
  
 
   navigate("/editor", {state: {response}});
  
   
    
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  const suggestionTags = [
    'Create a financial app',
    'Design a directory website',
    'Build a project management app',
    'Make a landing page',
    'Generate a CRM',
    'Build a mobile app'
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-white">
            Buildly
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
              Community
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
              Enterprise
            </a>
            
            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowResourcesDropdown(!showResourcesDropdown)}
                className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <span>Resources</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showResourcesDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
                  <div className="p-2">
                    <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors duration-200">
                      Documentation
                    </a>
                    <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors duration-200">
                      Tutorials
                    </a>
                    <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors duration-200">
                      API Reference
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
              Pricing
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-3">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* Notification Bar */}
      <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-center space-x-2 text-sm">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-gray-300">Join the world's largest Hackathon!</span>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <main className="relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            What do you want to build?
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Create stunning apps & websites by chatting with AI.
          </p>

          {/* Chat Input Box */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="relative">
              <textarea
          
               ref={messageRef}
                onKeyPress={handleKeyPress}
                placeholder="How can Buildly help you today?"
                className="w-full bg-gray-900/80 backdrop-blur-sm text-white placeholder-gray-400 border border-gray-700 rounded-2xl p-6 pr-16 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-2xl"
                rows={3}
              />
              <button
                onClick={(e) => handleSend(e)}
            //      disabled={!messageRef.current?.value.trim()}
                className="absolute right-4 bottom-4 w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Import Options */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className="text-gray-400 text-sm">or import from</span>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-full text-gray-300 hover:text-white transition-all duration-200">
              <Figma className="w-4 h-4" />
              <span>Figma</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-full text-gray-300 hover:text-white transition-all duration-200">
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </button>
          </div>

          {/* Suggestion Tags */}
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
            {suggestionTags.map((tag, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-gray-800/30 hover:bg-gray-700/50 border border-gray-700/50 rounded-full text-gray-300 hover:text-white text-sm transition-all duration-200 hover:scale-105"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};