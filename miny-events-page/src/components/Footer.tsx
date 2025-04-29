import React from 'react';
import { MapPin, Phone, Mail, Headphones } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-black text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <Headphones className="h-8 w-8 text-white" />
              <span className="ml-2 text-white font-bold text-xl">MINY Events</span>
            </div>
            <p className="text-sm mb-4">
              Curating unique audio experiences that bring communities together through the power of music. Specializing in candlelit concerts in intimate venues.
            </p>
          </div>

          {/* Connect with Us */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect with Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-white mr-2 mt-0.5" />
                <span>13th Storey<br />Manhattan, NYC</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-white mr-2" />
                <span>+1 (415) 936-7377</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-white mr-2" />
                <span><a href="mailto:hello@minyvinyl.com" className="hover:text-white transition-colors">hello@minyvinyl.com</a></span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#events" className="hover:text-white transition-colors">Events</a>
              </li>
              <li>
                <a href="#tickets" className="hover:text-white transition-colors">Tickets</a>
              </li>
              <li>
                <a href="#experience" className="hover:text-white transition-colors">MINY Experience</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Private Events</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Candlelit Concerts</a>
              </li>
            </ul>
          </div>

          {/* Newsletter & FAQs */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm mb-4">
              Subscribe to our newsletter for exclusive updates and early access to candlelit concert tickets.
            </p>
            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full rounded-l-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-white"
                />
                <button
                  type="submit"
                  className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-r-lg transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <a href="#faq" className="text-white hover:text-gray-300 transition-colors">
              FAQs
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} MINY Events. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;