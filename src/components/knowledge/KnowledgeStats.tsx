import React from 'react';
import { Book, Video, Users, Calendar } from 'lucide-react';

export function KnowledgeStats() {
  const stats = [
    {
      label: 'Articles',
      value: '250+',
      icon: Book,
      color: 'bg-blue-500',
    },
    {
      label: 'Video Tutorials',
      value: '120+',
      icon: Video,
      color: 'bg-purple-500',
    },
    {
      label: 'Expert Contributors',
      value: '50+',
      icon: Users,
      color: 'bg-green-500',
    },
    {
      label: 'Live Webinars',
      value: '25+',
      icon: Calendar,
      color: 'bg-orange-500',
    },
  ];

  return (
    <>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white dark:bg-dark-800 rounded-lg p-6 border border-gray-200 dark:border-dark-700"
        >
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
              <stat.icon className={`h-6 w-6 ${stat.color} text-white`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}