import React from 'react';
import { Cpu, Brain, Lightbulb, Code, Network, Shield } from 'lucide-react';
import type { ForumCategory } from '../../types/community';

const mockCategories: ForumCategory[] = [
  {
    id: '1',
    name: 'AI Implementation',
    description: 'Discuss strategies and best practices for implementing AI solutions',
    postsCount: 156,
    icon: 'Cpu'
  },
  {
    id: '2',
    name: 'Machine Learning',
    description: 'Share knowledge about ML algorithms, models, and applications',
    postsCount: 243,
    icon: 'Brain'
  }
];

const iconMap = {
  Cpu,
  Brain,
  Lightbulb,
  Code,
  Network,
  Shield
};

export function ForumCategories() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {mockCategories.map((category) => {
        const IconComponent = iconMap[category.icon as keyof typeof iconMap];
        
        return (
          <div
            key={category.id}
            className="bg-dark-800 rounded-lg p-6 border border-dark-700 hover:border-primary-500 transition-colors cursor-pointer"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-dark-700 rounded-lg">
                <IconComponent className="h-6 w-6 text-primary-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{category.description}</p>
                <div className="mt-3 text-sm text-gray-500">
                  {category.postsCount} posts
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}