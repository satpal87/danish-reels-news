
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { getNewsArticles, NewsArticle } from '@/services/mongoDbService';
import { ArrowRight, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "@/components/ui/use-toast";

const SavedPage = () => {
  // In a real app, this would be populated from your data store
  const [allArticles, setAllArticles] = useState<NewsArticle[]>([]);
  const [savedArticles, setSavedArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const articles = await getNewsArticles();
        setAllArticles(articles);
        
        // For demo purposes, randomly select some articles as "saved"
        const randomSavedArticles = articles
          .filter((_, index) => Math.random() > 0.7) // Randomly select ~30% of articles
          .slice(0, 3); // Keep at most 3 articles
          
        setSavedArticles(randomSavedArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
        toast({
          title: "Error loading saved articles",
          description: "Could not load your saved articles.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, []);
  
  const removeFromSaved = (articleToRemove: NewsArticle) => {
    setSavedArticles(current => 
      current.filter(article => article.title !== articleToRemove.title)
    );
    
    toast({
      title: "Article removed",
      description: "Article removed from your saved stories",
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0 pt-16">
      {/* Header */}
      <header className="sticky top-0 p-4 bg-card border-b border-border z-20">
        <div className="container mx-auto">
          <h1 className="text-xl md:text-2xl font-bold">Saved Stories</h1>
        </div>
      </header>
      
      {/* Content */}
      <div className="container mx-auto p-4 md:p-6">
        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : savedArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[70vh] text-center">
            <div className="text-5xl mb-4">❤️</div>
            <h2 className="text-xl font-medium mb-2">No saved stories yet</h2>
            <p className="text-muted-foreground max-w-xs">
              When you find interesting news, tap the save button to access them here later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedArticles.map((article, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image';
                    }}
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">{article.summary}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-muted-foreground">
                      {new Date(article.scraped_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-border">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeFromSaved(article)}
                      className="text-destructive"
                    >
                      <Bookmark className="mr-1 h-4 w-4 fill-current" /> Remove
                    </Button>
                    
                    <Button 
                      onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')}
                      variant="outline"
                      size="sm"
                    >
                      Read More <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPage;
