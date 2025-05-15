
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

// Get session ID for anonymous users
export function getSessionId(): string {
  let sessionId = localStorage.getItem('anonymous_session_id');
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('anonymous_session_id', sessionId);
  }
  return sessionId;
}

// Track an article view
export async function trackArticleView(articleId: string, userId?: string | null): Promise<boolean> {
  try {
    const sessionId = getSessionId();

    const { error } = await supabase
      .from('article_views')
      .insert({
        article_id: articleId,
        user_id: userId || null,
        session_id: !userId ? sessionId : null,
      });

    if (error) {
      console.error('Error tracking article view:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in trackArticleView:', error);
    return false;
  }
}

// Get remaining article views for anonymous users
export async function getRemainingViews(): Promise<number> {
  try {
    const sessionId = getSessionId();
    
    // Direct database call to get count
    const { data, error } = await supabase
      .from('article_views')
      .select('id', { count: 'exact' })
      .eq('session_id', sessionId)
      .gte('viewed_at', new Date(new Date().setHours(0, 0, 0, 0)).toISOString())
      .lt('viewed_at', new Date(new Date().setHours(23, 59, 59, 999)).toISOString());

    if (error) {
      console.error('Error getting view count:', error);
      return 5; // Default to 5 if error
    }

    const count = data?.length || 0;
    return Math.max(0, 5 - count);
  } catch (error) {
    console.error('Error in getRemainingViews:', error);
    return 5; // Default to 5 if error
  }
}

// Check if anonymous user has reached daily limit
export async function hasReachedDailyLimit(): Promise<boolean> {
  try {
    const remainingViews = await getRemainingViews();
    return remainingViews <= 0;
  } catch (error) {
    console.error('Error in hasReachedDailyLimit:', error);
    return false; // Default to not reached if error
  }
}

// Get user's reading history
export async function getUserReadingHistory(userId: string): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('article_views')
      .select(`
        id,
        viewed_at,
        news_articles (
          id,
          title,
          title_en,
          image,
          category,
          published_date
        )
      `)
      .eq('user_id', userId)
      .order('viewed_at', { ascending: false });

    if (error) {
      console.error('Error getting reading history:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getUserReadingHistory:', error);
    return [];
  }
}
