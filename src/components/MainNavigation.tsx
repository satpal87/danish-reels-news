
import { Home, Clock, List, Heart, Settings, User, LogOut, FileText } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArticleViewCounter } from '@/components/ArticleViewCounter';

const MainNavigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Timeline', url: '/timeline', icon: Clock },
    { name: 'Categories', url: '/categories', icon: List },
    ...(user ? [{ name: 'Saved', url: '/saved', icon: Heart }] : []),
    { name: 'Settings', url: '/settings', icon: Settings },
  ];
  
  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  
  if (isMobile) {
    return (
      <>
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
          {user ? (
            <Link
              to="/history"
              className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${
                isActive('/history') ? 'text-blue-500' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span className="text-xs mt-1">History</span>
            </Link>
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
        <ArticleViewCounter />
      </>
    );
  }
  
  return (
    <>
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
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    <span>Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem disabled className="text-sm font-medium text-neutral-400">
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/history')}>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Reading History</span>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/auth"
                className="flex items-center text-blue-500 hover:text-blue-400"
              >
                <User className="w-5 h-5 mr-2" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </nav>
      <ArticleViewCounter />
    </>
  );
};

export default MainNavigation;
