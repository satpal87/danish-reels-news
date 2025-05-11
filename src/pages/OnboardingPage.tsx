
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingSlide from '@/components/OnboardingSlide';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);
  
  const slides = [
    {
      title: "Get the Latest Danish News in English",
      description: "Stay informed about what's happening in Denmark, all in English.",
      image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Swipe Through Stories, Just Like Reels",
      description: "Easily browse through news with our intuitive, story-based interface.",
      image: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Choose Categories You Care About",
      description: "Customize your news feed with topics that matter most to you.",
      image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=2064&auto=format&fit=crop"
    },
    {
      title: "Ready to Dive In?",
      description: "Your personalized Danish news experience awaits!",
      image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  const handleNext = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      // Last slide, complete onboarding
      localStorage.setItem('onboardingCompleted', 'true');
      navigate('/');
    }
  };

  const handleSkip = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    navigate('/');
  };

  return (
    <div className="h-screen overflow-hidden">
      <div 
        className="flex h-full transition-transform duration-300" 
        style={{ transform: `translateX(-${slideIndex * 100}%)`, width: `${slides.length * 100}%` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <OnboardingSlide
              title={slide.title}
              description={slide.description}
              image={slide.image}
              isLast={index === slides.length - 1}
              onNext={handleNext}
              onSkip={handleSkip}
            />
          </div>
        ))}
      </div>
      
      {/* Dots indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === slideIndex ? 'bg-primary w-6' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default OnboardingPage;
