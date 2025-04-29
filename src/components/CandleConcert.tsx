import { Calendar, Clock, MapPin, Phone, Mail, User, Camera, Volume2 as Volume2Off } from 'lucide-react';
import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

type EventDate = 'may' | 'june';

interface FormData {
  eventDate: EventDate;
  name: string;
  email: string;
  phone: string;
}

interface Event {
  date: string;
  time: string;
  location: string;
  address: string;
  googleMapsLink: string;
  theme?: string;
}

interface EventsType {
  [key: string]: Event;
}

const EVENTS: EventsType = {
  may: {
    date: 'May 4th, 2025',
    time: '7:00 PM - 10:00 PM',
    location: '13th Storey',
    address: '777 Valencia St, San Francisco, CA 94110',
    googleMapsLink: 'https://maps.app.goo.gl/example2',
    theme: 'Star Wars Theme: "May the 4th Be With You"'
  },
  june: {
    date: 'June 19th, 2025',
    time: '7:00 PM - 10:00 PM',
    location: '13th Storey',
    address: '777 Valencia St, San Francisco, CA 94110',
    googleMapsLink: 'https://maps.app.goo.gl/example3',
    theme: 'Juneteenth Celebration'
  },
};

const PAST_EVENT_IMAGES = [
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000',
];

