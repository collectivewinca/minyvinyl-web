import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedEvent from './components/FeaturedEvent';
import UpcomingEvents from './components/UpcomingEvents';
import TicketTiers from './components/TicketTiers';
import MinyExperience from './components/MinyExperience';
import BookingCTA from './components/BookingCTA';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = React.useState('home');

  useEffect(() => {
    // Update the document title
    document.title = 'MINY Events | Candlelit Concerts & Unique Audio Experiences';
    
    // Add scrollbar-hide style to the document
    const style = document.createElement('style');
    style.textContent = `
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;
    document.head.appendChild(style);

    // Handle hash change for navigation
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#faq') {
        setCurrentPage('faq');
      } else {
        setCurrentPage('home');
      }
    };

    // Initial check
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      document.head.removeChild(style);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-900">
      <Navbar />
      
      {currentPage === 'home' ? (
        <>
          <Hero />
          <FeaturedEvent />
          <UpcomingEvents />
          <TicketTiers />
          <MinyExperience />
          <BookingCTA />
        </>
      ) : currentPage === 'faq' ? (
        <FAQ />
      ) : null}
      
      <Footer />
    </div>
  );
}

export default App;