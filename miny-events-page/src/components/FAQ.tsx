import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquareQuote as MessageSquareQuestion } from 'lucide-react';

const FAQ: React.FC = () => {
  // Track which questions are expanded
  const [expandedQuestions, setExpandedQuestions] = useState<{[key: number]: boolean}>({
    0: true // First question expanded by default
  });

  // Toggle question expansion
  const toggleQuestion = (index: number) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // FAQ Data
  const faqs = [
    {
      question: "What exactly is a MINY?",
      answer: "A MINY is a 2\" digital-vinyl collectible. Tap the NFC marker with your phone and you'll own the evening's exclusive playlist, artwork, and behind-the-scenes content."
    },
    {
      question: "Where is the event held?",
      answer: "13ᵗʰ Storey — Manhattan, NYC (Subway: 1 / N / R @ 28 St)."
    },
    {
      question: "What are the hours?",
      answer: "Doors at 5:45 PM. Program runs 6 – 9 PM. Arrive by 6:30 PM for the full vinyl sequence."
    },
    {
      question: "Dress code?",
      answer: "Street-Jedi chic: think sneakers + robes, bomber jackets over tunics, or subtle saga tees. Cosplay welcome but lightsabers must be foam or plastic."
    },
    {
      question: "Will there be food and drinks?",
      answer: "Yes. Your ticket includes one Blue-Milk Old Fashioned (alcoholic or zero-proof). Light bar snacks are served; no full meals."
    },
    {
      question: "Is the session seated or standing?",
      answer: "Mixed. Lounge seating for ~40, plus high tops and gallery strolling space. Arrive early if you prefer a seat."
    },
    {
      question: "Age restriction?",
      answer: "18+ to attend, 21+ wristbands for alcoholic pours."
    },
    {
      question: "How do I claim the MINY?",
      answer: "Tap your phone on the NFC pad at your seat or at the merch table. Follow the on-screen prompt to add the MINY to your wallet (no app download required)."
    },
    {
      question: "I'm new to NFC—what if my phone won't scan?",
      answer: "Staff will assist; we have QR fallback codes for older devices."
    },
    {
      question: "Can I buy merch on site?",
      answer: "Limited tees and holo-foil sticker packs are screen-printed live. Cashless payments only (card/Apple Pay/Google Pay)."
    },
    {
      question: "Are tickets refundable?",
      answer: "Tickets are non-refundable but transferable. Use the link in your confirmation email to change the attendee name up to 24 hours before showtime."
    },
    {
      question: "Accessibility accommodations?",
      answer: "13ᵗʰ Storey is elevator-equipped and wheelchair-accessible. Email events@minyvinyl.com for specific needs at least 48 hours ahead."
    },
    {
      question: "Photography allowed?",
      answer: "Casual photos/video for personal use are fine (no flash). Tag @minyvinyl + #UrbanForce. Professional rigs require prior approval."
    },
    {
      question: "Parking options?",
      answer: "Limited street parking. Nearest garage: ICON Parking, 249 W 28 St (4-min walk)."
    },
    {
      question: "What happens if the event sells out?",
      answer: "Join the wait-list on the ticket page. You'll be notified automatically if a spot opens."
    }
  ];

  // Concert Policies
  const concertPolicies = [
    {
      policy: "Phones must be turned off during the performance",
      details: "All mobile devices should be silenced and put away during the performance to ensure an immersive experience for all attendees."
    },
    {
      policy: "No photography or recording allowed",
      details: "To respect the artists and preserve the unique atmosphere, photography and recording are not permitted during performances."
    },
    {
      policy: "Late arrivals will not be admitted until the break",
      details: "For the comfort of all guests and performers, late arrivals will be asked to wait until a suitable break in the performance before entering."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black text-white min-h-screen pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <MessageSquareQuestion className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-300">
            MINY Listening Session — "May the 4ᵗʰ Be With You"
          </p>
        </div>

        {/* Concert Policies Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Concert Policies</h2>
          <div className="space-y-4">
            {concertPolicies.map((item, index) => (
              <div 
                key={`policy-${index}`}
                className="bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6"
              >
                <h3 className="text-lg font-medium text-white mb-2">{item.policy}</h3>
                <p className="text-gray-300">{item.details}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleQuestion(index)}
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                {expandedQuestions[index] ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>

              {expandedQuestions[index] && (
                <div className="px-6 pb-4 text-gray-300">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 inline-block">
            <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
            <p className="text-gray-300 mb-4">
              Email <a href="mailto:events@minyvinyl.com" className="text-white hover:underline">events@minyvinyl.com</a> or DM <a href="https://instagram.com/minyvinyl" className="text-white hover:underline" target="_blank" rel="noopener noreferrer">@minyvinyl</a> on Instagram.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;