
import React from "react";
import { Timeline, TimelineEntry } from "@/components/ui/timeline";
import { useNavigate } from "react-router-dom";
import { getNewsArticles } from "@/services/newsService";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

const TimelinePage = () => {
  const [timelineData, setTimelineData] = useState<TimelineEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const articles = await getNewsArticles();
        
        // Group articles by category
        const categoryGroups: Record<string, any[]> = {};
        articles.forEach(article => {
          const category = article.category || 'Uncategorized';
          if (!categoryGroups[category]) {
            categoryGroups[category] = [];
          }
          categoryGroups[category].push(article);
        });

        // Convert to timeline entries
        const timelineEntries = Object.entries(categoryGroups).map(([category, articles]) => ({
          title: category,
          content: (
            <div>
              <p className="text-neutral-300 text-xs md:text-sm font-normal mb-4">
                Latest {category} news and updates
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {articles.slice(0, 4).map((article, idx) => (
                  <div 
                    key={idx} 
                    className="bg-neutral-900 p-4 rounded-lg cursor-pointer"
                    onClick={() => navigate(`/article/${article.id}`)}
                  >
                    <div className="mb-2 flex items-center">
                      <div className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                        {article.category || "News"}
                      </div>
                    </div>
                    <h4 className="text-white font-medium mb-2 line-clamp-2">{article.title_en || article.title}</h4>
                    <p className="text-neutral-400 text-xs line-clamp-3">{article.summary_txt || article.summary}</p>
                    <div className="mt-2">
                      <img 
                        src={article.image || 'https://placehold.co/600x400?text=No+Image'} 
                        alt={article.title} 
                        className="rounded-lg object-cover h-20 md:h-44 w-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        }));

        setTimelineData(timelineEntries);
      } catch (error) {
        console.error('Error fetching news for timeline:', error);
        toast({
          title: "Error",
          description: "Could not load the timeline data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black pt-16 pb-20">
      {timelineData.length > 0 ? (
        <Timeline data={timelineData} />
      ) : (
        <div className="flex justify-center items-center h-[50vh]">
          <p className="text-white">No timeline data available</p>
        </div>
      )}
    </div>
  );
};

export default TimelinePage;
