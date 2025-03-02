import React from 'react';
import { Hash } from 'lucide-react';

export function NewsCategories() {
  const categories = [
    { name: 'AI & Machine Learning', color: 'bg-blue-600' },
    { name: 'Cloud Technology', color: 'bg-purple-600' },
    { name: 'Business Strategy', color: 'bg-green-600' },
    { name: 'Industry News', color: 'bg-yellow-600' },
    { name: 'Research & Development', color: 'bg-red-600' }
  ];

  return (
    <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
      <div className="flex items-center space-x-2 mb-4">
        <Hash className="h-5 w-5 text-primary-400" />
        <h2 className="text-lg font-semibold text-white">Categories</h2>
      </div>
      
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.name}
            className="flex items-center space-x-2 w-full p-2 rounded-lg hover:bg-dark-700 text-left"
          >
            <span className={`w-3 h-3 rounded-full ${category.color}`} />
            <span className="text-gray-300">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}