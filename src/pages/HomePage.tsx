
import { useEffect, useState } from 'react';
import Logo from '@/components/Logo';
import SplashScreen from '@/components/SplashScreen';
import { toast } from "@/components/ui/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';
import { News } from '@/components/ui/sidebar-news';
import { Feature } from '@/components/ui/feature-section-with-grid';
import { getNewsArticles } from '@/services/newsService';

const HomePage = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [newsStories, setNewsStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Just show splash for 2 seconds then home
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const articles = await getNewsArticles();
        console.log('Fetched articles:', articles);
        
        if (articles && articles.length > 0) {
          // Convert articles to the format expected by the news components
          const formattedArticles = articles.map((article) => ({
            id: article.id,
            title: article.title,
            summary: article.summary || article.summary_txt || '',
            category: article.category || 'News',
            imageUrl: article.image || 'https://placehold.co/600x400?text=No+Image',
            fullStory: article.html || article.summary,
            url: ''
          }));
          
          setNewsStories(formattedArticles);
          console.log('Formatted articles:', formattedArticles);
        } else {
          console.log('No articles returned or empty array');
          toast({
            title: "No news articles",
            description: "There are currently no news articles to display.",
          });
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

    if (!showSplash) {
      fetchArticles();
    }
  }, [showSplash]);

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
            onClick={() => window.location.href = '/admin'}
          >
            Admin
          </button>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto mt-16 pb-16">
        {newsStories.length === 0 ? (
          <div className="flex justify-center items-center h-[calc(100vh-16rem)]">
            <p className="text-muted-foreground">No news articles available</p>
          </div>
        ) : isMobile ? (
          <div className="w-full max-w-sm mx-auto">
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
