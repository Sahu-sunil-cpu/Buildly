
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Send, Github, Figma, Link, Code, MessageSquare, MessageCircle, Linkedin, Twitter, Hash } from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { BACKEND_URL } from "@/config";
import axios from 'axios'

const Index = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const messageRef = useRef<HTMLTextAreaElement>(null);


  const suggestions = [
    "Create a financial app",
    "Design a directory website",
    "Build a project management app",
    "Make a landing page",
    "Generate a CRM",
    "Build a mobile app"
  ];


  const handleSend = async (e: any) => {


    console.log(messageRef.current?.value)

    const response = await axios.post(`${BACKEND_URL}/template`, {
      data: {
        prompt: messageRef.current?.value
      }
    })


    const data = response.data
    console.log(response.data)


    navigate("/editor", { state: { data } });



  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="border-b border-gray-800 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="font-bold text-xl">buildly</div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Community</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Enterprise</a>
            <div className="relative group">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Resources</a>
            </div>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center space-x-3">
            <MessageCircle className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <Linkedin className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <Twitter className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <Hash className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </nav>

      {/* Notification Bar
      <div className="px-6 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-900 border border-gray-700 rounded-full px-4 py-2 flex items-center justify-center space-x-2">
            <span className="text-sm text-gray-300">Join the world's largest Hackathon!</span>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div> */}

      {/* Hero Section */}
      <div className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Background Glow Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            {/* Main Headlines */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              What do you want to build?
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Create stunning apps & websites by chatting with AI.
            </p>

            {/* Chat Input Box */}
            <div className="max-w-2xl mx-auto mb-8">
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
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Import Options */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span className="text-gray-400 text-sm">or import from</span>
              <Button variant="outline" size="sm" className="border-gray-700 bg-gray-900 text-gray-300 hover:bg-gray-800 rounded-full px-4 py-2">
                <Figma className="w-4 h-4 mr-2" />
                Figma
              </Button>
              <Button variant="outline" size="sm" className="border-gray-700 bg-gray-900 text-gray-300 hover:bg-gray-800 rounded-full px-4 py-2">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </div>

            {/* Suggestion Tags */}
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="border-gray-700 bg-gray-900/50 text-gray-300 hover:bg-gray-800 hover:border-gray-600 rounded-full px-4 py-2 transition-all duration-200"
                >
                  {suggestion}
                </Button>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-16">
              <RouterLink to="/editor">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl">
                  Start Building
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
