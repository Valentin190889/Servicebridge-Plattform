import React from 'react';
import { Clock, Eye, ThumbsUp, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import type { NewsArticle, NewsFilter } from '../../types/news';
import { useNews } from '../../contexts/NewsContext';

interface NewsListProps {
  filter?: NewsFilter;
  onArticleClick: (article: NewsArticle) => void;
}

export function NewsList({ filter, onArticleClick }: NewsListProps) {
  const { articles, likeArticle } = useNews();

  const filteredArticles = articles.filter(article => {
    if (filter?.category && article.category !== filter.category) {
      return false;
    }
    if (filter?.tag && !article.tags.includes(filter.tag)) {
      return false;
    }
    if (filter?.timeframe) {
      const date = new Date(article.publishedAt);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const days = diff / (1000 * 60 * 60 * 24);
      
      switch (filter.timeframe) {
        case 'day':
          return days <= 1;
        case 'week':
          return days <= 7;
        case 'month':
          return days <= 30;
        case 'year':
          return days <= 365;
      }
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {filteredArticles.map((article) => (
        <article
          key={article.id}
          className="bg-white dark:bg-dark-800 rounded-lg overflow-hidden border border-gray-200 dark:border-dark-700 hover:border-primary-500 transition-colors"
        >
          {article.imageUrl && (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-6">
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
              <span className="px-2 py-1 bg-gray-100 dark:bg-dark-700 rounded-full text-primary-600 dark:text-primary-400">
                {article.category}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {article.readTime} min read
              </span>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {article.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{article.summary}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    likeArticle(article.id);
                  }}
                  className="flex items-center hover:text-primary-600 dark:hover:text-primary-400"
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  {article.likes}
                </button>
                <span className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {article.views}
                </span>
              </div>
              <button
                onClick={() => onArticleClick(article)}
                className="flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Read more
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}