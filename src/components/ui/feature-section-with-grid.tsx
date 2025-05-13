
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, Bookmark, ArrowRight } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  imageUrl: string;
  url?: string;
}

interface FeatureProps {
  news: NewsItem[];
}

function Feature({ news }: FeatureProps) {
  const [interactions, setInteractions] = useState<Record<string, { liked?: boolean, disliked?: boolean, saved?: boolean }>>({});

  const handleLike = (storyId: string) => {
    setInteractions(prev => ({
      ...prev,
      [storyId]: { 
        ...prev[storyId], 
        liked: !prev[storyId]?.liked, 
        disliked: false 
      }
    }));
    
    toast({
      title: "Article liked",
      description: "Your feedback helps us curate better content for you.",
    });
  };
  
  const handleDislike = (storyId: string) => {
    setInteractions(prev => ({
      ...prev,
      [storyId]: { 
        ...prev[storyId], 
        disliked: !prev[storyId]?.disliked, 
        liked: false
      }
    }));
    
    toast({
      title: "Article disliked",
      description: "Your feedback helps us curate better content for you.",
    });
  };
  
  const handleSave = (storyId: string) => {
    setInteractions(prev => ({
      ...prev,
      [storyId]: { 
        ...prev[storyId], 
        saved: !prev[storyId]?.saved 
      }
    }));
    
    toast({
      title: "Article saved",
      description: "You can find this article in your saved stories.",
    });
  };

  return (
    <div className="w-full py-10 lg:py-20">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge>Top News</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-4xl tracking-tighter max-w-xl font-regular text-left">
                Danish Latest News
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                Stay informed with the latest headlines and stories from Denmark
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <div key={item.id} className="flex flex-col gap-2">
                <div className="bg-muted rounded-md aspect-video mb-2 overflow-hidden relative">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image';
                    }}
                  />
                  <div className="absolute top-2 left-2">
                    <Badge>{item.category}</Badge>
                  </div>
                </div>
                <h3 className="text-xl tracking-tight line-clamp-2 h-14">{item.title}</h3>
                <p className="text-muted-foreground text-base line-clamp-3">
                  {item.summary}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={interactions[item.id]?.liked ? "text-primary" : ""}
                      onClick={() => handleLike(item.id)}
                    >
                      <ThumbsUp size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={interactions[item.id]?.disliked ? "text-destructive" : ""}
                      onClick={() => handleDislike(item.id)}
                    >
                      <ThumbsDown size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={interactions[item.id]?.saved ? "text-primary" : ""}
                      onClick={() => handleSave(item.id)}
                    >
                      <Bookmark size={16} />
                    </Button>
                  </div>
                  <Button 
                    onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}
                    variant="outline"
                    size="sm"
                  >
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
