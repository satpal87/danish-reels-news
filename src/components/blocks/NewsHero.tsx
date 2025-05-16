
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NewsArticle } from '@/services/newsService';
import { formatPublishedDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NewsHeroProps {
  articles: NewsArticle[];
}

export function NewsHero({ articles }: NewsHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();
  
  // Auto-scroll every 6 seconds
  useEffect(() => {
    if (!articles.length || isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === articles.length - 1 ? 0 : prev + 1));
    }, 6000);
    
    return () => clearInterval(interval);
  }, [articles.length, isPaused]);

  // No articles to display
  if (!articles.length) {
    return null;
  }
  
  const article = articles[currentIndex];

  return (
    <div 
      className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Hero Article */}
      <div 
        className="h-full w-full cursor-pointer"
        onClick={() => navigate(`/article/${article.id}`)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
        <img 
          src={article.image || 'https://placehold.co/1200x600?text=No+Image'} 
          alt={article.title_en || article.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
        />
        
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-8">
          <div className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded mb-3">
            {article.category || "News"}
          </div>
          
          <h2 className="text-xl md:text-3xl font-bold text-white mb-2 line-clamp-2">
            {article.title_en || article.title}
          </h2>
          
          <p className="text-sm md:text-base text-gray-200 mb-4 line-clamp-2 md:line-clamp-3 max-w-3xl">
            {article.summary_txt || article.summary}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center text-gray-800 font-semibold">
                {article.author_name ? article.author_name.charAt(0) : 'AI'}
              </div>
              <div>
                <p className="text-sm text-white font-medium">{article.author_name || "AI Generated"}</p>
                <p className="text-xs text-gray-300">{formatPublishedDate(article.published_date)}</p>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="text-white border-white hover:bg-white/20 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/article/${article.id}`);
              }}
            >
              Read More
            </Button>
          </div>
        </div>
      </div>
      
      {/* Navigation Controls */}
      <div className="absolute bottom-4 right-4 flex space-x-2 z-30">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex(prev => prev === 0 ? articles.length - 1 : prev - 1);
          }}
          className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex(prev => prev === articles.length - 1 ? 0 : prev + 1);
          }}
          className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </button>
      </div>
      
      {/* Progress Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
        {articles.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentIndex ? 'bg-white w-6' : 'bg-white/50'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(i);
            }}
          />
        ))}
      </div>
    </div>
  );
}
