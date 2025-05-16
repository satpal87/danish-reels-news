
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { trackArticleView } from "@/services/articleViewService";

interface ArticleViewTrackerProps {
  articleId: string | undefined;
  isLimited: boolean;
}

const ArticleViewTracker = ({ articleId, isLimited }: ArticleViewTrackerProps) => {
  const { user } = useAuth();
  const [hasTrackedView, setHasTrackedView] = useState(false);

  // Track article view once data is loaded
  useEffect(() => {
    const track = async () => {
      if (articleId && !hasTrackedView && !isLimited) {
        const success = await trackArticleView(articleId, user?.id);
        if (success) {
          console.log("View tracked successfully");
          setHasTrackedView(true);
        }
      }
    };

    track();
  }, [articleId, user, hasTrackedView, isLimited]);

  // This is a utility component that doesn't render anything
  return null;
};

export default ArticleViewTracker;
