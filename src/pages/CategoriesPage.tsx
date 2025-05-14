
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { getNewsArticles, NewsArticle } from '@/services/newsService';
import { toast } from "@/components/ui/use-toast";

const categories = [
  "All", "Sports", "Politics", "Business", "Health", "Travel", "Science", "Technology", "Entertainment"
];

const CategoriesPage = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const fetchedArticles = await getNewsArticles();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
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

  const filteredArticles = selectedCategory === "All" 
    ? articles 
    : articles.filter(article => 
        article.category && article.category.toLowerCase() === selectedCategory.toLowerCase()
      );

  const formatPublishedDate = (date: string | null) => {
    if (!date) return "4h ago";
    
    const publishedDate = new Date(date);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* App Bar */}
      <header className="sticky top-0 p-4 bg-black border-b border-neutral-800 z-50">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="mr-3 h-10 w-10 flex items-center justify-center"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Categories</h1>
        </div>
      </header>

      {/* Categories Tabs */}
      <div className="sticky top-16 bg-black px-4 py-2 z-40 overflow-x-auto hide-scrollbar">
        <div className="flex space-x-4 pb-2">
          {categories.map(category => (
            <button 
              key={category}
              className={`text-sm px-3 py-1.5 rounded-full whitespace-nowrap ${
                selectedCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-neutral-800 text-gray-300'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* News Content */}
      <div className="flex-1 p-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="space-y-6">
            {filteredArticles.map(article => (
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
                  <h3 className="font-medium line-clamp-2 mb-1">{article.title}</h3>
                  <div className="flex items-center space-x-2">
                    <div className="h-5 w-5 rounded bg-red-600 flex items-center justify-center text-white text-xs">
                      B
                    </div>
                    <span className="text-xs font-medium">BBC News</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-400">
                      {formatPublishedDate(article.published_date)}
                    </span>
                  </div>
                </div>
                <div className="w-24 h-24">
                  <img 
                    src={article.image || 'https://placehold.co/600x400?text=No+Image'} 
                    alt={article.title} 
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-lg mb-2">No articles found</p>
            <p className="text-sm text-gray-400">
              {selectedCategory !== "All"
                ? `No articles in the ${selectedCategory} category`
                : "There are no news articles available"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
