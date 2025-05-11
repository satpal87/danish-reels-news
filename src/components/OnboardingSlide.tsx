
import React from 'react';
import { Button } from '@/components/ui/button';

interface OnboardingSlideProps {
  title: string;
  description: string;
  image?: string;
  isLast?: boolean;
  onNext: () => void;
  onSkip: () => void;
}

const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
  title,
  description,
  image,
  isLast = false,
  onNext,
  onSkip,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 h-full">
      {image && (
        <div className="mb-8 w-full max-w-xs">
          <img src={image} alt={title} className="w-full h-48 object-contain" />
        </div>
      )}
      
      <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
      <p className="text-center text-muted-foreground mb-12">{description}</p>
      
      <div className="flex flex-col space-y-3 w-full max-w-xs">
        <Button onClick={onNext}>
          {isLast ? "Let's Go!" : "Next"}
        </Button>
        
        {!isLast && (
          <Button variant="ghost" onClick={onSkip}>
            Skip
          </Button>
        )}
      </div>
    </div>
  );
};

export default OnboardingSlide;
