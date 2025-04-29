import { Flame as FlameFilled, Menu, X, Calendar, CalendarFoldIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-amber-400 font-black text-2xl">MINY</Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/miny-events" 
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors text-base backdrop-blur-sm pl-4 py-2 rounded-full"
            >
              <Calendar className="w-4 h-4" />
              <span>Events</span>
            </Link>
            <Link 
              to="/candle" 
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors text-base backdrop-blur-sm pl-4 py-2 rounded-full"
            >
              <FlameFilled className="w-4 h-4 fill-current" />
              <span>Candlelight Concert</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-amber-400 hover:text-amber-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-amber-400/20 mt-2">
            <div className="px-4 py-4 space-y-4">
              <Link 
                to="/miny-events" 
                className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                <Calendar className="w-4 h-4" />
                <span>Events</span>
              </Link>
              <Link 
                to="/candle" 
                className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                <FlameFilled className="w-4 h-4 fill-current" />
                <span>Candlelight Concert</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}