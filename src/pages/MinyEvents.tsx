import React from 'react';
import Navbar from '../components/miny-events/Navbar';
import Hero from '../components/miny-events/Hero';
import FeaturedEvent from '../components/miny-events/FeaturedEvent';
import UpcomingEvents from '../components/miny-events/UpcomingEvents';
import MinyExperience from '../components/miny-events/MinyExperience';
import TicketTiers from '../components/miny-events/TicketTiers';
import FAQ from '../components/miny-events/FAQ';
import BookingCTA from '../components/miny-events/BookingCTA';
import Footer from '../components/miny-events/Footer';

const MinyEvents: React.FC = () => {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-black">
      <Navbar />
      <Hero />
      <FeaturedEvent />
      <UpcomingEvents />
      <MinyExperience />
      <TicketTiers />
      <FAQ />
      <BookingCTA />
      <Footer />
    </div>
  );
};

export default MinyEvents; 