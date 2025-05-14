
import { useEffect, useState } from 'react';
import Logo from '@/components/Logo';
import { toast } from "@/components/ui/use-toast";
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getNewsArticles, NewsArticle } from '@/services/newsService';
import SearchBar from '@/components/SearchBar';
import { formatPublishedDate } from '@/lib/utils';

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
          
          setTrendingNews(sortedByRate.slice(0, 1));
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
            <Logo size="medium" />
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
            {/* Trending */}
            <div className="px-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Trending</h2>
                <button 
                  className="text-sm text-blue-500"
                  onClick={() => navigate('/categories')}
                >
                  See all
                </button>
              </div>
              
              <div className="space-y-4">
                {trendingNews.length > 0 ? (
                  trendingNews.map(article => (
                    <div 
                      key={article.id}
                      onClick={() => navigate(`/article/${article.id}`)}
                      className="relative rounded-xl overflow-hidden cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
                      <img 
                        src={article.image || 'https://placehold.co/600x400?text=No+Image'} 
                        alt={article.title_en || article.title}
                        className="w-full aspect-[16/9] object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded inline-block mb-2">
                          {article.category || "News"}
                        </div>
                        <h3 className="font-bold text-lg text-white mb-2">
                          {article.title_en || article.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-400">
                            {formatPublishedDate(article.published_date)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 bg-neutral-900 rounded-lg">
                    <p>No trending articles</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Latest */}
            <div className="px-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Latest</h2>
                <button 
                  className="text-sm text-blue-500"
                  onClick={() => navigate('/categories')}
                >
                  See all
                </button>
              </div>
              
              {/* Categories Tabs */}
              <div className="mb-4 overflow-x-auto hide-scrollbar">
                <div className="flex space-x-4 pb-2">
                  {categories.map(category => (
                    <button 
                      key={category}
                      className={`text-sm px-2 py-1 ${
                        activeCategory === category 
                          ? 'border-b-2 border-blue-600 text-blue-600' 
                          : ''
                      }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
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
