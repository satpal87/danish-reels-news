
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
    console.log('Tracking article view:', { articleId, userId, sessionId });

    // Use RPC call to track the view in the database
    const { error } = await supabase.rpc('track_article_view', { 
      p_article_id: articleId, 
      p_user_id: userId || null,
      p_session_id: !userId ? sessionId : null
    });

    if (error) {
      console.error('Error tracking article view:', error);
      return false;
    }

    console.log('View tracked successfully');
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
    console.log('Getting remaining views for session:', sessionId);
    
    // Use RPC call to get the count from the database
    const { data, error } = await supabase.rpc('get_remaining_article_views', {
      p_session_id: sessionId
    });

    if (error) {
      console.error('Error getting view count:', error);
      return 5; // Default to 5 if error
    }

    console.log('Remaining views data:', data);
    return data || 5;
  } catch (error) {
    console.error('Error in getRemainingViews:', error);
    return 5; // Default to 5 if error
  }
}

// Check if anonymous user has reached daily limit
export async function hasReachedDailyLimit(): Promise<boolean> {
  try {
    const remainingViews = await getRemainingViews();
    console.log('Remaining views check:', remainingViews);
    return remainingViews <= 0;
  } catch (error) {
    console.error('Error in hasReachedDailyLimit:', error);
    return false; // Default to not reached if error
  }
}

// Get user's reading history
export async function getUserReadingHistory(userId: string): Promise<any[]> {
  try {
    // Use RPC call to get reading history from the database
    const { data, error } = await supabase.rpc('get_user_reading_history', {
      p_user_id: userId
    });

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
