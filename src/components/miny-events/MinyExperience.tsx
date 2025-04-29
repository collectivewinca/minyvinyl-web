import React, { useState, useRef } from 'react';
import { Smartphone, Disc, Lock, Share2, ChevronLeft, ChevronRight, X } from 'lucide-react';

const features = [
  {
    icon: <Smartphone className="h-10 w-10 text-white" />,
    title: 'Tap & Collect Digital Memories',
    description: 'Instantly save your favorite moments, tracks, and experiences with a simple tap.',
  },
  {
    icon: <Lock className="h-10 w-10 text-white" />,
    title: 'Access Exclusive Content',
    description: 'Unlock event-specific playlists, artist interviews, and behind-the-scenes footage.',
  },
  {
    icon: <Share2 className="h-10 w-10 text-white" />,
    title: 'Trade & Share with Community',
    description: 'Connect with other MINY enthusiasts to share experiences and build your collection.',
  },
  {
    icon: <Disc className="h-10 w-10 text-white" />,
    title: 'Curated Playlists',
    description: 'Enjoy professionally curated playlists inspired by each event theme and experience.',
  },
];

const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    caption: 'Candlelit Atmosphere at MINY Experience',
  },
  {
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    caption: 'Immersive Audio Experience',
  },
  {
    url: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    caption: 'Live BBQ Music Experience',
  },
  {
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    caption: 'DJ Vinyl Set',
  },
  {
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    caption: 'Capturing MINY Memories',
  },
  {
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    caption: 'Audience at MINY Event',
  },
  {
    url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    caption: 'Candlelight Concert Experience',
  },
  {
    url: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    caption: 'BBQ and Music Festival',
  }
];

const MinyExperience: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: ''
  });
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    scrollToCurrentImage();
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
    scrollToCurrentImage();
  };

  const scrollToCurrentImage = () => {
    if (carouselRef.current) {
      const scrollAmount = currentImageIndex * (carouselRef.current.scrollWidth / galleryImages.length);
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    alert(`Thank you! An exclusive invite link will be sent to ${formData.email}`);
    setIsModalOpen(false);
    setFormData({ email: '', phone: '' });
  };

  return (
    <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 bg-black relative">
      <div className="w-full mx-auto relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gray-800/20 transform -skew-x-12"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            {/* Text Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">MINY Experience</h2>
              <p className="text-gray-300 mb-8">
                MINY is more than just an event - it's a complete digital experience that extends beyond the physical gathering. Our app enhances your listening sessions with interactive features and exclusive content.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="bg-gray-900/20 backdrop-blur-sm p-6 rounded-xl border border-gray-700/30">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-black bg-white hover:bg-gray-200 transition-colors"
                >
                  Download MINY App
                </button>
              </div>
            </div>
            
            {/* Image */}
            <div className="mt-10 lg:mt-0 relative">
              <div className="relative mx-auto w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/30 to-white/30 blur-3xl opacity-70 rounded-full"></div>
                <img
                  src="https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2088&q=80"
                  alt="MINY App Experience"
                  className="relative rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Image Gallery Section */}
          <div className="mt-20">
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                April 9th Candlelit Concert: Moments
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Experience the magic of our exclusive candlelit concerts. Browse through highlights from our recent events.
              </p>
            </div>

            {/* Carousel */}
            <div className="relative">
              <div className="overflow-hidden">
                <div 
                  ref={carouselRef}
                  className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {galleryImages.map((image, index) => (
                    <div 
                      key={index} 
                      className="min-w-full md:min-w-[50%] lg:min-w-[33.333%] snap-start px-2"
                    >
                      <div className="h-64 sm:h-80 relative group">
                        <img 
                          src={image.url} 
                          alt={image.caption} 
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="p-4 w-full">
                            <p className="text-white text-sm">{image.caption}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={prevImage}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-2 rounded-r-lg hover:bg-black/80 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button 
                onClick={nextImage}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-2 rounded-l-lg hover:bg-black/80 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            <div className="text-center mt-8">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-black bg-white hover:bg-gray-200 transition-colors"
              >
                Get Exclusive Access
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for email/phone collection */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl p-6 md:p-8 w-full max-w-md border border-gray-700/50 relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-xl font-bold text-white mb-2">Get Exclusive Access</h3>
            <p className="text-gray-300 mb-6">
              Join our community to receive exclusive invites to future events and download the MINY app.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Your phone number"
                />
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  Get Exclusive Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default MinyExperience;