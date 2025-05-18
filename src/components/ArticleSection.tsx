
import { useNavigate } from 'react-router-dom';
import { NewsArticle } from '@/services/newsService';
import { formatPublishedDate } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ArticleSectionProps {
  title: string;
  articles: NewsArticle[];
  className?: string;
}

export function ArticleSection({ title, articles, className }: ArticleSectionProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className={cn("py-6", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">
          <span className="inline-block border-b-2 border-blue-600 pb-1">{title}</span>
        </h2>
        <button 
          onClick={() => navigate('/categories')}
          className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          View all <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </div>

      <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'sm:grid-cols-2 lg:grid-cols-3 gap-6'}`}>
        {articles.map((article) => (
          <div 
            key={article.id}
            onClick={() => navigate(`/article/${article.id}`)}
            className="group flex flex-col rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300 cursor-pointer h-full bg-white dark:bg-gray-900"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={article.image || 'https://placehold.co/600x400?text=No+Image'}
                alt={article.title_en || article.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            <div className="flex flex-col flex-grow p-4">
              <div className="flex items-center mb-3">
                <span className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-medium px-2 py-1 rounded">
                  {article.category || "News"}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  {formatPublishedDate(article.published_date)}
                </span>
              </div>
              
              <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {article.title_en || article.title}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
                {article.summary_txt || article.summary}
              </p>
              
              <div className="flex items-center mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex items-center justify-center text-gray-800 dark:text-gray-200">
                  {article.author_name ? article.author_name.charAt(0) : 'AI'}
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium">{article.author_name || "AI Generated"}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
