
import { useEffect, useState } from 'react';
import NewsStorySlider from '@/components/NewsStorySlider';
import { mockNews } from '@/data/mockData';
import Logo from '@/components/Logo';
import SplashScreen from '@/components/SplashScreen';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    if (!onboardingCompleted) {
      // Redirect to onboarding after splash screen
      setTimeout(() => {
        setShowSplash(false);
        navigate('/onboarding');
      }, 2500);
    } else {
      // Just show splash and then home
      setTimeout(() => {
        setShowSplash(false);
      }, 2500);
    }
  }, [navigate]);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-card border-b border-border h-16">
        <Logo size="medium" />
        <div className="flex items-center">
          <button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full px-3 py-1 text-sm font-medium">
            EN
          </button>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        <NewsStorySlider stories={mockNews} />
      </div>
      
      {/* Bottom nav is handled by App.tsx */}
    </div>
  );
};

export default HomePage;
