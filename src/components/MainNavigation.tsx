
import { Home, Search, List, Heart, Settings } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { TubelightNavbar } from './ui/tubelight-navbar';
import { useState, useEffect } from 'react';

const MainNavigation = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('Home');
  
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Search', url: '/search', icon: Search },
    { name: 'Categories', url: '/categories', icon: List },
    { name: 'Saved', url: '/saved', icon: Heart },
    { name: 'Settings', url: '/settings', icon: Settings },
  ];
  
  useEffect(() => {
    // Update active item based on current location
    const currentPath = location.pathname;
    const currentItem = navItems.find(item => item.url === currentPath);
    if (currentItem) {
      setActiveItem(currentItem.name);
    }
  }, [location.pathname]);
  
  return <TubelightNavbar items={navItems} />;
};

export default MainNavigation;
