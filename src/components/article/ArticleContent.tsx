
import { Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPublishedDate } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface ArticleContentProps {
  article: any;
}

const ArticleContent = ({ article }: ArticleContentProps) => {
  const navigate = useNavigate();

  if (!article) {
    return (
      <div className="p-4 text-center">
        <p>Article not found</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      {/* Image */}
      <div className="rounded-lg overflow-hidden mb-6 relative aspect-video">
        <img
          src={article.image || 'https://placehold.co/600x400?text=No+Image'}
          alt={article.title_en || article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Category */}
      <div className="mb-4">
        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
          {article.category || "News"}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">
        {article.title_en || article.title}
      </h1>

      {/* Published date */}
      <div className="flex items-center text-gray-400 mb-6">
        <Clock className="h-4 w-4 mr-2" />
        <span className="text-sm">
          {formatPublishedDate(article.published_date)}
        </span>
      </div>

      {/* Content */}
      <div className="prose prose-invert max-w-none">
        {article.html ? (
          <div dangerouslySetInnerHTML={{ __html: article.html }} />
        ) : (
          <p>{article.summary_txt || article.summary}</p>
        )}
      </div>

      {/* Sources */}
      {article.sources && article.sources.length > 0 && (
        <div className="mt-8 pt-6 border-t border-neutral-800">
          <h3 className="text-lg font-medium mb-3">Sources</h3>
          <ul className="space-y-2">
            {article.sources.map((source: string, index: number) => (
              <li key={index} className="flex items-center">
                <ExternalLink className="h-4 w-4 mr-2 text-blue-500" />
                <a 
                  href={source} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {source}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ArticleContent;
