import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { Calendar, Clock, MapPin, Phone, Mail, User, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  events: Array<{
    name: string;
    quantity: number;
    price: number;
    subtotal: number;
  }>;
  total: number;
  createdAt: Date;
  paymentStatus: 'initiated' | 'completed' | 'failed';
  subscription: boolean;
  subscriptionDetails?: {
    type: string;
    monthlyPrice: number;
    totalMonths: number;
    totalAmount: number;
    startDate: Date;
    endDate: Date;
  };
}

export function Visitor() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<string>('all');

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const registrationsRef = collection(db, 'minyvinyl_registrations');
        const q = query(registrationsRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const registrationsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate()
        })) as Registration[];
        
        setRegistrations(registrationsData);
      } catch (error) {
        console.error('Error fetching registrations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const filteredRegistrations = selectedEvent === 'all'
    ? registrations
    : registrations.filter(reg => 
        reg.events.some(event => event.name === selectedEvent)
      );

  const getEventSubtotal = (event: { price: number; quantity: number }, hasSubscription: boolean) => {
    const price = hasSubscription ? event.price * 0.6 : event.price;
    return (price * event.quantity).toFixed(2);
  };

  const getEventPrice = (price: number, hasSubscription: boolean) => {
    return (hasSubscription ? price * 0.6 : price).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mt-10 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Visitor Registrations</h1>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="bg-neutral-800 text-white px-4 py-2 rounded-lg border border-neutral-700"
          >
            <option value="all">All Events</option>
            <option value="MAY THE 4TH BE WITH YOU — GALACTIC GROOVE">May 4th Event</option>
            <option value="SOUND & SMOKE CANDLELIT BBQ">Sound & Smoke BBQ</option>
            <option value="JUNETEENTH CELEBRATION BBQ">Juneteenth BBQ</option>
            <option value="SUMMER VINYL SESSIONS">Summer Vinyl Sessions</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="mt-4 text-neutral-400">Loading registrations...</p>
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="text-center py-12 bg-neutral-800/50 rounded-lg">
            <p className="text-neutral-400">No registrations found for the selected event.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredRegistrations.map((registration) => (
              <div key={registration.id} className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700/50">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-5 w-5 text-neutral-400" />
                      <h2 className="text-xl font-semibold">{registration.name}</h2>
                      {registration.paymentStatus === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : registration.paymentStatus === 'failed' ? (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-yellow-500"></div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-neutral-300">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        <span>{registration.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        <span>{registration.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{registration.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold">${registration.total.toFixed(2)}</div>
                    <div className="text-sm text-neutral-400">
                      {registration.paymentStatus === 'completed' ? 'Paid' : 
                       registration.paymentStatus === 'failed' ? 'Payment Failed' : 
                       'Payment Initiated'}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-neutral-700">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium text-neutral-400">Registered Events</h3>
                    {registration.subscription && (
                      <span className="text-sm bg-amber-400/20 text-amber-400 px-3 py-1 rounded-full">
                        Annual Subscription
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    {registration.subscription && (
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-300">
                          MINY Annual Subscription
                        </span>
                        <span className="text-neutral-300">${registration.subscriptionDetails?.totalAmount.toFixed(2)}</span>
                      </div>
                    )}
                    {registration.events.map((event, eventIndex) => (
                      <div key={eventIndex} className="flex justify-between text-sm">
                        <span className="text-neutral-300">
                          {event.name} x{event.quantity}
                        </span>
                        <div className="text-right">
                          {registration.subscription && (
                            <div className="text-xs text-neutral-400 line-through">${(event.price * event.quantity).toFixed(2)}</div>
                          )}
                          <span className="text-neutral-300">${getEventSubtotal(event, registration.subscription)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 