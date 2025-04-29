import React, { useState, useEffect } from 'react';
import { CalendarCheck, Minus, Plus } from 'lucide-react';

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

  useEffect(() => {
    // Calculate total whenever events change
    calculateTotal();
    
    // Check if all events are selected
    const allSelected = Object.values(events).every(event => event.selected);
    setAllEventsSelected(allSelected);
  }, [events]);

  const calculateTotal = () => {
    if (formData.subscription) {
      setTotal(348); // 12 months at $29/month
      return;
    }
    
    let sum = 0;
    Object.values(events).forEach(event => {
      if (event.selected) {
        sum += event.price * event.quantity;
      }
    });
    setTotal(sum);
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
    
    // Don't allow quantity below 1
    if (!increment && currentQuantity <= 1) return;
    
    // Don't allow quantity above 10
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedEvents = Object.entries(events)
      .filter(([_, event]) => event.selected)
      .map(([key, event]) => ({
        name: event.name,
        quantity: event.quantity,
        price: event.price,
        subtotal: event.quantity * event.price
      }));
    
    const submissionData = {
      ...formData,
      events: selectedEvents,
      total: total
    };
    
    console.log('Form submitted:', submissionData);
    // Here you would typically send the data to your backend
    alert(`Thank you for booking! Your total is $${total}. We will contact you shortly to confirm your reservation.`);
  };

  return (
    <section id="book-now" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
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
                          className="bg-grey-700 text-white p-1 rounded-l"
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
                    <span>${event.price * event.quantity}</span>
                  </div>
                )
              )}
              {formData.subscription && (
                <div className="flex justify-between text-gray-300 text-sm mb-2">
                  <span>Annual Subscription (12 months)</span>
                  <span>$348</span>
                </div>
              )}
              <div className="border-t border-gray-700 mt-3 pt-3 flex justify-between text-white font-bold">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full px-8 py-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all transform hover:scale-105"
              >
                Book Your MINY Experience
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingCTA;