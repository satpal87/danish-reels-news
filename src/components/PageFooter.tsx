
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";

const PageFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-200 pt-12 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and About */}
          <div className="col-span-1">
            <h2 className="text-xl font-bold mb-4">Danish News</h2>
            <p className="text-gray-400 mb-4">
              Your trusted source for AI-powered news in Danish and English. Stay informed with the latest stories from Denmark and around the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-white transition-colors">Categories</Link>
              </li>
              <li>
                <Link to="/timeline" className="text-gray-400 hover:text-white transition-colors">Timeline</Link>
              </li>
              <li>
                <Link to="/saved" className="text-gray-400 hover:text-white transition-colors">Saved Articles</Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div className="col-span-1">
            <h3 className="font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categories?filter=Food" className="text-gray-400 hover:text-white transition-colors">Food</Link>
              </li>
              <li>
                <Link to="/categories?filter=Technology" className="text-gray-400 hover:text-white transition-colors">Technology</Link>
              </li>
              <li>
                <Link to="/categories?filter=Politics" className="text-gray-400 hover:text-white transition-colors">Politics</Link>
              </li>
              <li>
                <Link to="/categories?filter=Sport" className="text-gray-400 hover:text-white transition-colors">Sport</Link>
              </li>
              <li>
                <Link to="/categories?filter=Local" className="text-gray-400 hover:text-white transition-colors">Local</Link>
              </li>
            </ul>
          </div>
          
          {/* Subscribe */}
          <div className="col-span-1">
            <h3 className="font-semibold text-white mb-4">Subscribe</h3>
            <p className="text-gray-400 mb-4">
              Get the latest news delivered directly to your inbox.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 text-sm border border-gray-700 rounded-l px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-200 flex-grow"
              />
              <button className="bg-blue-600 text-white px-3 py-2 rounded-r hover:bg-blue-700 transition-colors">
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="pt-6 border-t border-gray-800 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            © {currentYear} Danish News. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <Link to="#" className="hover:text-gray-300">Terms</Link>
            <Link to="#" className="hover:text-gray-300">Privacy</Link>
            <Link to="#" className="hover:text-gray-300">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;
