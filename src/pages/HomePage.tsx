
import { useEffect, useState } from 'react';
import Logo from '@/components/Logo';
import SplashScreen from '@/components/SplashScreen';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';
import { News } from '@/components/ui/sidebar-news';
import { Feature } from '@/components/ui/feature-section-with-grid';
import { getNewsArticles } from '@/services/newsService';
import NewsStorySlider from '@/components/NewsStorySlider';

const HomePage = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [newsStories, setNewsStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
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
        console.log('Fetched articles:', articles);
        
        if (articles && articles.length > 0) {
          // Convert articles to the format expected by NewsStorySlider
          const formattedArticles = articles.map((article) => ({
            id: article.id,
            title: article.title,
            summary: article.summary || article.summary_txt || '',
            category: article.category || 'Top News',
            imageUrl: article.image || 'https://placehold.co/600x400?text=No+Image',
            fullStory: article.html || article.summary,
            url: ''
          }));
          
          setNewsStories(formattedArticles);
          console.log('Formatted articles:', formattedArticles);
        } else {
          console.log('No articles returned or empty array');
        }
      } catch (error) {
        console.error('Error fetching news articles:', error);
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
        <div className="flex items-center gap-2">
          <button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full px-3 py-1 text-sm font-medium">
            EN
          </button>
          <button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-3 py-1 text-sm font-medium"
            onClick={() => navigate('/admin')}
          >
            Admin
          </button>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex-1 overflow-hidden mt-16">
        {isMobile ? (
          <div className="h-[calc(100vh-16rem)] w-full max-w-sm mx-auto relative z-0">
            {newsStories.length > 0 ? (
              <News articles={sidebarNewsArticles} />
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-muted-foreground">No news articles available</p>
              </div>
            )}
          </div>
        ) : (
          newsStories.length > 0 ? (
            <Feature news={newsStories} />
          ) : (
            <div className="flex justify-center items-center h-[calc(100vh-16rem)]">
              <p className="text-muted-foreground">No news articles available</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default HomePage;
