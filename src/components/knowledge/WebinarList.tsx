import React from 'react';
import { Calendar, Clock, Users, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

const webinars = [
  {
    id: '1',
    title: 'AI Implementation Strategies for Enterprise',
    description: 'Learn how to successfully implement AI solutions in enterprise environments.',
    date: '2024-03-15T10:00:00Z',
    duration: 60,
    speakers: ['Dr. Sarah Chen', 'Michael Rodriguez'],
    attendees: 156,
    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Machine Learning Best Practices',
    description: 'Deep dive into ML model development and deployment strategies.',
    date: '2024-03-20T15:00:00Z',
    duration: 90,
    speakers: ['Alex Thompson', 'Maria Garcia'],
    attendees: 203,
    thumbnail: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'upcoming'
  }
];

export function WebinarList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {webinars.map((webinar) => (
        <div
          key={webinar.id}
          className="bg-white dark:bg-dark-800 rounded-lg overflow-hidden border border-gray-200 dark:border-dark-700 hover:border-primary-500 transition-colors"
        >
          <div className="relative h-48">
            <img
              src={webinar.thumbnail}
              alt={webinar.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                webinar.status === 'upcoming'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
              }`}>
                {webinar.status === 'upcoming' ? 'Upcoming' : 'Available Now'}
              </span>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {webinar.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {webinar.description}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {format(new Date(webinar.date), 'MMM d, yyyy')}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {webinar.duration} minutes
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                {webinar.attendees} registered
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {webinar.speakers.map((speaker, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full bg-gray-200 dark:bg-dark-700 border-2 border-white dark:border-dark-800 flex items-center justify-center"
                  >
                    <span className="text-xs font-medium">
                      {speaker.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                ))}
                <div className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  {webinar.speakers.join(', ')}
                </div>
              </div>
              <button className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 dark:text-primary-400">
                <span>Register</span>
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}