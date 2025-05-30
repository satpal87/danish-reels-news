
import { useEffect, useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { getNewsArticles, NewsArticle } from '@/services/newsService';
import { formatPublishedDate } from '@/lib/utils';
import { NewsHero } from '@/components/blocks/NewsHero';
import { ArticleSection } from '@/components/ArticleSection';
import NavBar from '@/components/NavBar';
import { TubelightNavbar } from '@/components/ui/tubelight-navbar';
import { Home, Bookmark, Search, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/context/AuthContext';

const HomePage = () => {
  const [trendingNews, setTrendingNews] = useState<NewsArticle[]>([]);
  const [sportsNews, setSportsNews] = useState<NewsArticle[]>([]);
  const [localNews, setLocalNews] = useState<NewsArticle[]>([]);
  const [businessNews, setBusinessNews] = useState<NewsArticle[]>([]);
  const [techNews, setTechNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const articles = await getNewsArticles();
        console.log('Fetched articles:', articles);
        
        if (articles && articles.length > 0) {
          // Set trending articles (highest rated ones)
          const sortedByRate = [...articles].sort((a, b) => 
            (b.rate || 0) - (a.rate || 0)
          );
          
          // Get top 10 trending articles
          setTrendingNews(sortedByRate.slice(0, 10));
          
          // Filter news by categories
          const sportsArticles = articles.filter(article => 
            article.category?.toLowerCase() === 'sports'
          ).slice(0, 10);
          
          const localArticles = articles.filter(article => 
            article.category?.toLowerCase() === 'local'
          ).slice(0, 10);
          
          const businessArticles = articles.filter(article => 
            article.category?.toLowerCase() === 'business'
          ).slice(0, 10);
          
          const technologyArticles = articles.filter(article => 
            article.category?.toLowerCase() === 'technology'
          ).slice(0, 10);
          
          setSportsNews(sportsArticles);
          setLocalNews(localArticles);
          setBusinessNews(businessArticles);
          setTechNews(technologyArticles);
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

    fetchArticles();
  }, []);

  // Mobile navigation items
  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Search", url: "/search", icon: Search },
    { name: "Saved", url: "/saved", icon: Bookmark },
    { name: "Account", url: user ? "/settings" : "/auth", icon: User },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <NavBar />
      {/* Content */}
      <main className="flex-1 pb-20 md:pb-12 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-16">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-danish-red"></div>
          </div>
        ) : (
          <>
            {/* Hero Section with Featured News */}
            <section className="mt-4 md:mt-6">
              <NewsHero articles={trendingNews.slice(0, 3)} />
            </section>
            
            {/* Categories Pills */}
            <div className="flex overflow-x-auto gap-2 py-4 md:py-6 hide-scrollbar">
              {['Politics', 'Business', 'Technology', 'Sports', 'Entertainment', 'Health'].map((category) => (
                <button 
                  key={category}
                  onClick={() => navigate(`/categories?filter=${category.toLowerCase()}`)}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-sm font-medium rounded-full whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Popular Posts Section */}
            <ArticleSection 
              title="Popular Posts" 
              articles={trendingNews} 
              className="mb-8 md:mb-12" 
            />
            
            {/* New Posts Section */}
            <ArticleSection 
              title="Latest News" 
              articles={[...sportsNews, ...localNews].slice(0, 6)}
              className="mb-8 md:mb-12" 
            />
            
            {/* Trending Posts Section */}
            <ArticleSection 
              title="Trending Stories" 
              articles={[...businessNews, ...techNews].slice(0, 6)}
              className="mb-8 md:mb-12" 
            />
          </>
        )}
      </main>
      
      {/* Mobile Bottom Navigation */}
      {isMobile && <TubelightNavbar items={navItems} />}
    </div>
  );
};

export default HomePage;
