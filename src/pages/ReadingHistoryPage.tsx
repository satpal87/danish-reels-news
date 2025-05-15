
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ArrowLeft, Calendar } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getUserReadingHistory } from '@/services/articleViewService';
import { format } from 'date-fns';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ReadingHistoryItem {
  id: string;
  viewed_at: string;
  news_articles: {
    id: string;
    title: string;
    title_en: string | null;
    image: string | null;
    category: string | null;
    published_date: string | null;
  };
}

const ReadingHistoryPage = () => {
  const [history, setHistory] = useState<ReadingHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        setLoading(true);
        const data = await getUserReadingHistory(user.id);
        setHistory(data);
      } catch (error) {
        console.error('Error fetching reading history:', error);
        toast({
          title: 'Error',
          description: 'Could not load your reading history',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user, navigate]);

  // Group history by day
  const groupedHistory: Record<string, ReadingHistoryItem[]> = {};

  history.forEach(item => {
    const date = new Date(item.viewed_at);
    const dateKey = format(date, 'yyyy-MM-dd');
    
    if (!groupedHistory[dateKey]) {
      groupedHistory[dateKey] = [];
    }
    
    groupedHistory[dateKey].push(item);
  });

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 p-4 bg-black border-b border-neutral-800 z-50">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft />
          </Button>
          <div className="font-medium">Reading History</div>
          <div className="w-8"></div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Clock className="h-12 w-12 text-neutral-500 mb-4" />
            <h3 className="text-xl font-medium mb-2">No reading history</h3>
            <p className="text-neutral-400 mb-6">You haven't read any articles yet.</p>
            <Button onClick={() => navigate('/')} variant="outline">
              Browse Articles
            </Button>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-100px)]">
            <div className="space-y-8">
              {Object.entries(groupedHistory).map(([dateKey, items]) => (
                <div key={dateKey} className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <h3 className="text-lg font-semibold">
                      {format(new Date(dateKey), 'MMMM d, yyyy')}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {items.map(item => (
                      <div 
                        key={item.id} 
                        className="border border-neutral-800 rounded-lg overflow-hidden cursor-pointer hover:bg-neutral-900 transition"
                        onClick={() => navigate(`/article/${item.news_articles.id}`)}
                      >
                        <div className="flex">
                          {item.news_articles.image && (
                            <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                              <img 
                                src={item.news_articles.image} 
                                alt={item.news_articles.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="p-4 flex-grow">
                            <div className="flex items-center mb-2">
                              {item.news_articles.category && (
                                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded mr-2">
                                  {item.news_articles.category}
                                </span>
                              )}
                              <span className="text-xs text-neutral-400">
                                {format(new Date(item.viewed_at), 'h:mm a')}
                              </span>
                            </div>
                            <h4 className="font-medium">
                              {item.news_articles.title_en || item.news_articles.title}
                            </h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default ReadingHistoryPage;