const sendConfirmationEmail = async (
  name: string,
  email: string,
  eventDate: EventDate
) => {
  const event = EVENTS[eventDate];
  
  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f8f8;">
      <div style="background-color: #000000; padding: 30px; border-radius: 10px; color: #ffffff;">
        <h1 style="color: #fbbf24; text-align: center; font-size: 28px; margin-bottom: 20px;">Thank You for Registering!</h1>
        
        <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          Dear ${name},
        </p>
        
        <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          We're thrilled to confirm your registration for the Candlelight Concert! Your spot is now reserved for this special evening of music and ambiance.
        </p>
        
        <div style="background-color: #1a1a1a; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #fbbf24; font-size: 20px; margin-bottom: 15px;">Event Details</h2>
          <p style="color: #ffffff; margin: 10px 0;"><strong style="color: #ffffff;">Date:</strong> ${event.date}</p>
          <p style="color: #ffffff; margin: 10px 0;"><strong style="color: #ffffff;">Time:</strong> ${event.time}</p>
          <p style="color: #ffffff; margin: 10px 0;"><strong style="color: #ffffff;">Location:</strong> ${event.location}</p>
        </div>
        
        <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          We look forward to creating a magical evening with you. Please arrive 15 minutes before the concert begins.
        </p>
        
        <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          If you have any questions, feel free to reply to this email.
        </p>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
          <p style="color: #fbbf24; font-size: 14px;">MINY - Digital Vinyl Collectibles</p>
          <p style="color: #ffffff; font-size: 12px; margin-top: 5px;">
            <a href="https://minyvinyl.com" style="color: #fbbf24; text-decoration: none;">minyvinyl.com</a>
          </p>
        </div>
      </div>
    </div>
  `;

  try {
    const response = await fetch('https://send-email.alet8891.workers.dev', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: email,
        subject: 'Your Candlelight Concert Registration Confirmation',
        html: emailContent
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send confirmation email');
    }

    return await response.json();
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

export function CandleConcert() {
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<EventDate>('may');
  const [formData, setFormData] = useState<FormData>({
    eventDate: 'may',
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Add registration to Firestore
      await addDoc(collection(db, 'candlelight_registrations'), {
        ...formData,
        createdAt: new Date()
      });
      
      // Send confirmation email
      await sendConfirmationEmail(formData.name, formData.email, formData.eventDate);
      
      // Redirect to booking page
      window.location.href = '/miny-events#book-now';
    } catch (err) {
      setError('Failed to register. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentEvent = EVENTS[selectedDate];

  return (
    <div className="min-h-screen bg-black text-gray-300 py-12 px-4 md:px-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="holder">
          <div className="candle">
            <div className="blinking-glow"></div>
            <div className="thread"></div>
            <div className="glow"></div>
            <div className="flame"></div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h1 className="text-2xl md:text-4xl font-black text-amber-400 mb-8 tracking-tight">Candlelight Concert</h1>
          
          <h2 className="text-xl md:text-2xl font-bold text-amber-400 mb-6">Upcoming Events</h2>
          
          <div className="flex flex-col gap-6 items-center justify-center text-sm md:text-base mb-12">
            <div className="flex gap-4 items-center justify-center">
              <button
                onClick={() => setSelectedDate('may')}
                className={`px-6 py-2 rounded-full border ${
                  selectedDate === 'may'
                    ? 'bg-amber-400 text-black border-amber-400'
                    : 'border-amber-400/30 text-amber-400 hover:bg-amber-400/10'
                } transition-all`}
              >
                May 4th
              </button>
              <button
                onClick={() => setSelectedDate('june')}
                className={`px-6 py-2 rounded-full border ${
                  selectedDate === 'june'
                    ? 'bg-amber-400 text-black border-amber-400'
                    : 'border-amber-400/30 text-amber-400 hover:bg-amber-400/10'
                } transition-all`}
              >
                June 19th
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              <span>{currentEvent.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <span>{currentEvent.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400" />
              <span className="text-sm md:text-base">{currentEvent.location}</span>
            </div>
            {currentEvent.theme && (
              <div className="mt-2 text-amber-400 font-semibold">
                {currentEvent.theme}
              </div>
            )}
          </div>

          {!showForm ? (
            <button
              className="group relative inline-flex items-center justify-center px-6 md:px-8 py-3 text-base md:text-lg font-black uppercase tracking-widest overflow-hidden bg-amber-400 rounded-lg hover:bg-amber-500 transition-colors"
              onClick={() => {
                window.location.href = '/miny-events#book-now';
              }}
            >
              <span className="relative flex items-center gap-2 text-black">
                Register Now
              </span>
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-black/95 backdrop-blur-sm border border-amber-400/30 rounded-lg p-6 shadow-xl z-30">
              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                  {error}
                </div>
              )}
              <div className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, eventDate: 'may' }))}
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      formData.eventDate === 'may'
                        ? 'bg-amber-400 text-black border-amber-400'
                        : 'border-amber-400/30 text-amber-400 hover:bg-amber-400/10'
                    } transition-all`}
                  >
                    May 4th
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, eventDate: 'june' }))}
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      formData.eventDate === 'june'
                        ? 'bg-amber-400 text-black border-amber-400'
                        : 'border-amber-400/30 text-amber-400 hover:bg-amber-400/10'
                    } transition-all`}
                  >
                    June 19th
                  </button>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-amber-400 mb-2">
                    <User className="w-4 h-4" />
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 bg-black/50 border border-amber-400/30 rounded-lg focus:outline-none focus:border-amber-400"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-amber-400 mb-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 bg-black/50 border border-amber-400/30 rounded-lg focus:outline-none focus:border-amber-400"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-amber-400 mb-2">
                    <Phone className="w-4 h-4" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 bg-black/50 border border-amber-400/30 rounded-lg focus:outline-none focus:border-amber-400"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-amber-400 text-black font-bold py-3 rounded-lg hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Registering...' : 'Complete Registration'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="mt-3 w-full bg-transparent border border-amber-400/30 text-amber-400 font-bold py-3 rounded-lg hover:bg-amber-400/10 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
          
          <div className="space-y-8 mb-12">
            <div className="max-w-2xl mx-auto bg-white/5 rounded-lg p-6">
              <h2 className="text-xl md:text-2xl font-bold text-amber-400 mb-4">Concert Policies</h2>
              <div className="space-y-4 text-sm md:text-base">
                <div className="flex items-center gap-3">
                  <Volume2Off className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <p>Phones must be turned off during the performance</p>
                </div>
                <div className="flex items-center gap-3">
                  <Camera className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <p>No photography or recording allowed</p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <p>Late arrivals will not be admitted until the break</p>
                </div>
              </div>
            </div>
          </div>

          

          <div className="my-10">
            <h2 className="text-2xl md:text-3xl font-bold text-amber-400 mb-6">Past Events</h2>
            <div className="bg-white/5 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-amber-400 mb-4">April 9th, 2024</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {PAST_EVENT_IMAGES.map((image, index) => (
                  <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                    <img
                      src={image}
                      alt={`Concert photo ${index + 1}`}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-sm md:text-base">
                Our first Candlelight Concert was a magical evening filled with beautiful music and warm ambiance. 
                Thank you to everyone who joined us for this special event.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}