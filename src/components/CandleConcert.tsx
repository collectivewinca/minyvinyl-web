import { Calendar, Clock, MapPin, Phone, Mail, User, Camera, Volume2 as Volume2Off } from 'lucide-react';
import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

type EventDate = 'april' | 'may' | 'june';

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
}

interface EventsType {
  [key: string]: Event;
}

const EVENTS: EventsType = {
  april: {
    date: 'April 9th',
    time: '7:00 PM',
    location: 'The Chapel',
    address: '777 Valencia St, San Francisco, CA 94110',
    googleMapsLink: 'https://maps.app.goo.gl/example1',
  },
  may: {
    date: 'May 4th',
    time: '7:00 PM',
    location: 'The Chapel',
    address: '777 Valencia St, San Francisco, CA 94110',
    googleMapsLink: 'https://maps.app.goo.gl/example2',
  },
  june: {
    date: 'June 19th',
    time: '7:00 PM',
    location: 'The Chapel',
    address: '777 Valencia St, San Francisco, CA 94110',
    googleMapsLink: 'https://maps.app.goo.gl/example3',
  },
};

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
  const [selectedDate, setSelectedDate] = useState('may');
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
      await addDoc(collection(db, 'minyvinyl_registrations'), {
        ...formData,
        createdAt: new Date()
      });
      
      // Send confirmation email
      await sendConfirmationEmail(formData.name, formData.email, formData.eventDate);
      
      alert('Registration successful! We look forward to seeing you at the concert.');
      setFormData({
        eventDate: 'may',
        name: '',
        email: '',
        phone: '',
      });
      setShowForm(false);
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
        <div className="hidden md:block fixed top-3 right-3 z-20">
          <button
            onClick={() => setShowForm(true)}
            className="bg-amber-400 text-black font-bold py-3 px-8 rounded-lg hover:bg-amber-500 transition-colors text-base shadow-lg hover:shadow-amber-400/20"
          >
            Register Now
          </button>
        </div>
        <div className="holder">
          <div className="candle">
            <div className="blinking-glow"></div>
            <div className="thread"></div>
            <div className="glow"></div>
            <div className="flame"></div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-amber-400 mb-8 tracking-tight">Candlelight Concert</h1>
          
          <div className="flex flex-col gap-6 items-center justify-center text-base md:text-lg mb-12">
            <div className="flex gap-4 items-center justify-center">
              <button
                onClick={() => setSelectedDate('april')}
                className={`px-6 py-2 rounded-full border ${
                  selectedDate === 'april'
                    ? 'bg-amber-400 text-black border-amber-400'
                    : 'border-amber-400/30 text-amber-400 hover:bg-amber-400/10'
                } transition-all`}
              >
                April 9th
              </button>
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
          </div>
          
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

          {!showForm ? (
            <button
              className="group relative inline-flex items-center justify-center px-6 md:px-8 py-3 text-base md:text-lg font-black uppercase tracking-widest overflow-hidden bg-amber-400 rounded-lg hover:bg-amber-500 transition-colors"
              onClick={() => {
                setFormData(prev => ({ ...prev, eventDate: selectedDate as EventDate }));
                setShowForm(true);
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
                    onClick={() => setFormData(prev => ({ ...prev, eventDate: 'april' as EventDate }))}
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      formData.eventDate === 'april'
                        ? 'bg-amber-400 text-black border-amber-400'
                        : 'border-amber-400/30 text-amber-400 hover:bg-amber-400/10'
                    } transition-all`}
                  >
                    April 9th
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, eventDate: 'may' as EventDate }))}
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
                    onClick={() => setFormData(prev => ({ ...prev, eventDate: 'june' as EventDate }))}
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      formData.eventDate === 'june'
                        ? 'bg-amber-400 text-black border-amber-400'
                        : 'border-amber-400/30 text-amber-400 hover:bg-amber-400/10'
                    } transition-all`}
                  >
                    June 19th
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}