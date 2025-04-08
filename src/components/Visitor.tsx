import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { Calendar, Clock, MapPin, Phone, Mail, User } from 'lucide-react';

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
    <div className="min-h-screen bg-black text-gray-300 py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-amber-400">Registered Attendees</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedEvent('all')}
              className={`px-4 py-2 rounded-lg border ${
                selectedEvent === 'all'
                  ? 'bg-amber-400 text-black border-amber-400'
                  : 'border-amber-400/30 text-amber-400 hover:bg-amber-400/10'
              } transition-all`}
            >
              All Events
            </button>
            <button
              onClick={() => setSelectedEvent('april')}
              className={`px-4 py-2 rounded-lg border ${
                selectedEvent === 'april'
                  ? 'bg-amber-400 text-black border-amber-400'
                  : 'border-amber-400/30 text-amber-400 hover:bg-amber-400/10'
              } transition-all`}
            >
              April 9th
            </button>
            <button
              onClick={() => setSelectedEvent('may')}
              className={`px-4 py-2 rounded-lg border ${
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
          <div className="grid gap-4">
            {filteredAttendees.map((attendee, index) => (
              <div 
                key={index}
                className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-amber-400" />
                    <span className="font-medium">{attendee.name}</span>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 md:items-center text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-amber-400" />
                      <a 
                        href={`mailto:${attendee.email}`}
                        className="hover:text-amber-400 transition-colors"
                      >
                        {attendee.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-amber-400" />
                      <a 
                        href={`tel:${attendee.phone}`}
                        className="hover:text-amber-400 transition-colors"
                      >
                        {attendee.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-400" />
                      <span>
                        {attendee.eventDate === 'april' ? 'April 9th' : 'May 4th'}
                      </span>
                    </div>
                    <div className="text-gray-500 text-xs">
                      Registered on {attendee.createdAt.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          Total Registrations: {filteredAttendees.length}
        </div>
      </div>
    </div>
  );
} 