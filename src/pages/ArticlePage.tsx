
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { hasReachedDailyLimit } from "@/services/articleViewService";
import { ArticleViewCounter } from "@/components/ArticleViewCounter";
import ArticleContent from "@/components/article/ArticleContent";
import ArticleLimitMessage from "@/components/article/ArticleLimitMessage";
import ArticleViewTracker from "@/components/article/ArticleViewTracker";
import RelatedArticles from "@/components/article/RelatedArticles";
import { NewsArticle } from "@/services/newsService";
import NavBar from "@/components/NavBar";
import { Home, Bookmark, Bell, Search, User } from "lucide-react";
import { TubelightNavbar } from "@/components/ui/tubelight-navbar";
import { useIsMobile } from "@/hooks/use-mobile";

const ArticlePage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [isLimited, setIsLimited] = useState(false);
  const isMobile = useIsMobile();

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

  // Query for related articles based on same category
  const { data: relatedArticles } = useQuery({
    queryKey: ["relatedArticles", article?.category, id],
    queryFn: async () => {
      if (!article?.category) return [];

      const { data, error } = await supabase
        .from("news_articles")
        .select("*")
        .eq("category", article.category)
        .eq("active", true)
        .eq("status", "published")
        .neq("id", id)
        .order("published_date", { ascending: false })
        .limit(6);

      if (error) {
        console.error("Error fetching related articles:", error);
        return [];
      }

      return data as NewsArticle[];
    },
    enabled: !!article?.category, // Only run when we have the main article's category
  });

  // If user has reached daily limit
  if (isLimited) {
    return <ArticleLimitMessage />;
  }

  // Mobile navigation items
  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Search", url: "/search", icon: Search },
    { name: "Saved", url: "/saved", icon: Bookmark },
    { name: "Account", url: user ? "/settings" : "/auth", icon: User },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <NavBar />
      <div className="flex-grow pt-16 pb-20">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <ArticleContent article={article} />
            {relatedArticles && relatedArticles.length > 0 && (
              <RelatedArticles articles={relatedArticles} />
            )}
            <ArticleViewTracker articleId={id} isLimited={isLimited} />
          </>
        )}

        <ArticleViewCounter />
      </div>
      
      {/* Mobile Bottom Navigation */}
      {isMobile && <TubelightNavbar items={navItems} />}
    </div>
  );
};

export default ArticlePage;
