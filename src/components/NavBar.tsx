
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, Bookmark, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';
import Logo from '@/components/Logo';
import SearchBar from '@/components/SearchBar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
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
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md shadow-sm' 
        : 'bg-white dark:bg-gray-950'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo size="medium" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
              location.pathname === '/' ? 'text-blue-600 dark:text-blue-400' : ''
            }`}>
              Home
            </Link>
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
            {/* Theme Toggle */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            
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
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            
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
                  {/* Admin link for special users */}
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
                Sign in
              </Link>
            )}
          </div>
        </div>
        
        {/* Search Bar (Expands when search button is clicked) */}
        {isSearchOpen && (
          <div className="py-3 px-4">
            <SearchBar onSearch={handleSearch} />
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
