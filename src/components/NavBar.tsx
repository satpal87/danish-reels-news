
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, Bookmark, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';
import SearchBar from '@/components/SearchBar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (query: string) => {
    setIsSearchOpen(false);
    navigate(`/search?q=${query}`);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const categoryItems = [
    { label: "News", href: "/categories?filter=news" },
    { label: "Sports", href: "/categories?filter=sports" },
    { label: "Technology", href: "/categories?filter=technology" },
    { label: "Business", href: "/categories?filter=business" },
    { label: "Entertainment", href: "/categories?filter=entertainment" },
    { label: "Health", href: "/categories?filter=health" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md shadow-sm' 
        : 'bg-white dark:bg-gray-950'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-danish-red">danish</span>
              <span className="dark:text-white">news</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-1 p-2">
                      {categoryItems.map((item) => (
                        <li key={item.label}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              {item.label}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Link to="/contact" className={`text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
              location.pathname === '/contact' ? 'text-blue-600 dark:text-blue-400' : ''
            }`}>
              Contact Us
            </Link>
            <Link to="/about" className={`text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
              location.pathname === '/about' ? 'text-blue-600 dark:text-blue-400' : ''
            }`}>
              About Us
            </Link>
            <Link to="/timeline" className={`text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
              location.pathname === '/timeline' ? 'text-blue-600 dark:text-blue-400' : ''
            }`}>
              Timeline
            </Link>
          </nav>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            
            {/* Bookmarks */}
            <Link to="/saved" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Bookmark className="h-5 w-5" />
            </Link>
            
            {/* Notifications */}
            <Link to="/notifications" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Bell className="h-5 w-5" />
            </Link>
            
            {/* User Profile */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                    {user.email?.charAt(0).toUpperCase()}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>My Account</span>
                      <span className="text-xs text-gray-500 truncate">{user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/saved')}>
                    Saved Articles
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/history')}>
                    Reading History
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/admin')}>
                    Admin Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link 
                to="/auth"
                className="py-1.5 px-3 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
            )}
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Search Bar (Expands when search button is clicked) */}
        {isSearchOpen && (
          <div className="py-3 px-4">
            <SearchBar onSearch={handleSearch} />
          </div>
        )}
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 px-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              {categoryItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link 
                to="/contact" 
                className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
              <Link 
                to="/about" 
                className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/timeline" 
                className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Timeline
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
