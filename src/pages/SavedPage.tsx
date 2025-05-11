
import { useState } from 'react';

const SavedPage = () => {
  // In a real app, this would be populated from your data store
  const [savedStories, setSavedStories] = useState<any[]>([]);
  
  return (
    <div className="flex flex-col min-h-screen pb-16">
      {/* Header */}
      <header className="sticky top-0 p-4 bg-card border-b border-border z-20">
        <h1 className="text-xl font-bold">Saved Stories</h1>
      </header>
      
      {/* Content */}
      <div className="flex-1 p-4">
        {savedStories.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[70vh] text-center">
            <div className="text-5xl mb-4">❤️</div>
            <h2 className="text-xl font-medium mb-2">No saved stories yet</h2>
            <p className="text-muted-foreground max-w-xs">
              When you find interesting news, tap the save button to access them here later.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {savedStories.map((story) => (
              <div key={story.id} className="p-4 border border-border rounded-md">
                {/* Story content would go here */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPage;
