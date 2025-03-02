export type NewsCategory = 'ai' | 'technology' | 'business' | 'industry' | 'research' | 'events';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: NewsCategory;
  author: string;
  publishedAt: string;
  readTime: number;
  imageUrl?: string;
  tags: string[];
  likes: number;
  views: number;
}

export interface NewsFilter {
  category?: NewsCategory;
  tag?: string;
  timeframe?: 'day' | 'week' | 'month' | 'year';
}