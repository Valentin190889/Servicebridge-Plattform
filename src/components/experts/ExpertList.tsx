import React from 'react';
import { Star, Clock, MessageSquare, Award, Briefcase, MapPin } from 'lucide-react';
import type { Expert } from '../../types/expert';

interface ExpertListProps {
  onExpertClick: (expert: Expert) => void;
  searchQuery: string;
}

const mockExperts: Expert[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    title: 'AI Strategy Consultant',
    expertise: ['Artificial Intelligence', 'Machine Learning', 'Digital Transformation'],
    location: 'San Francisco, CA',
    experience: '12+ years',
    languages: ['English', 'Mandarin'],
    certifications: ['AWS ML Specialty', 'Google Cloud AI'],
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.9,
    availability: 'available',
    bio: 'Specialized in helping businesses implement AI solutions and develop comprehensive digital transformation strategies.',
    recentProjects: [
      'AI Strategy Development for Fortune 500 Company',
      'ML Implementation for Healthcare Provider'
    ],
    hourlyRate: '$250'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    title: 'ML Engineering Lead',
    expertise: ['Machine Learning', 'Deep Learning', 'Computer Vision'],
    location: 'Boston, MA',
    experience: '8+ years',
    languages: ['English', 'Spanish'],
    certifications: ['TensorFlow Developer', 'NVIDIA DLI'],
    avatarUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.8,
    availability: 'busy',
    bio: 'Expert in building and deploying large-scale ML systems with a focus on computer vision applications.',
    recentProjects: [
      'Computer Vision System for Manufacturing',
      'ML Pipeline Optimization'
    ],
    hourlyRate: '$200'
  }
];

export function ExpertList({ onExpertClick, searchQuery }: ExpertListProps) {
  const filteredExperts = mockExperts.filter(expert =>
    expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expert.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredExperts.map((expert) => (
        <div
          key={expert.id}
          className="bg-white dark:bg-dark-800 rounded-lg p-6 border border-gray-200 dark:border-dark-700 hover:border-primary-500 transition-colors cursor-pointer"
          onClick={() => onExpertClick(expert)}
        >
          <div className="flex items-start space-x-4">
            <img
              src={expert.avatarUrl}
              alt={expert.name}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {expert.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{expert.title}</p>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
                  {expert.rating}
                </span>
                <span className={`ml-3 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  expert.availability === 'available' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                }`}>
                  <Clock className="h-3 w-3 mr-1" />
                  {expert.availability === 'available' ? 'Available' : 'Busy'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
              <span className="flex items-center">
                <Briefcase className="h-4 w-4 mr-1" />
                {expert.experience}
              </span>
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {expert.location}
              </span>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {expert.expertise.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {expert.hourlyRate}/hour
            </span>
            <button className="inline-flex items-center px-3 py-1.5 border border-primary-500 rounded text-sm font-medium text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-900/10">
              <MessageSquare className="h-4 w-4 mr-1" />
              Contact
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}