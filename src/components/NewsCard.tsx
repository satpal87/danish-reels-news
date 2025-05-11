import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface NewsItemProps {
  id: string;
  title: string;
  summary: string;
  category: string;
  imageUrl: string;
  fullStory?: string;
  url?: string;
}

interface NewsCardProps {
  news: NewsItemProps;
  isActive: boolean;
  onComplete?: () => void;
  autoSlide?: boolean;
}

const NewsCard = ({ news, isActive, onComplete, autoSlide = true }: NewsCardProps) => {
  const [readMore, setReadMore] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setProgress(0);
      setReadMore(false);
      return;
    }
    
    if (!readMore && autoSlide) {
      setProgress(0);
      
      // Reset and start timer
      const startTime = Date.now();
      const duration = 30000; // 30 seconds
      
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(newProgress);
        
        if (newProgress >= 100 && onComplete) {
          onComplete();
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      }, 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, readMore, onComplete, autoSlide]);

  const handleReadMore = () => {
    if (readMore) {
      setReadMore(false);
      return;
    }
    
    if (news.url) {
      // If URL is provided, open it in a new tab
      window.open(news.url, '_blank', 'noopener,noreferrer');
    } else {
      // Otherwise just toggle the read more state
      setReadMore(true);
    }
  };

  return (
    <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
      {/* Progress bar */}
      {!readMore && isActive && (
        <div className="story-progress-bar">
          <div 
            className="story-progress"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="flex flex-col h-full overflow-hidden relative">
        {/* Image with gradient overlay */}
        <div className="relative h-2/5">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${news.imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
          
          {/* Category badge */}
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
            {news.category}
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col">
          <h2 className="text-2xl font-bold mb-3">{news.title}</h2>
          
          <div className="flex-1 overflow-y-auto">
            <p className="text-muted-foreground mb-4">{news.summary}</p>
            
            {readMore && news.fullStory && (
              <div className="mt-2 animate-fade-in text-foreground">
                {news.fullStory}
              </div>
            )}
          </div>
          
          <Button 
            onClick={handleReadMore}
            className="mt-4 self-start"
          >
            {readMore ? 'Show Less' : 'Read More'} 
            {!readMore && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
