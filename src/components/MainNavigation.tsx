
import { Home, Search, List, Heart, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const MainNavigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Search', url: '/search', icon: Search },
    { name: 'Categories', url: '/categories', icon: List },
    { name: 'Saved', url: '/saved', icon: Heart },
    { name: 'Settings', url: '/settings', icon: Settings },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-neutral-800 h-16 flex justify-around items-center px-2 z-30">
        {navItems.map((item) => (
          <Link
            key={item.url}
            to={item.url}
            className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${
              isActive(item.url) ? 'text-blue-500' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </nav>
    );
  }
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-black border-b border-neutral-800 h-16 flex justify-center items-center px-6 z-30">
      <div className="flex items-center justify-between w-full max-w-screen-xl">
        <div className="text-2xl font-bold">
          <Link to="/">
            <span className="text-red-600">danish</span>
            <span className="text-gray-300">news</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.url}
              to={item.url}
              className={`flex items-center transition-colors ${
                isActive(item.url) ? 'text-blue-500' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <item.icon className="w-5 h-5 mr-2" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
