
import { useEffect, useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { Bell, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getNewsArticles, NewsArticle } from '@/services/newsService';
import SearchBar from '@/components/SearchBar';
import { formatPublishedDate } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TrendingNewsGallery } from '@/components/blocks/TrendingNewsGallery';

const HomePage = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [trendingNews, setTrendingNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
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
          setNews(articles);
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

  // Filter news by category
  const filteredNews = activeCategory === "All" 
    ? news 
    : news.filter(article => article.category === activeCategory);

  // Get unique categories
  const categories = ["All", ...new Set(news.map(article => article.category).filter(Boolean) as string[])];

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
            <div className="mb-6">
              <TrendingNewsGallery trendingNews={trendingNews} />
            </div>
            
            {/* Latest */}
            <div className="px-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Latest</h2>
                <button 
                  className="flex items-center text-sm text-blue-500"
                  onClick={() => navigate('/categories')}
                >
                  See all
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              
              {/* Categories Tabs - Horizontally scrollable */}
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex space-x-4 pb-2">
                  {categories.map(category => (
                    <button 
                      key={category}
                      className={`text-sm px-3 py-1.5 ${
                        activeCategory === category 
                          ? 'border-b-2 border-blue-600 text-blue-600' 
                          : 'text-gray-400 hover:text-gray-300'
                      }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="space-y-6 mt-4">
                {filteredNews.length > 0 ? (
                  filteredNews.map(article => (
                    <div 
                      key={article.id} 
                      className="flex gap-3 pb-4 border-b border-neutral-800 cursor-pointer"
                      onClick={() => navigate(`/article/${article.id}`)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <div className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                            {article.category || "News"}
                          </div>
                        </div>
                        <h3 className="font-medium line-clamp-2 mb-1">
                          {article.title_en || article.title}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2 mb-1">
                          {article.summary_txt || article.summary}
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-400">
                            {formatPublishedDate(article.published_date)}
                          </span>
                        </div>
                      </div>
                      <div className="w-24 h-24">
                        <img 
                          src={article.image || 'https://placehold.co/600x400?text=No+Image'} 
                          alt={article.title_en || article.title} 
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 bg-neutral-900 rounded-lg">
                    <p>No articles available</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
