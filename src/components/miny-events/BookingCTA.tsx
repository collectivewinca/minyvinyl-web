import React, { useState, useEffect } from 'react';
import { CalendarCheck, Minus, Plus } from 'lucide-react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

interface EventDetail {
  name: string;
  price: number;
  selected: boolean;
  quantity: number;
}

const BookingCTA: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subscription: false
  });

  const [events, setEvents] = useState<{[key: string]: EventDetail}>({
    mayFourth: { name: "MAY THE 4TH BE WITH YOU — GALACTIC GROOVE", price: 49, selected: false, quantity: 1 },
    soundAndSmoke: { name: "SOUND & SMOKE CANDLELIT BBQ", price: 49, selected: false, quantity: 1 },
    juneteenth: { name: "JUNETEENTH CELEBRATION BBQ", price: 49, selected: false, quantity: 1 },
    summerVinyl: { name: "SUMMER VINYL SESSIONS", price: 49, selected: false, quantity: 1 }
  });

  const [total, setTotal] = useState(0);
  const [allEventsSelected, setAllEventsSelected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    calculateTotal();
    const allSelected = Object.values(events).every(event => event.selected);
    setAllEventsSelected(allSelected);
  }, [events, formData.subscription]);

  const calculateTotal = () => {
    let sum = 0;
    
    // Add subscription cost if selected
    if (formData.subscription) {
      sum += 348;
    }
    
    // Add event costs with 40% discount if subscription is selected
    Object.values(events).forEach(event => {
      if (event.selected) {
        const eventPrice = formData.subscription ? Number((event.price * 0.6).toFixed(2)) : event.price;
        sum += Number((eventPrice * event.quantity).toFixed(2));
      }
    });
    
    setTotal(Number(sum.toFixed(2)));
  };

  const getEventPrice = (price: number) => {
    return formData.subscription ? Number((price * 0.6).toFixed(2)) : price;
  };

  const getEventSubtotal = (price: number, quantity: number) => {
    return Number((getEventPrice(price) * quantity).toFixed(2));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEventCheckboxChange = (eventKey: string, checked: boolean) => {
    setEvents({
      ...events,
      [eventKey]: {
        ...events[eventKey],
        selected: checked
      }
    });
  };

  const handleAllEventsChange = (checked: boolean) => {
    const updatedEvents = { ...events };
    Object.keys(updatedEvents).forEach(key => {
      updatedEvents[key].selected = checked;
    });
    setEvents(updatedEvents);
  };

  const handleQuantityChange = (eventKey: string, increment: boolean) => {
    const currentQuantity = events[eventKey].quantity;
    if (!increment && currentQuantity <= 1) return;
    if (increment && currentQuantity >= 10) return;
    
    setEvents({
      ...events,
      [eventKey]: {
        ...events[eventKey],
        quantity: increment ? currentQuantity + 1 : currentQuantity - 1
      }
    });
  };

  const handleSubscriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      subscription: e.target.checked
    });
  };

  const sendConfirmationEmail = async (name: string, email: string, events: any[], total: number) => {
    const eventList = events.map(event => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #333;">${event.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #333;">${event.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #333;">$${event.price * event.quantity}</td>
      </tr>
    `).join('');

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f8f8;">
        <div style="background-color: #000000; padding: 30px; border-radius: 10px; color: #ffffff;">
          <h1 style="color: #fbbf24; text-align: center; font-size: 28px; margin-bottom: 20px;">Thank You for Your MINY Event Registration!</h1>
          
          <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Dear ${name},
          </p>
          
          <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            We're excited to confirm your registration for the following MINY events:
          </p>
          
          <div style="background-color: #1a1a1a; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr>
                  <th style="text-align: left; padding: 10px; border-bottom: 2px solid #333;">Event</th>
                  <th style="text-align: center; padding: 10px; border-bottom: 2px solid #333;">Quantity</th>
                  <th style="text-align: right; padding: 10px; border-bottom: 2px solid #333;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${eventList}
                <tr>
                  <td colspan="2" style="text-align: right; padding: 10px; font-weight: bold;">Total:</td>
                  <td style="text-align: right; padding: 10px; font-weight: bold;">$${total}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            We look forward to seeing you at our events! Please arrive 15 minutes before each event begins.
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
          subject: 'Your MINY Event Registration Confirmation',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
    const selectedEvents = Object.entries(events)
      .filter(([_, event]) => event.selected)
      .map(([key, event]) => ({
        name: event.name,
        quantity: event.quantity,
        price: event.price,
        subtotal: event.quantity * event.price
      }));
    
      if (selectedEvents.length === 0 && !formData.subscription) {
        throw new Error('Please select at least one event or subscription');
      }

      // First, create the registration in Firestore
      const registrationRef = await addDoc(collection(db, 'minyvinyl_registrations'), {
      ...formData,
      events: selectedEvents,
        total,
        createdAt: new Date(),
        paymentStatus: 'initiated',
        paymentSessionId: null,
        paymentCompletedAt: null,
        subscriptionDetails: formData.subscription ? {
          type: 'annual',
          monthlyPrice: 29,
          totalMonths: 12,
          totalAmount: 348,
          startDate: new Date(),
          endDate: new Date(new Date().setMonth(new Date().getMonth() + 12))
        } : null
      });

      // Create Stripe checkout session with the registration ID
      const response = await fetch('https://payment-test.alet8891.workers.dev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origin: window.location.origin,
          amount: total,
          productName: formData.subscription 
            ? selectedEvents.length > 0 
              ? `MINY Annual Subscription + ${selectedEvents.map(e => e.name).join(', ')}`
              : 'MINY Annual Subscription'
            : 'MINY Event Tickets',
          productDescription: formData.subscription 
            ? selectedEvents.length > 0
              ? `Annual subscription to all MINY events (12 months at $29/month) + ${selectedEvents.map(e => `${e.name} x${e.quantity} (40% off)`).join(', ')}`
              : 'Annual subscription to all MINY events (12 months at $29/month)'
            : selectedEvents.map(e => `${e.name} x${e.quantity}`).join(', '),
          successUrl: `${window.location.origin}/success?registrationId=${registrationRef.id}`,
          cancelUrl: `${window.location.origin}/miny-events`,
          metadata: {
            registrationId: registrationRef.id,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            events: JSON.stringify(selectedEvents.map(event => ({
              ...event,
              price: formData.subscription ? event.price * 0.6 : event.price,
              subtotal: formData.subscription ? event.price * 0.6 * event.quantity : event.price * event.quantity
            }))),
            subscription: formData.subscription,
            subscriptionDetails: formData.subscription ? JSON.stringify({
              type: 'annual',
              monthlyPrice: 29,
              totalMonths: 12,
              totalAmount: 348
            }) : null
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create payment session');
      }

      const { url } = await response.json();

      // Redirect to Stripe checkout
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process registration');
      console.error('Registration error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="book-now" className="py-16 px-4 sm:px-6 lg:px-8 bg-black relative">
      <div className="w-full mx-auto">
        <div className="text-center mb-10">
          <CalendarCheck className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience MINY?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Secure your spot at our next event and become part of the MINY community. 
            Limited spaces available for each unique audio journey.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-200">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Your phone number"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Your email address"
              />
            </div>

            {/* Event Selection */}
            <div>
              <p className="block text-sm font-medium text-white mb-3">
                Which event(s) would you like to attend?
              </p>
              <div className="space-y-3">
                {Object.entries(events).map(([key, event]) => (
                  <div key={key} className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-gray-700">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={key}
                        checked={event.selected}
                        onChange={(e) => handleEventCheckboxChange(key, e.target.checked)}
                        className="h-5 w-5 rounded text-white focus:ring-white bg-gray-700 border-gray-600"
                      />
                      <label htmlFor={key} className="ml-3 text-gray-200">
                        {key === 'mayFourth' && '🌟 MAY 4TH - '}
                        {key === 'soundAndSmoke' && '🔥 MAY 16 - '}
                        {key === 'juneteenth' && '🖤 JUNE 19 - '}
                        {key === 'summerVinyl' && '🌴 JULY 15 - '}
                        "{event.name}"
                      </label>
                    </div>
                    
                    {event.selected && (
                      <div className="flex items-center">
                        <span className="text-gray-300 mr-2">Qty:</span>
                        <button 
                          type="button"
                          onClick={() => handleQuantityChange(key, false)}
                          className="bg-gray-700 text-white p-1 rounded-l"
                          disabled={event.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="bg-gray-800 text-white px-3 py-1">{event.quantity}</span>
                        <button 
                          type="button"
                          onClick={() => handleQuantityChange(key, true)}
                          className="bg-gray-700 text-white p-1 rounded-r"
                          disabled={event.quantity >= 10}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <span className="ml-4 text-white font-medium">${event.price * event.quantity}</span>
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="flex items-center pt-2 border-t border-gray-700">
                  <input
                    type="checkbox"
                    id="allEvents"
                    checked={allEventsSelected}
                    onChange={(e) => handleAllEventsChange(e.target.checked)}
                    className="h-5 w-5 rounded text-white focus:ring-white bg-gray-700 border-gray-600"
                  />
                  <label htmlFor="allEvents" className="ml-3 text-gray-200 font-medium">
                    Select All Events
                  </label>
                </div>
              </div>
            </div>

            {/* Subscription Option */}
            <div className="pt-4 border-t border-gray-700">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="subscription"
                    name="subscription"
                    checked={formData.subscription}
                    onChange={handleSubscriptionChange}
                    className="h-5 w-5 rounded text-white focus:ring-white bg-gray-700 border-gray-600"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="subscription" className="font-medium text-white">
                    Monthly Subscription - $29/month
                  </label>
                  <p className="text-gray-300 text-sm mt-1">
                    Get access to all events for $29/month with a 12-month commitment ($348 upfront). Save up to 40% compared to individual event tickets!
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="pt-4 border-t border-gray-700 bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-3">Order Summary</h3>
              {Object.entries(events).map(([key, event]) => 
                event.selected && (
                  <div key={`summary-${key}`} className="flex justify-between text-gray-300 text-sm mb-2">
                    <span>{event.name} x {event.quantity}</span>
                    <div className="text-right">
                      {formData.subscription && (
                        <div className="text-xs text-gray-400 line-through">${(event.price * event.quantity).toFixed(2)}</div>
                      )}
                      <span>${getEventSubtotal(event.price, event.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                )
              )}
              {formData.subscription && (
                <div className="flex justify-between text-gray-300 text-sm mb-2">
                  <span>Annual Subscription (12 months)</span>
                  <span>$348.00</span>
                </div>
              )}
              <div className="border-t border-gray-700 mt-3 pt-3 flex justify-between text-white font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  'Book Your MINY Experience'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingCTA;