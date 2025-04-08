import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="min-h-screen bg-black text-gray-300 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-black text-amber-400 mb-4">404</h1>
        <p className="text-xl md:text-2xl mb-8">Page not found</p>
        <Link 
          to="/" 
          className="inline-block bg-amber-400 text-black font-bold py-3 px-8 rounded-lg hover:bg-amber-500 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
} 