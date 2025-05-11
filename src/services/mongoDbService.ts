
import { MongoClient, ServerApiVersion } from 'mongodb';

export interface NewsArticle {
  title: string;
  url: string;
  image: string;
  summary: string;
  scraped_at: Date;
}

// Connection URI
const uri = "mongodb+srv://satpalsinghply:OBnCGpYDlJwesArs@newsscraper.e6zuhc9.mongodb.net/";

// Create a MongoClient with required options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function getNewsArticles(): Promise<NewsArticle[]> {
  try {
    // Connect the client
    await client.connect();
    console.log("Connected to MongoDB successfully");
    
    // Access the database and collection
    const database = client.db("dr_news");
    const articlesCollection = database.collection("articles");
    
    // Query for articles
    const articles = await articlesCollection.find({}).sort({ scraped_at: -1 }).limit(20).toArray();
    
    return articles as NewsArticle[];
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    return [];
  } finally {
    // Ensure client connection is closed
    await client.close();
  }
}
