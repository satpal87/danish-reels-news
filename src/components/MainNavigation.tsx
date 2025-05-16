
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { User, Home, Search, Newspaper, FileText, LogOut, Settings, BookMarked } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/context/AuthContext';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const menuItems = [
  { path: '/', icon: <Home className="w-5 h-5" />, label: 'Home' },
  { path: '/search', icon: <Search className="w-5 h-5" />, label: 'Search' },
  { path: '/categories', icon: <Newspaper className="w-5 h-5" />, label: 'Categories' },
  { path: '/timeline', icon: <FileText className="w-5 h-5" />, label: 'Timeline' },
];

const MainNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user, signOut, isAdmin } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 h-14 bg-black border-t border-neutral-800 flex justify-around z-50">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${
              isActive(item.path) ? 'text-blue-500' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
        {user ? (
          <>
            <Link
              to="/history"
              className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${
                isActive('/history') ? 'text-blue-500' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <BookMarked className="w-5 h-5" />
              <span className="text-xs mt-1">History</span>
            </Link>
            <button 
              onClick={handleSignOut}
              className="flex flex-col items-center justify-center w-16 h-full text-gray-500 hover:text-gray-300"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-xs mt-1">Logout</span>
            </button>
          </>
        ) : (
          <Link
            to="/auth"
            className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${
              isActive('/auth') ? 'text-blue-500' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">Sign In</span>
          </Link>
        )}
      </nav>
    );
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${
      isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-black'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-white font-bold text-xl">
              DanishNews
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className={`text-sm ${isActive('/') ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                Home
              </Link>
              <Link to="/categories" className={`text-sm ${isActive('/categories') ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                Categories
              </Link>
              <Link to="/timeline" className={`text-sm ${isActive('/timeline') ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                Timeline
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/search" className="text-gray-400 hover:text-white">
              <Search className="h-5 w-5" />
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Account</p>
                      <p className="text-xs leading-none text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/saved')}>
                    <BookMarked className="mr-2 h-4 w-4" />
                    <span>Saved Articles</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/history')}>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Reading History</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/admin')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Admin Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm">Sign in</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
