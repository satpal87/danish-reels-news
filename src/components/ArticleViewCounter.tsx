
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
      } catch (error) {
        console.error('Error fetching remaining views:', error);
      }
    };

    fetchRemainingViews();
    
    // Refresh the counter every minute or when component mounts
    const interval = setInterval(fetchRemainingViews, 60000);
    
    return () => clearInterval(interval);
  }, [user]);

  if (user || remainingViews === null) return null;

  return (
    <div className="fixed bottom-20 left-0 right-0 z-40 px-4">
      <div className={`rounded-lg p-3 flex items-center justify-between transition-colors ${
        remainingViews <= 1 ? 'bg-red-900/80' : 'bg-blue-900/80'
      }`}>
        <div className="flex items-center">
          {remainingViews <= 1 ? (
            <AlertCircle className="h-5 w-5 mr-2 text-red-300" />
          ) : (
            <Eye className="h-5 w-5 mr-2 text-blue-300" />
          )}
          <span className="text-sm">
            {remainingViews === 0 
              ? "You've reached your daily limit" 
              : `${remainingViews} free ${remainingViews === 1 ? 'article' : 'articles'} remaining today`}
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
