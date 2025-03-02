import React from 'react';
import { TrendingUp } from 'lucide-react';

export function TrendingTopics() {
  const topics = [
    { name: 'Artificial Intelligence', count: 128 },
    { name: 'Cloud Computing', count: 95 },
    { name: 'Digital Transformation', count: 82 },
    { name: 'Cybersecurity', count: 76 },
    { name: 'Machine Learning', count: 64 }
  ];

  return (
    <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="h-5 w-5 text-primary-400" />
        <h2 className="text-lg font-semibold text-white">Trending Topics</h2>
      </div>
      
      <div className="space-y-3">
        {topics.map((topic) => (
          <div
            key={topic.name}
            className="flex items-center justify-between hover:bg-dark-700 p-2 rounded-lg cursor-pointer"
          >
            <span className="text-gray-300">{topic.name}</span>
            <span className="text-sm text-gray-400">{topic.count} articles</span>
          </div>
        ))}
      </div>
    </div>
  );
}