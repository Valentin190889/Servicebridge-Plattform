import React from 'react';
import { X, ThumbsUp, Eye, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import type { NewsArticle } from '../../types/news';
import { useNews } from '../../contexts/NewsContext';

interface ArticleModalProps {
  article: NewsArticle;
  onClose: () => void;
}

export function ArticleModal({ article, onClose }: ArticleModalProps) {
  const { likeArticle } = useNews();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-dark-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-dark-800 p-4 border-b border-gray-200 dark:border-dark-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{article.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-64 object-cover"
          />
        )}

        <div className="p-6">
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {format(new Date(article.publishedAt), 'MMM d, yyyy')}
            </span>
            <span className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {article.views} views
            </span>
            <button
              onClick={() => likeArticle(article.id)}
              className="flex items-center text-primary-600 hover:text-primary-700"
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              {article.likes} likes
            </button>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
              {article.content}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 text-sm rounded-full bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}