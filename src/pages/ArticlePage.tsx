
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { hasReachedDailyLimit } from "@/services/articleViewService";
import { ArticleViewCounter } from "@/components/ArticleViewCounter";
import ArticleHeader from "@/components/article/ArticleHeader";
import ArticleContent from "@/components/article/ArticleContent";
import ArticleLimitMessage from "@/components/article/ArticleLimitMessage";
import ArticleViewTracker from "@/components/article/ArticleViewTracker";
import PageFooter from "@/components/PageFooter";

const ArticlePage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [isLimited, setIsLimited] = useState(false);

  // Check limits first, before loading article content
  useEffect(() => {
    const checkLimits = async () => {
      if (!user) {
        const reachedLimit = await hasReachedDailyLimit();
        console.log("Has reached limit:", reachedLimit);
        setIsLimited(reachedLimit);
      }
    };
    
    checkLimits();
  }, [user]);

  const { data: article, isLoading } = useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      // For anonymous users, we already checked if they've reached limit in useEffect
      if (isLimited) {
        return null;
      }

      const { data, error } = await supabase
        .from("news_articles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast({
          title: "Error loading article",
          description: "Unable to load the article. Please try again.",
          variant: "destructive",
        });
        throw error;
      }

      return data;
    },
    enabled: !isLimited || !!user, // Only run query if user has not reached limit or is logged in
  });

  // If user has reached daily limit
  if (isLimited) {
    return <ArticleLimitMessage />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-gray-900 dark:text-white">
      <ArticleHeader />

      <div className="flex-grow">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <ArticleContent article={article} />
            <ArticleViewTracker articleId={id} isLimited={isLimited} />
          </>
        )}

        <ArticleViewCounter />
      </div>
      
      <PageFooter />
    </div>
  );
};

export default ArticlePage;
