
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getNewsArticles, NewsArticle } from '@/services/newsService';
import { toast } from '@/components/ui/use-toast';
import { formatPublishedDate } from '@/lib/utils';

const CategoriesPage = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
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
          
          // Set first category as active by default
          if (uniqueCategories.length > 0 && !activeCategory) {
            setActiveCategory(uniqueCategories[0]);
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
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* App Bar */}
      <header className="sticky top-0 p-4 bg-black border-b border-neutral-800 z-50">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-medium">Categories</h1>
        </div>
      </header>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="p-4">
          {/* Category Tabs */}
          <div className="mb-6 overflow-x-auto hide-scrollbar">
            <div className="flex space-x-4 pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full ${
                    activeCategory === category 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-neutral-800 text-gray-300'
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Articles Grid */}
          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredNews.map(article => (
                <div 
                  key={article.id}
                  onClick={() => navigate(`/article/${article.id}`)}
                  className="bg-neutral-900 rounded-lg overflow-hidden cursor-pointer"
                >
                  <div className="aspect-video relative">
                    <img
                      src={article.image || 'https://placehold.co/600x400?text=No+Image'}
                      alt={article.title_en || article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        {article.category || "News"}
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium line-clamp-2 mb-1">
                      {article.title_en || article.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                      {article.summary_txt || article.summary}
                    </p>
                    <div className="text-xs text-gray-500">
                      {formatPublishedDate(article.published_date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p>No articles found for this category</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
