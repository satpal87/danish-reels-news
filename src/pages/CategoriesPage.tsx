
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getNewsArticles, NewsArticle } from '@/services/newsService';
import { toast } from '@/components/ui/use-toast';
import { formatPublishedDate } from '@/lib/utils';
import { NewsHeader } from '@/components/NewsHeader';

const CategoriesPage = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('filter');
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const articles = await getNewsArticles();
        
        if (articles && articles.length > 0) {
          setNews(articles);
          
          // Extract unique categories
          const uniqueCategories = [...new Set(articles.map(article => article.category).filter(Boolean))] as string[];
          setCategories(uniqueCategories);
          
          // Set first category as active by default if none provided
          if (uniqueCategories.length > 0 && !activeCategory) {
            setSearchParams({ filter: uniqueCategories[0] });
          }
        } else {
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
  
  // Filter news by selected category
  const filteredNews = news.filter(article => 
    activeCategory ? article.category === activeCategory : true
  );
  
  // Select a category
  const selectCategory = (category: string) => {
    setSearchParams({ filter: category });
  };
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <NewsHeader />
      
      {/* Category Header */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl md:text-3xl font-bold">{activeCategory || 'All Categories'}</h1>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <ArrowLeft size={18} className="mr-2" /> Back
          </Button>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Browse the latest {activeCategory?.toLowerCase() || 'news'} articles from our AI-powered news service.
        </p>
      </div>
      
      {/* Category Pills */}
      <div className="sticky top-16 z-10 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 pb-4 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-x-auto hide-scrollbar">
            <div className="flex space-x-2 py-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    activeCategory === category 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => selectCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map(article => (
              <div 
                key={article.id}
                onClick={() => navigate(`/article/${article.id}`)}
                className="group flex flex-col rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300 cursor-pointer bg-white dark:bg-gray-900"
              >
                <div className="aspect-video relative">
                  <img
                    src={article.image || 'https://placehold.co/600x400?text=No+Image'}
                    alt={article.title_en || article.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      {article.category || "News"}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {article.title_en || article.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                    {article.summary_txt || article.summary}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex items-center justify-center text-gray-800 dark:text-gray-200 text-xs">
                        {article.author_name?.charAt(0) || 'A'}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        {formatPublishedDate(article.published_date)}
                      </span>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-0 h-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/article/${article.id}`);
                      }}
                    >
                      Read
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-4 text-gray-400">
              <Filter size={40} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              We couldn't find any articles in this category. Please try another category or check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
