import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Rocket, ShieldAlert, Globe, Stars, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-background-dark bg-opacity-90 backdrop-blur-md py-2 shadow-md' : 'py-4'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-orbitron font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Base Bharat
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
              Home
            </Link>
        
            <Link 
              to="/obstacle-course" 
              className={`nav-item ${isActive('/obstacle-course') ? 'active' : ''}`}
            >
              <span className="flex items-center gap-1">
                <ShieldAlert size={16} /> Obstacle Course
              </span>
            </Link>
            <Link 
              to="/global-leaderboard" 
              className={`nav-item ${isActive('/global-leaderboard') ? 'active' : ''}`}
            >
              <span className="flex items-center gap-1">
                <Globe size={16} /> Global Leaderboard
              </span>
            </Link>
            <Link 
              to="/pledge-wall" 
              className={`nav-item ${isActive('/pledge-wall') ? 'active' : ''}`}
            >
              <span className="flex items-center gap-1">
                <Stars size={16} /> Pledge Wall
              </span>
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden absolute w-full bg-background-dark bg-opacity-95 backdrop-blur-md transition-all duration-300 ${
            isMenuOpen ? 'max-h-[300px] py-4' : 'max-h-0 overflow-hidden'
          }`}
        >
          <div className="container mx-auto px-4 flex flex-col gap-4">
            <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
              Home
            </Link>
            <Link 
              to="/rocket-builder" 
              className={`nav-item ${isActive('/rocket-builder') ? 'active' : ''}`}
            >
              <span className="flex items-center gap-2">
                <Rocket size={18} /> Rocket Builder
              </span>
            </Link>
            <Link 
              to="/obstacle-course" 
              className={`nav-item ${isActive('/obstacle-course') ? 'active' : ''}`}
            >
              <span className="flex items-center gap-2">
                <ShieldAlert size={18} /> Obstacle Course
              </span>
            </Link>
            <Link 
              to="/global-leaderboard" 
              className={`nav-item ${isActive('/global-leaderboard') ? 'active' : ''}`}
            >
              <span className="flex items-center gap-2">
                <Globe size={18} /> Global Leaderboard
              </span>
            </Link>
            <Link 
              to="/pledge-wall" 
              className={`nav-item ${isActive('/pledge-wall') ? 'active' : ''}`}
            >
              <span className="flex items-center gap-2">
                <Stars size={18} /> Pledge Wall
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-20">
        {children}
      </main>

      <footer className="py-6 bg-background-dark bg-opacity-80 backdrop-blur-md border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Base Bharat | Builders of the Future
          </p>
          <div className="mt-2 flex justify-center gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;