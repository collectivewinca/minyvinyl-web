import React, { useRef } from 'react';
import EventCard from './EventCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const events = [
  {
    date: 'MAY 16',
    title: 'SOUND & SMOKE CANDLELIT BBQ',
    description: [
      'Live acoustic performances',
      'Curated BBQ tasting menu',
      'Custom merch printing',
      'Rooftop sunset views',
    ],
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    emoji: '🔥',
    price: '$49',
  },
  {
    date: 'JUNE 19',
    title: 'JUNETEENTH CELEBRATION BBQ',
    description: [
      'R&B, jazz & spoken word',
      'Heritage BBQ menu',
      'Limited edition Juneteenth MINY',
      'Supporting Black artists',
    ],
    image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    emoji: '🖤',
    price: '$49',
  },
  {
    date: 'JULY 15',
    title: 'SUMMER VINYL SESSIONS',
    description: [
      'Poolside DJ experience',
      'Tropical cocktail bar',
      'Sunset listening party',
      'Limited edition summer MINY',
    ],
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    emoji: '🌴',
    price: '$49',
  },
];

const UpcomingEvents: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = direction === 'left' ? -520 : 520;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="events" className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Upcoming Events</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full bg-gray-800/50 text-white hover:bg-gray-700 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full bg-gray-800/50 text-white hover:bg-gray-700 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-6 pb-8 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {events.map((event, index) => (
            <EventCard
              key={index}
              date={event.date}
              title={event.title}
              description={event.description}
              image={event.image}
              emoji={event.emoji}
              price={event.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;