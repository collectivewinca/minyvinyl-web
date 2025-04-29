import React, { useState, useEffect } from 'react';
import { Menu, X, Headphones, Home } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Headphones className="h-8 w-8 text-white" />
              <span className="ml-2 text-white font-bold text-xl">MINY Events</span>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a href="/" className="text-gray-200 hover:text-white transition-colors">
                <Home className="h-5 w-5" />
              </a>
              <a href="#events" className="text-gray-200 hover:text-white transition-colors">
                Events
              </a>
              <a href="#tickets" className="text-gray-200 hover:text-white transition-colors">
                Tickets
              </a>
              <a href="#experience" className="text-gray-200 hover:text-white transition-colors">
                Experience
              </a>
              <a
                href="#book-now"
                className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Book Now
              </a>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-200 hover:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/95 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className="block px-3 py-2 text-gray-200 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <Home className="h-5 w-5 mr-2" />
                <span>Home</span>
              </div>
            </a>
            <a
              href="#events"
              className="block px-3 py-2 text-gray-200 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Events
            </a>
            <a
              href="#tickets"
              className="block px-3 py-2 text-gray-200 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Tickets
            </a>
            <a
              href="#experience"
              className="block px-3 py-2 text-gray-200 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Experience
            </a>
            <a
              href="#book-now"
              className="block px-3 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;