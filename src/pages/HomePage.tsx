
import { useEffect, useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { Bell, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getNewsArticles, NewsArticle } from '@/services/newsService';
import SearchBar from '@/components/SearchBar';
import { formatPublishedDate } from '@/lib/utils';
import { TrendingNewsGallery } from '@/components/blocks/TrendingNewsGallery';
import { CategoryNewsGallery } from '@/components/blocks/CategoryNewsGallery';

const HomePage = () => {
  const [trendingNews, setTrendingNews] = useState<NewsArticle[]>([]);
  const [sportsNews, setSportsNews] = useState<NewsArticle[]>([]);
  const [localNews, setLocalNews] = useState<NewsArticle[]>([]);
  const [businessNews, setBusinessNews] = useState<NewsArticle[]>([]);
  const [techNews, setTechNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
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

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* App Bar */}
      <header className="sticky top-0 p-4 bg-black border-b border-neutral-800 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-2xl font-bold">
              <span className="text-red-600">danish</span>
              <span className="text-gray-300">news</span>
            </div>
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-neutral-800 rounded-lg">
            <Bell size={20} />
          </div>
        </div>
      </header>
      
      {/* Search Bar */}
      <div className="px-4 py-3">
        <SearchBar
          onSearch={(query) => navigate(`/search?q=${query}`)}
        />
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-auto pb-20">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Trending - Gallery4 carousel */}
            <div>
              <TrendingNewsGallery 
                trendingNews={trendingNews}
                autoScrollInterval={5000} // 5 seconds
              />
            </div>
            
            {/* Sports News Section */}
            {sportsNews.length > 0 && (
              <div className="mb-4">
                <CategoryNewsGallery 
                  title="Sports" 
                  articles={sportsNews} 
                  description="Latest sports stories and updates"
                  autoScrollInterval={7000} // 7 seconds
                />
              </div>
            )}
            
            {/* Local News Section */}
            {localNews.length > 0 && (
              <div className="mb-4">
                <CategoryNewsGallery 
                  title="Local" 
                  articles={localNews} 
                  description="What's happening in your area"
                  autoScrollInterval={10000} // 10 seconds
                />
              </div>
            )}
            
            {/* Business News Section */}
            {businessNews.length > 0 && (
              <div className="mb-4">
                <CategoryNewsGallery 
                  title="Business" 
                  articles={businessNews} 
                  description="Latest business and financial updates"
                  autoScrollInterval={8000} // 8 seconds
                />
              </div>
            )}
            
            {/* Technology News Section */}
            {techNews.length > 0 && (
              <div className="mb-4">
                <CategoryNewsGallery 
                  title="Technology" 
                  articles={techNews} 
                  description="Updates from the world of technology"
                  autoScrollInterval={6000} // 6 seconds
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
