
import { Gallery4, Gallery4Item } from '@/components/blocks/gallery4';
import { NewsArticle } from '@/services/newsService';
import { formatPublishedDate } from '@/lib/utils';

interface TrendingNewsGalleryProps {
  trendingNews: NewsArticle[];
  autoScrollInterval?: number; // in milliseconds
}

export function TrendingNewsGallery({ trendingNews, autoScrollInterval = 5000 }: TrendingNewsGalleryProps) {
  // Convert trending news to Gallery4 format
  const trendingItems: Gallery4Item[] = trendingNews.map(article => ({
    id: article.id,
    title: article.title_en || article.title,
    description: article.summary_txt || article.summary || formatPublishedDate(article.published_date),
    href: `/article/${article.id}`,
    image: article.image || 'https://placehold.co/600x400?text=No+Image'
  }));

  // Use blank items if no trending news
  const items = trendingItems.length > 0 ? trendingItems : [
    {
      id: 'blank',
      title: 'No trending news available',
      description: 'Check back later for trending stories',
      href: '#',
      image: 'https://placehold.co/600x400?text=No+Trending+News'
    }
  ];

  return (
    <Gallery4
      title="Trending"
      description="Popular stories that are making headlines"
      items={items}
      autoScrollInterval={autoScrollInterval}
    />
  );
}
