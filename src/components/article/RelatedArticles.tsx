
import { Link } from "react-router-dom";
import { NewsArticle } from "@/services/newsService";
import { Card, CardContent } from "@/components/ui/card";
import { formatPublishedDate } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface RelatedArticlesProps {
  articles: NewsArticle[];
}

const RelatedArticles = ({ articles }: RelatedArticlesProps) => {
  const isMobile = useIsMobile();

  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 mb-12">
      <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mb-6">
        <h2 className="text-2xl font-bold mb-6">More Articles You Might Like</h2>
        
        <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-2 gap-6'}`}>
          {articles.map((article) => (
            <Card key={article.id} className="hover:shadow-md transition-shadow">
              <Link to={`/article/${article.id}`} className="block h-full">
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={article.image || 'https://placehold.co/600x400?text=No+Image'} 
                    alt={article.title_en || article.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 rounded px-2 py-1">
                      {article.category || "News"}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatPublishedDate(article.published_date)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {article.title_en || article.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
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
