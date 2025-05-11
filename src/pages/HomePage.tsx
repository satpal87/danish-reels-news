import { useEffect, useState } from 'react';
import NewsStorySlider from '@/components/NewsStorySlider';
import { mockNews } from '@/data/mockData';
import Logo from '@/components/Logo';
import SplashScreen from '@/components/SplashScreen';
import { useNavigate } from 'react-router-dom';
import { getNewsArticles } from '@/services/mongoDbService';
import { toast } from "@/components/ui/use-toast";

const HomePage = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [newsStories, setNewsStories] = useState(mockNews);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
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

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-card border-b border-border h-16">
        <Logo size="medium" />
        <div className="flex items-center">
          <button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full px-3 py-1 text-sm font-medium">
            EN
          </button>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        ) : (
          <NewsStorySlider stories={newsStories} />
        )}
      </div>
      
      {/* Bottom nav is handled by App.tsx */}
    </div>
  );
};

export default HomePage;
