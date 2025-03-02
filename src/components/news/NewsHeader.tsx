import React, { useState } from 'react';
import { Search, Filter, Bell } from 'lucide-react';
import { useNews } from '../../contexts/NewsContext';
import type { NewsCategory } from '../../types/news';

interface NewsHeaderProps {
  onSubscribe: () => void;
}

export function NewsHeader({ onSubscribe }: NewsHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { setFilter } = useNews();
  const [showFilters, setShowFilters] = useState(false);

  const categories: NewsCategory[] = ['ai', 'technology', 'business', 'industry', 'research', 'events'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic
    console.log('Searching for:', searchQuery);
  };

  const handleCategorySelect = (category: NewsCategory) => {
    setFilter({ category });
    setShowFilters(false);
  };

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">News & Insights</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Stay updated with the latest industry trends and insights</p>
      </div>
      
      <div className="flex space-x-4">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="search"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </form>

        <div className="relative">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300"
          >
            <Filter className="h-5 w-5" />
            <span>Filter</span>
          </button>

          {showFilters && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-dark-800 ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onSubscribe}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Bell className="h-5 w-5" />
          <span>Subscribe</span>
        </button>
      </div>
    </div>
  );
}