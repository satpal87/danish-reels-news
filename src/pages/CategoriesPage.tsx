
import { useState } from 'react';
import CategoryGrid from '@/components/CategoryGrid';
import { mockCategories } from '@/data/mockData';

const CategoriesPage = () => {
  return (
    <div className="flex flex-col min-h-screen pb-16">
      {/* Header */}
      <header className="sticky top-0 p-4 bg-card border-b border-border z-20">
        <h1 className="text-xl font-bold">Categories</h1>
      </header>
      
      {/* Categories grid */}
      <div className="flex-1 overflow-auto">
        <CategoryGrid categories={mockCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
