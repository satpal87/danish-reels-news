
import { supabase } from "@/integrations/supabase/client";

export interface NewsArticle {
  id: string;
  title: string;
  title_en: string | null;
  status: string;
  image: string | null;
  summary_txt: string | null;
  html: string | null;
  sources: string[] | null;
  category: string | null;
  summary: string | null;
  published_date: string | null;
  imported_date: string;
  rate: number | null;
  active: boolean;
  created_at: string;
}

export async function getNewsArticles(): Promise<NewsArticle[]> {
  try {
    const { data, error } = await supabase
      .from("news_articles")
      .select("*")
      .eq("active", true)
      .eq("status", "published")
      .order("published_date", { ascending: false });

    if (error) {
      console.error("Error fetching news articles:", error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error in getNewsArticles:", error);
    return [];
  }
}

export async function getAllNewsArticles(): Promise<NewsArticle[]> {
  try {
    const { data, error } = await supabase
      .from("news_articles")
      .select("*")
      .order("published_date", { ascending: false });

    if (error) {
      console.error("Error fetching all news articles:", error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error in getAllNewsArticles:", error);
    return [];
  }
}

export async function createNewsArticle(article: Omit<NewsArticle, "id" | "created_at" | "imported_date">): Promise<NewsArticle | null> {
  try {
    const { data, error } = await supabase
      .from("news_articles")
      .insert([article])
      .select()
      .single();

    if (error) {
      console.error("Error creating news article:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in createNewsArticle:", error);
    return null;
  }
}

export async function updateNewsArticle(id: string, article: Partial<NewsArticle>): Promise<NewsArticle | null> {
  try {
    const { data, error } = await supabase
      .from("news_articles")
      .update(article)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating news article:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in updateNewsArticle:", error);
    return null;
  }
}

export async function deleteNewsArticle(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("news_articles")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting news article:", error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Error in deleteNewsArticle:", error);
    return false;
  }
}

export async function toggleNewsStatus(id: string, active: boolean): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("news_articles")
      .update({ active })
      .eq("id", id);

    if (error) {
      console.error("Error toggling news status:", error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Error in toggleNewsStatus:", error);
    return false;
  }
}
