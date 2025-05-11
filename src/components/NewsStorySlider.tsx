
import { useState, useRef, useEffect } from 'react';
import NewsCard, { NewsItemProps } from './NewsCard';

interface NewsStorySliderProps {
  stories: NewsItemProps[];
}

const NewsStorySlider = ({ stories }: NewsStorySliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number | null>(null);

  const goToNextStory = () => {
    setActiveIndex(prevIndex => 
      prevIndex === stories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevStory = () => {
    setActiveIndex(prevIndex => 
      prevIndex === 0 ? stories.length - 1 : prevIndex - 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startXRef.current = e.clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startXRef.current === null) return;
    
    const endX = e.changedTouches[0].clientX;
    const diff = startXRef.current - endX;
    
    // Check if the swipe was long enough to be intentional
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNextStory();
      } else {
        goToPrevStory();
      }
    }
    
    startXRef.current = null;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (startXRef.current === null) return;
    
    const diff = startXRef.current - e.clientX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNextStory();
      } else {
        goToPrevStory();
      }
    }
    
    startXRef.current = null;
  };

  // Prevent default on mouse move to avoid text selection during swipe
  const handleMouseMove = (e: React.MouseEvent) => {
    if (startXRef.current !== null) {
      e.preventDefault();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full news-card-container overflow-hidden touch-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {stories.map((story, index) => (
        <NewsCard
          key={story.id}
          news={story}
          isActive={index === activeIndex}
          onComplete={goToNextStory}
        />
      ))}
      
      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 z-20">
        {stories.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'bg-primary w-4' : 'bg-gray-400 dark:bg-gray-600'
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsStorySlider;
