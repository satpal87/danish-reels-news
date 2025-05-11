
import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-4xl',
  };

  return (
    <div className={`font-bold ${sizeClasses[size]} flex items-center text-foreground`}>
      <span className="text-danish-red">danish</span>
      <span>news</span>
    </div>
  );
};

export default Logo;
