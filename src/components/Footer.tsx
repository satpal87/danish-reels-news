
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold">
                <span className="text-danish-red">danish</span>
                <span className="dark:text-white">news</span>
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Your source for the latest AI-generated Danish and English news articles, delivered fresh every hour.
            </p>
            <div className="flex items-center space-x-3">
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
                <Facebook size={18} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
                <Youtube size={18} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              {['Food', 'Animal', 'Car', 'Sport', 'Music', 'Technology', 'Fashion'].map((category) => (
                <li key={category}>
                  <Link 
                    to={`/categories?filter=${category.toLowerCase()}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
              Information
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/timeline" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                  Timeline
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin size={16} className="mt-1 mr-2 flex-shrink-0 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  123 News Street, Copenhagen, Denmark
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 flex-shrink-0 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  +45 123 456 789
                </span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 flex-shrink-0 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  info@danishnews.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Danish News. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
