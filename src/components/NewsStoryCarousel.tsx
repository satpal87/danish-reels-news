
import { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NewsArticle } from '@/services/newsService';
import { useNavigate } from 'react-router-dom';
import { formatPublishedDate } from '@/lib/utils';

interface NewsStoryCarouselProps {
  articles: NewsArticle[];
  autoScrollInterval?: number; // in milliseconds
}

const NewsStoryCarousel = ({ 
  articles, 
  autoScrollInterval = 5000 
}: NewsStoryCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Navigate to next slide
  const goToNext = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === articles.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // Navigate to previous slide
  const goToPrev = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? articles.length - 1 : prevIndex - 1
    );
  };
  
  // Auto-scroll functionality
  useEffect(() => {
    if (articles.length <= 1 || isPaused) return;
    
    const startTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      
      timerRef.current = setTimeout(() => {
        goToNext();
      }, autoScrollInterval);
    };
    
    startTimer();
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, isPaused, articles.length, autoScrollInterval]);
  
  // Pause auto-scroll when hovering
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  
  if (articles.length === 0) {
    return (
      <div className="text-center py-6 bg-neutral-900 rounded-lg">
        <p>No trending articles</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-nowrap overflow-hidden">
        {articles.map((article, index) => (
          <div 
            key={article.id}
            className={`transition-transform duration-300 ease-in-out w-full shrink-0`}
            style={{ 
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            <div 
              onClick={() => navigate(`/article/${article.id}`)}
              className="relative rounded-xl overflow-hidden cursor-pointer h-48 mx-1"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
              <img 
                src={article.image || 'https://placehold.co/600x400?text=No+Image'} 
                alt={article.title_en || article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded inline-block mb-1">
                  {article.category || "News"}
                </div>
                <h3 className="font-semibold text-sm text-white mb-1 line-clamp-2">
                  {article.title_en || article.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">
                    {formatPublishedDate(article.published_date)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation buttons */}
      <Button 
        variant="outline" 
        size="icon" 
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 rounded-full h-8 w-8 bg-black/50 border-none hover:bg-black/70"
        onClick={goToPrev}
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="sr-only">Previous</span>
      </Button>
      
      <Button 
        variant="outline" 
        size="icon" 
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 rounded-full h-8 w-8 bg-black/50 border-none hover:bg-black/70"
        onClick={goToNext}
      >
        <ChevronRight className="h-5 w-5" />
        <span className="sr-only">Next</span>
      </Button>
      
      {/* Indicator dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10">
        {articles.map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'bg-blue-600 w-4' : 'bg-gray-500'
            }`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsStoryCarousel;
