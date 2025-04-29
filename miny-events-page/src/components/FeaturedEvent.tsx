import React from 'react';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';

const FeaturedEvent: React.FC = () => {
  return (
    <section id="featured-event" className="bg-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-white text-black px-3 py-1 rounded-full text-sm font-medium mb-4">
            FEATURED EVENT
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            <span className="text-white">🌟 MAY 4TH</span> - "MAY THE 4TH BE WITH YOU — GALACTIC GROOVE"
          </h2>
        </div>

        <div className="lg:flex items-stretch gap-8">
          {/* Event Image */}
          <div className="lg:w-1/2 mb-8 lg:mb-0 relative overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="May the 4th Be With You Event"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>

          {/* Event Details */}
          <div className="lg:w-1/2 bg-gray-900/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
            <h3 className="text-2xl font-bold text-white mb-4">
              A Star Wars-inspired audio journey through vinyl rarities and remixed classics
            </h3>

            <div className="space-y-4 text-gray-300 mb-8">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-white mr-3" />
                <span>Time: 6 PM – 9 PM</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-white mr-3" />
                <span>Venue: 13th Storey Penthouse Gallery</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-white mr-3" />
                <span>Limited to 80 guests</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-white mr-3" />
                <span>May 4th, 2025</span>
              </div>
            </div>

            <div className="text-gray-200 mb-8">
              <h4 className="text-lg font-semibold mb-2">Includes:</h4>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Blue-Milk Old Fashioned specialty cocktail</li>
                <li>Exclusive MINY Star Wars collectible</li>
                <li>Professional photography of your experience</li>
                <li>Priority access to limited vinyl selections</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
              <div className="text-2xl font-bold text-white">$49</div>
              <a
                href="#book-now"
                className="px-8 py-3 bg-white text-black rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform flex-1 text-center"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvent;