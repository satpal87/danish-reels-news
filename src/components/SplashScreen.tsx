
import { useEffect, useState } from 'react';
import Logo from './Logo';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // After 2 seconds, start fade out animation
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    // After fade out completes (2.5s total), call onComplete
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="animate-slide-up">
        <Logo size="large" />
      </div>
      <p className="mt-4 text-muted-foreground animate-slide-up" style={{ animationDelay: '0.2s' }}>
        Your Window into Denmark – In English
      </p>
    </div>
  );
};

export default SplashScreen;
