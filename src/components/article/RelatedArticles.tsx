
import { Link } from "react-router-dom";
import { NewsArticle } from "@/services/newsService";
import { Card, CardContent } from "@/components/ui/card";
import { formatPublishedDate } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight } from "lucide-react";

interface RelatedArticlesProps {
  articles: NewsArticle[];
}

const RelatedArticles = ({ articles }: RelatedArticlesProps) => {
  const isMobile = useIsMobile();

  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 md:py-6 mb-16">
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold">Related Articles</h2>
          <Link to="/categories" className="text-blue-600 dark:text-blue-400 flex items-center text-sm font-medium">
            More <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {articles.map((article) => (
            <Card key={article.id} className="hover:shadow-md transition-shadow bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <Link to={`/article/${article.id}`} className="flex h-full">
                <div className={`${isMobile ? 'w-1/3' : 'w-2/5'} aspect-[4/3] overflow-hidden`}>
                  <img 
                    src={article.image || 'https://placehold.co/600x400?text=No+Image'} 
                    alt={article.title_en || article.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className={`${isMobile ? 'w-2/3 p-3' : 'w-3/5 p-4'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-100 rounded-full px-2 py-0.5">
                      {article.category || "News"}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatPublishedDate(article.published_date)}
                    </span>
                  </div>
                  <h3 className="font-bold text-base mb-1 line-clamp-2">
                    {article.title_en || article.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs line-clamp-2">
                    {article.summary_txt || article.summary || "Read more about this story..."}
                  </p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedArticles;
