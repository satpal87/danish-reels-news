
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getRemainingViews } from '@/services/articleViewService';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Eye, AlertCircle } from 'lucide-react';

export function ArticleViewCounter() {
  const [remainingViews, setRemainingViews] = useState<number | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRemainingViews = async () => {
      if (user) return; // No need to fetch for logged-in users
      
      try {
        const count = await getRemainingViews();
        setRemainingViews(count);
        console.log('Remaining views:', count); // Debug log to verify count
      } catch (error) {
        console.error('Error fetching remaining views:', error);
      }
    };

    fetchRemainingViews();
    
    // Refresh the counter when component mounts and periodically
    const interval = setInterval(fetchRemainingViews, 5000); // Check more frequently (every 5 seconds)
    
    return () => clearInterval(interval);
  }, [user]);

  // Don't display anything for logged-in users or if we haven't fetched the count yet
  if (user || remainingViews === null) return null;

  // If user has no more views, show a more prominent message
  if (remainingViews <= 0) {
    return (
      <div className="fixed bottom-20 left-0 right-0 z-40 px-4">
        <div className="rounded-lg p-3 bg-red-900/90 flex flex-col items-center">
          <div className="flex items-center mb-2">
            <AlertCircle className="h-5 w-5 mr-2 text-red-300" />
            <span className="text-sm font-medium">You've reached your daily article limit</span>
          </div>
          <Button 
            onClick={() => navigate('/auth')}
            variant="outline"
            className="w-full text-sm"
          >
            Sign in for unlimited access
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 left-0 right-0 z-40 px-4">
      <div className={`rounded-lg p-3 flex items-center justify-between ${
        remainingViews <= 1 ? 'bg-orange-900/80' : 'bg-blue-900/80'
      }`}>
        <div className="flex items-center">
          <Eye className="h-5 w-5 mr-2 text-blue-300" />
          <span className="text-sm">
            {`${remainingViews} free ${remainingViews === 1 ? 'article' : 'articles'} remaining today`}
          </span>
        </div>
        <Button 
          size="sm" 
          onClick={() => navigate('/auth')}
          variant="outline"
          className="ml-2 text-xs"
        >
          Sign in for unlimited access
        </Button>
      </div>
    </div>
  );
}
