import React from 'react';
import { Download, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import type { Article } from '../../types/knowledge';

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Getting Started with AI Development',
    content: 'Learn the basics of AI development...',
    category: 'AI Development',
    author: 'John Doe',
    createdAt: '2024-02-20T10:00:00Z',
    updatedAt: '2024-02-20T10:00:00Z',
    downloads: [
      {
        id: '1',
        name: 'AI Development Guide.pdf',
        url: '#',
        size: '2.5 MB',
        type: 'PDF'
      }
    ]
  }
];

export function ArticleList() {
  return (
    <div className="space-y-6">
      {mockArticles.map((article) => (
        <article key={article.id} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {article.title}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {article.author}
                </span>
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {format(new Date(article.createdAt), 'MMM d, yyyy')}
                </span>
                <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                  {article.category}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{article.content}</p>
            </div>
          </div>
          
          {article.downloads && article.downloads.length > 0 && (
            <div className="border-t pt-4 mt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Downloads</h3>
              {article.downloads.map((download) => (
                <a
                  key={download.id}
                  href={download.url}
                  className="flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-800"
                >
                  <Download className="h-4 w-4" />
                  <span>{download.name}</span>
                  <span className="text-gray-500">({download.size})</span>
                </a>
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}