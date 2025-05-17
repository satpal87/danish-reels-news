
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const PageFooter = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Logo size="medium" />
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Your trusted source for Danish news and information in English. Stay updated with the latest stories.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-black dark:text-white mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/categories?filter=news" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  News
                </Link>
              </li>
              <li>
                <Link to="/categories?filter=sports" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  Sports
                </Link>
              </li>
              <li>
                <Link to="/categories?filter=business" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  Business
                </Link>
              </li>
              <li>
                <Link to="/categories?filter=technology" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  Technology
                </Link>
              </li>
              <li>
                <Link to="/categories?filter=entertainment" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  Entertainment
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-black dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/timeline" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  Timeline
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-black dark:text-white mb-4">Subscribe</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Stay updated with our latest news and updates.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email"
                className="px-4 py-2 text-sm rounded-l-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md text-sm hover:bg-blue-700">
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} DanishNews. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
            <Link to="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
              Privacy Policy
            </Link>
            <Link to="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
              Terms of Service
            </Link>
            <Link to="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;
