import { Flame as FlameFilled } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-amber-400 font-black text-3xl">MINY</Link>
          <Link 
            to="/candle" 
            className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors text-xl md:text-xl pt-3 backdrop-blur-sm  pl-4 py-2 rounded-full"
          >
            <FlameFilled className="w-5 h-5 fill-current" />
            <span>Candlelight Concert</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}