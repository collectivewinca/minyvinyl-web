import React from 'react';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'General Admission',
    price: '$49',
    description: 'Standard event access',
    features: [
      'Access to all listening areas',
      'One welcome drink',
      'Digital memory access',
      'Event-specific playlist access',
    ],
    color: 'gray',
  },
  {
    name: 'Collector',
    price: '$99',
    description: 'Premium event experience',
    features: [
      'All General Admission features',
      'Limited edition MINY collectible',
      'Priority seating',
      'Two premium drinks',
      'Early access (30 min)',
    ],
    color: 'white',
    featured: true,
  },
  {
    name: 'Immersive Duo',
    price: '$129',
    description: 'Ultimate couple experience',
    features: [
      'All Collector features for two people',
      'Reserved seating',
      'Meet the curator',
      'Behind-the-scenes tour',
      'Exclusive MINY duo content',
    ],
    color: 'gray',
  },
];

const TicketTiers: React.FC = () => {
  return (
    <section id="tickets" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ticket Tiers</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Choose the experience that fits your style. All tickets include access to our digital
            platform for memories and exclusive content.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl overflow-hidden ${
                tier.featured
                  ? 'bg-gradient-to-br from-white to-gray-300 shadow-lg shadow-white/20 transform md:-translate-y-4 scale-105'
                  : 'bg-gray-900/40 backdrop-blur-sm border border-gray-700/50'
              }`}
            >
              <div className="p-8">
                <h3
                  className={`text-2xl font-bold ${
                    tier.featured ? 'text-black' : 'text-white'
                  }`}
                >
                  {tier.name}
                </h3>
                <div className={`mt-4 flex items-baseline ${tier.featured ? 'text-black' : 'text-white'}`}>
                  <span className="text-4xl font-extrabold tracking-tight">{tier.price}</span>
                  <span className="ml-1 text-xl font-medium">/person</span>
                </div>
                <p
                  className={`mt-2 text-sm ${
                    tier.featured ? 'text-black/90' : 'text-gray-300'
                  }`}
                >
                  {tier.description}
                </p>

                <ul className="mt-8 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex">
                      <Check
                        className={`flex-shrink-0 w-5 h-5 ${
                          tier.featured ? 'text-black' : 'text-white'
                        }`}
                      />
                      <span
                        className={`ml-3 text-base ${
                          tier.featured ? 'text-black/90' : 'text-gray-300'
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <a
                    href="#book-now"
                    className={`w-full flex items-center justify-center px-5 py-3 border border-transparent rounded-md shadow text-base font-medium ${
                      tier.featured
                        ? 'bg-black text-white hover:bg-gray-800'
                        : 'bg-white text-black hover:bg-gray-100'
                    } transition-colors`}
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TicketTiers;