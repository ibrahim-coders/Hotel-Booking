import { Link } from 'react-router-dom';
import { CiFacebook, CiInstagram, CiTwitter, CiYoutube } from 'react-icons/ci';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-2xl mb-4">StayNexus</h3>
            <p className="text-gray-400 mb-6">
              Find and book your perfect accommodation worldwide. We offer the
              best prices and a seamless booking experience.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-teal-400 transition-colors"
              >
                <CiFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-teal-400 transition-colors"
              >
                <CiTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-teal-400 transition-colors"
              >
                <CiInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-teal-400 transition-colors"
              >
                <CiYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/hotels"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                >
                  Browse Hotels
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/help"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/cancellation"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                >
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-4">
              Subscribe to Our Newsletter
            </h4>
            <p className="text-gray-400 mb-4">
              Get exclusive deals and travel inspiration delivered straight to
              your inbox
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <button className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-4 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} StayNexus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
