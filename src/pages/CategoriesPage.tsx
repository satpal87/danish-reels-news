
import { useState, useEffect } from 'react';
import CategoryGrid from '@/components/CategoryGrid';
import { mockCategories } from '@/data/mockData';
import { getNewsArticles, NewsArticle } from '@/services/mongoDbService';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';
import { ThumbsUp, ThumbsDown, Bookmark, Share, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CategoriesPage = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [interactions, setInteractions] = useState<Record<string, { liked?: boolean, disliked?: boolean, saved?: boolean }>>({});

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const fetchedArticles = await getNewsArticles();
        setArticles(fetchedArticles);
        setError(null);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles. Please try again later.");
        toast({
          title: "Error loading news",
          description: "Could not load the latest news articles.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Handle user interactions
  const handleLike = (articleId: string) => {
    setInteractions(prev => ({
      ...prev,
      [articleId]: { 
        ...prev[articleId], 
        liked: !prev[articleId]?.liked, 
        disliked: false 
      }
    }));
    
    toast({
      title: "Article liked",
      description: "Your feedback helps us curate better content for you.",
    });
  };
  
  const handleDislike = (articleId: string) => {
    setInteractions(prev => ({
      ...prev,
      [articleId]: { 
        ...prev[articleId], 
        disliked: !prev[articleId]?.disliked, 
        liked: false
      }
    }));
    
    toast({
      title: "Article disliked",
      description: "Your feedback helps us curate better content for you.",
    });
  };
  
  const handleSave = (articleId: string) => {
    setInteractions(prev => ({
      ...prev,
      [articleId]: { 
        ...prev[articleId], 
        saved: !prev[articleId]?.saved 
      }
    }));
    
    toast({
      title: "Article saved",
      description: "You can find this article in your saved stories.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0 pt-16">
      {/* Header */}
      <header className="sticky top-0 p-4 bg-card border-b border-border z-20">
        <div className="container mx-auto">
          <h1 className="text-xl md:text-2xl font-bold">Danish News</h1>
        </div>
      </header>
      
      <div className={`container mx-auto ${isMobile ? '' : 'py-6'}`}>
        {/* Categories grid */}
        <div className="p-4">
          <h2 className="text-lg md:text-xl font-medium mb-4">Categories</h2>
          <CategoryGrid categories={mockCategories} />
        </div>

        {/* Live Articles from MongoDB */}
        <div className="p-4">
          <h2 className="text-lg md:text-xl font-medium mb-4">Latest Articles</h2>
          
          {loading && (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
          
          {error && (
            <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/50">
              <CardContent className="p-4">
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </CardContent>
            </Card>
          )}
          
          {!loading && !error && articles.length === 0 && (
            <Card>
              <CardContent className="p-4">
                <p className="text-muted-foreground">No articles found.</p>
              </CardContent>
            </Card>
          )}

          {!loading && !error && articles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {articles.map((article, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        // If image fails to load, set a placeholder
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
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Read more
                      </a>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-border">
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className={interactions[index.toString()]?.liked ? "text-primary" : ""}
                          onClick={() => handleLike(index.toString())}
                        >
                          <ThumbsUp size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className={interactions[index.toString()]?.disliked ? "text-destructive" : ""}
                          onClick={() => handleDislike(index.toString())}
                        >
                          <ThumbsDown size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className={interactions[index.toString()]?.saved ? "text-primary" : ""}
                          onClick={() => handleSave(index.toString())}
                        >
                          <Bookmark size={16} />
                        </Button>
                      </div>
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
    </div>
  );
};

export default CategoriesPage;
