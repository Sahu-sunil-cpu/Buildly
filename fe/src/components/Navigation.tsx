
import { Button } from "@/components/ui/button";
import { Code2, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">CodeBuilder</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/editor" className="text-slate-300 hover:text-white transition-colors">
              Editor
            </Link>
            <Link to="#" className="text-slate-300 hover:text-white transition-colors">
              Examples
            </Link>
            <Link to="#" className="text-slate-300 hover:text-white transition-colors">
              Docs
            </Link>
            <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white">
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700">
            <div className="px-4 py-6 space-y-4">
              <Link to="/" className="block text-slate-300 hover:text-white transition-colors py-2">
                Home
              </Link>
              <Link to="/editor" className="block text-slate-300 hover:text-white transition-colors py-2">
                Editor
              </Link>
              <Link to="#" className="block text-slate-300 hover:text-white transition-colors py-2">
                Examples
              </Link>
              <Link to="#" className="block text-slate-300 hover:text-white transition-colors py-2">
                Docs
              </Link>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white mt-4">
                Sign In
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
