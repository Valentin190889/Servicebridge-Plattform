import React from 'react';
import { FolderOpen } from 'lucide-react';
import type { Category } from '../../types/knowledge';

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'AI Development',
    description: 'Resources and guides for AI development',
    articleCount: 15
  },
  {
    id: '2',
    name: 'Best Practices',
    description: 'Industry standard best practices and guidelines',
    articleCount: 10
  }
];

export function CategoryList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockCategories.map((category) => (
        <div
          key={category.id}
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-3 mb-4">
            <FolderOpen className="h-6 w-6 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
          </div>
          <p className="text-gray-600 mb-4">{category.description}</p>
          <div className="text-sm text-gray-500">
            {category.articleCount} articles
          </div>
        </div>
      ))}
    </div>
  );
}