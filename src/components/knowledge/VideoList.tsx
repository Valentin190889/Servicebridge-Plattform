import React from 'react';
import { Play, Clock, ThumbsUp, Eye } from 'lucide-react';

const videos = [
  {
    id: '1',
    title: 'Getting Started with AI Development',
    description: 'Learn the fundamentals of AI development with practical examples.',
    duration: '15:30',
    views: 1234,
    likes: 89,
    thumbnail: 'https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: 'Tech Academy'
  },
  {
    id: '2',
    title: 'Advanced Machine Learning Techniques',
    description: 'Deep dive into advanced ML concepts and implementations.',
    duration: '23:45',
    views: 892,
    likes: 67,
    thumbnail: 'https://images.unsplash.com/photo-1526378800651-c1c6b5b27aea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: 'AI Labs'
  }
];

export function VideoList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <div
          key={video.id}
          className="bg-white dark:bg-dark-800 rounded-lg overflow-hidden border border-gray-200 dark:border-dark-700 hover:border-primary-500 transition-colors"
        >
          <div className="relative group">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-3 bg-primary-600 rounded-full text-white hover:bg-primary-700">
                <Play className="h-6 w-6" />
              </button>
            </div>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded text-white text-sm">
              {video.duration}
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {video.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {video.description}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{video.author}</span>
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {video.views}
                </span>
                <span className="flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  {video.likes}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}