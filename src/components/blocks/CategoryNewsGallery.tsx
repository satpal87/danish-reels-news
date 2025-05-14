
import { useNavigate } from 'react-router-dom';
import { Gallery4, Gallery4Item } from '@/components/blocks/gallery4';
import { NewsArticle } from '@/services/newsService';
import { formatPublishedDate } from '@/lib/utils';

interface CategoryNewsGalleryProps {
  title: string;
  articles: NewsArticle[];
  description?: string;
}

export function CategoryNewsGallery({ title, articles, description = "" }: CategoryNewsGalleryProps) {
  const navigate = useNavigate();

  // Convert news articles to Gallery4Item format
  const galleryItems: Gallery4Item[] = articles.map((article) => ({
    id: article.id,
    title: article.title_en || article.title,
    description: article.summary_txt || article.summary || formatPublishedDate(article.published_date),
    href: `/article/${article.id}`,
    image: article.image || 'https://placehold.co/600x400?text=No+Image'
  }));

  // Use blank items if no news available
  const items = galleryItems.length > 0 ? galleryItems : [
    {
      id: 'blank',
      title: `No ${title} news available`,
      description: 'Check back later for more stories',
      href: '#',
      image: 'https://placehold.co/600x400?text=No+News'
    }
  ];

  return (
    <Gallery4 
      title={title}
      description={description}
      items={items}
    />
  );
}
