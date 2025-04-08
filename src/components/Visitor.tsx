import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { Calendar, Clock, MapPin, Phone, Mail, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Attendee {
  name: string;
  email: string;
  phone: string;
  eventDate: 'april' | 'may';
  createdAt: Date;
}

export function Visitor() {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<'all' | 'april' | 'may'>('all');

  useEffect(() => {
    async function fetchAttendees() {
      try {
        const q = query(collection(db, 'minyvinyl_registrations'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const attendeeData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate()
        })) as Attendee[];
        setAttendees(attendeeData);
        setError(null);
      } catch (err) {
        console.error('Error fetching attendees:', err);
        setError('Failed to load attendees. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchAttendees();
  }, []);

  const filteredAttendees = selectedEvent === 'all' 
    ? attendees 
    : attendees.filter(a => a.eventDate === selectedEvent);

  return (
    <div className="min-h-screen bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <Link to="/" className="text-amber-400 font-black text-2xl md:text-3xl">MINY</Link>
            <h1 className="text-xl font-medium text-gray-300 mt-2">Registered Attendees</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedEvent('all')}
              className={`px-4 py-1.5 rounded-full text-sm border ${
                selectedEvent === 'all'
                  ? 'bg-amber-400 text-black border-amber-400'
                  : 'border-amber-400/30 text-amber-400 hover:bg-amber-400/10'
              } transition-all`}
            >
              All Events
            </button>
            <button
              onClick={() => setSelectedEvent('april')}
              className={`px-4 py-1.5 rounded-full text-sm border ${
                selectedEvent === 'april'
                  ? 'bg-amber-400 text-black border-amber-400'
                  : 'border-amber-400/30 text-amber-400 hover:bg-amber-400/10'
              } transition-all`}
            >
              April 9th
            </button>
            <button
              onClick={() => setSelectedEvent('may')}
              className={`px-4 py-1.5 rounded-full text-sm border ${
                selectedEvent === 'may'
                  ? 'bg-amber-400 text-black border-amber-400'
                  : 'border-amber-400/30 text-amber-400 hover:bg-amber-400/10'
              } transition-all`}
            >
              May 4th
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-400 mx-auto"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-400">{error}</div>
        ) : filteredAttendees.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No registrations found.</div>
        ) : (
          <div className="space-y-3">
            {filteredAttendees.map((attendee, index) => (
              <div 
                key={index}
                className="bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex items-center gap-3 min-w-[200px]">
                    <div className="w-8 h-8 rounded-full bg-amber-400/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-amber-400" />
                    </div>
                    <span className="font-medium text-white">{attendee.name}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center text-sm flex-1">
                    <div className="flex items-center gap-2 min-w-[200px]">
                      <Mail className="w-4 h-4 text-amber-400/70" />
                      <a 
                        href={`mailto:${attendee.email}`}
                        className="text-gray-400 hover:text-amber-400 transition-colors"
                      >
                        {attendee.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-amber-400/70" />
                      <a 
                        href={`tel:${attendee.phone}`}
                        className="text-gray-400 hover:text-amber-400 transition-colors"
                      >
                        {attendee.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      <Calendar className="w-4 h-4 text-amber-400/70" />
                      <span className="text-gray-400">
                        {attendee.eventDate === 'april' ? 'April 9th' : 'May 4th'}
                      </span>
                    </div>
                  </div>
                  <div className="text-gray-500 text-xs whitespace-nowrap">
                    Registered {attendee.createdAt.toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between text-sm text-gray-500 border-t border-white/5 pt-4">
          <div>
            Total Registrations: <span className="text-amber-400">{filteredAttendees.length}</span>
          </div>
          <div>
            {selectedEvent !== 'all' && `Showing ${selectedEvent} event only`}
          </div>
        </div>
      </div>
    </div>
  );
} 