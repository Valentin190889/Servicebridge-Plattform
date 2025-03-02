import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';

interface ForumHeaderProps {
  onNewTopic: () => void;
}

export function ForumHeader({ onNewTopic }: ForumHeaderProps) {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Community.AI</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Connect with other AI enthusiasts and share knowledge</p>
      </div>
      
      <div className="flex space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="search"
            placeholder="Search topics..."
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300">
          <Filter className="h-5 w-5" />
          <span>Filter</span>
        </button>
        <button
          onClick={onNewTopic}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Plus className="h-5 w-5" />
          <span>New Topic</span>
        </button>
      </div>
    </div>
  );
}