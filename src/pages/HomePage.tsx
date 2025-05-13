
import { useEffect, useState } from 'react';
import { mockNews } from '@/data/mockData';
import Logo from '@/components/Logo';
import SplashScreen from '@/components/SplashScreen';
import { useNavigate } from 'react-router-dom';
import { getNewsArticles } from '@/services/mongoDbService';
import { toast } from "@/components/ui/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';
import { News } from '@/components/ui/sidebar-news';
import { Feature } from '@/components/ui/feature-section-with-grid';

const HomePage = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [newsStories, setNewsStories] = useState(mockNews);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile(); // Fix: useIsMobile() now returns a boolean directly
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

  // Convert our news data format to the format expected by the News component
  const sidebarNewsArticles = newsStories.map(story => ({
    href: story.url || "#",
    title: story.title,
    summary: story.summary,
    image: story.imageUrl
  }));

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
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
        {isMobile ? (
          <div className="h-[calc(100vh-16rem)] w-full max-w-sm mx-auto relative z-0">
            <News articles={sidebarNewsArticles} />
          </div>
        ) : (
          <Feature news={newsStories} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
