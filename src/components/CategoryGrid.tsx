
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface CategoryGridProps {
  categories: Category[];
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  return (
    <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3 md:grid-cols-4 lg:grid-cols-6'} gap-4 p-4`}>
      {categories.map((category) => (
        <button
          key={category.id}
          className="flex flex-col items-center justify-center p-4 rounded-lg bg-card hover:bg-card/80 border border-border transition-all hover:scale-[1.02]"
          onClick={() => navigate(`/category/${category.id}`)}
        >
          <div 
            className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${category.color}`}
          >
            <span className="text-2xl" aria-hidden="true">{category.icon}</span>
          </div>
          <span className="font-medium text-sm text-card-foreground">{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryGrid;
