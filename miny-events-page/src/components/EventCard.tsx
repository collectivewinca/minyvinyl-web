import React from 'react';

interface EventCardProps {
  date: string;
  title: string;
  description: string[];
  image: string;
  emoji: string;
  price: string;
}

const EventCard: React.FC<EventCardProps> = ({
  date,
  title,
  description,
  image,
  emoji,
  price,
}) => {
  return (
    <div className="flex-none w-full md:w-[calc(100%-2rem)] lg:w-[500px] snap-center cursor-pointer group">
      <div className="h-full bg-gray-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/30 transform transition-transform duration-300 group-hover:scale-[1.02]">
        <div className="relative h-48 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
            {emoji} {date}
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
            {title}
          </h3>
          
          <ul className="space-y-2 text-gray-300 mb-6">
            {description.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center justify-between mt-auto">
            <span className="text-lg font-bold text-white">Starting at {price}</span>
            <a
              href="#book-now"
              className="px-4 py-2 bg-white hover:bg-gray-200 text-black rounded-lg transition-colors"
            >
              Reserve
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;