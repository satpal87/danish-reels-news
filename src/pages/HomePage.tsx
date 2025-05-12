
import { useEffect, useState } from 'react';
import NewsStorySlider from '@/components/NewsStorySlider';
import { mockNews } from '@/data/mockData';
import Logo from '@/components/Logo';
import SplashScreen from '@/components/SplashScreen';
import { useNavigate } from 'react-router-dom';
import { getNewsArticles } from '@/services/mongoDbService';
import { toast } from "@/components/ui/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ThumbsUp, ThumbsDown, Bookmark, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [newsStories, setNewsStories] = useState(mockNews);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  // Add state for liked/disliked articles
  const [interactions, setInteractions] = useState<Record<string, { liked?: boolean, disliked?: boolean, saved?: boolean }>>({});
  
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

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const articles = await getNewsArticles();
        
        if (articles && articles.length > 0) {
          // Convert articles to the format expected by NewsStorySlider
          const formattedArticles = articles.map((article, index) => ({
            id: index.toString(),
            title: article.title,
            summary: article.summary,
            category: 'Top News', // Default category
            imageUrl: article.image,
            fullStory: article.summary,
            url: article.url
          }));
          
          setNewsStories(formattedArticles);
        }
      } catch (error) {
        console.error('Error fetching news articles:', error);
        toast({
          title: "Error loading news",
          description: "Could not load the latest news articles.",
          variant: "destructive"
        });
        // Keep using mock data if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Handle user interactions
  const handleLike = (storyId: string) => {
    setInteractions(prev => ({
      ...prev,
      [storyId]: { 
        ...prev[storyId], 
        liked: !prev[storyId]?.liked, 
        disliked: false 
      }
    }));
    
    toast({
      title: "Article liked",
      description: "Your feedback helps us curate better content for you.",
    });
  };
  
  const handleDislike = (storyId: string) => {
    setInteractions(prev => ({
      ...prev,
      [storyId]: { 
        ...prev[storyId], 
        disliked: !prev[storyId]?.disliked, 
        liked: false
      }
    }));
    
    toast({
      title: "Article disliked",
      description: "Your feedback helps us curate better content for you.",
    });
  };
  
  const handleSave = (storyId: string) => {
    setInteractions(prev => ({
      ...prev,
      [storyId]: { 
        ...prev[storyId], 
        saved: !prev[storyId]?.saved 
      }
    }));
    
    toast({
      title: "Article saved",
      description: "You can find this article in your saved stories.",
    });
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-card border-b border-border h-16 fixed top-0 w-full z-10">
        <Logo size="medium" />
        <div className="flex items-center">
          <button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full px-3 py-1 text-sm font-medium">
            EN
          </button>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex-1 overflow-hidden mt-16">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {isMobile ? (
              <NewsStorySlider stories={newsStories} />
            ) : (
              <div className="container mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold mb-6">Danish News</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {newsStories.map((story) => (
                    <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video relative">
                        <img 
                          src={story.imageUrl} 
                          alt={story.title} 
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image';
                          }}
                        />
                        <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                          {story.category}
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <h2 className="text-xl font-bold mb-2 line-clamp-2">{story.title}</h2>
                        <p className="text-muted-foreground mb-4 line-clamp-3">{story.summary}</p>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className={interactions[story.id]?.liked ? "text-primary" : ""}
                              onClick={() => handleLike(story.id)}
                            >
                              <ThumbsUp size={18} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className={interactions[story.id]?.disliked ? "text-destructive" : ""}
                              onClick={() => handleDislike(story.id)}
                            >
                              <ThumbsDown size={18} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className={interactions[story.id]?.saved ? "text-primary" : ""}
                              onClick={() => handleSave(story.id)}
                            >
                              <Bookmark size={18} />
                            </Button>
                          </div>
                          <Button 
                            onClick={() => window.open(story.url, '_blank', 'noopener,noreferrer')}
                            variant="outline"
                            size="sm"
                          >
                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
