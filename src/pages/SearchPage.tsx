
import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import { mockSearchSuggestions } from '@/data/mockData';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    // Add to recent searches (avoid duplicates)
    if (!recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev].slice(0, 5));
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen pb-16">
      {/* Header with search bar */}
      <header className="sticky top-0 p-4 bg-card border-b border-border z-20">
        <SearchBar onSearch={handleSearch} />
      </header>
      
      {/* Search content */}
      <div className="flex-1 p-4">
        {searchQuery ? (
          <div className="animate-fade-in">
            <p className="text-muted-foreground mb-4">Results for "{searchQuery}"</p>
            {/* In a real app, this would show actual search results */}
            <div className="text-center p-8">
              <p className="text-muted-foreground">Searching for content...</p>
              <p className="text-sm mt-2">(This is a demo with mock data)</p>
            </div>
          </div>
        ) : (
          <>
            {/* Recent searches */}
            {recentSearches.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-medium mb-3">Recent Searches</h2>
                <ul className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <li key={index}>
                      <button 
                        className="text-primary flex items-center"
                        onClick={() => handleSearch(search)}
                      >
                        <span>{search}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Trending topics */}
            <div>
              <h2 className="text-lg font-medium mb-3">Trending Topics</h2>
              <div className="flex flex-wrap gap-2">
                {mockSearchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3 py-1 rounded-full text-sm"
                    onClick={() => handleSearch(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
