import React from 'react';
import { X, Star, MapPin, Globe, Award, Clock, MessageSquare, Calendar, ExternalLink } from 'lucide-react';
import type { Expert } from '../../types/expert';

interface ExpertProfileProps {
  expert: Expert;
  onClose: () => void;
}

export function ExpertProfile({ expert, onClose }: ExpertProfileProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-dark-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-dark-800 p-4 border-b border-gray-200 dark:border-dark-700 flex justify-between items-center z-10">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Expert Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start space-x-6">
            <img
              src={expert.avatarUrl}
              alt={expert.name}
              className="h-24 w-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {expert.name}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">{expert.title}</p>
              
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1 text-gray-700 dark:text-gray-300">{expert.rating} Rating</span>
                </div>
                <span className="text-gray-300 dark:text-gray-600">|</span>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="ml-1 text-gray-700 dark:text-gray-300">{expert.location}</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Call
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-700 hover:bg-gray-50 dark:hover:bg-dark-600">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">About</h4>
                <p className="text-gray-600 dark:text-gray-400">{expert.bio}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Recent Projects</h4>
                <ul className="space-y-3">
                  {expert.recentProjects.map((project, index) => (
                    <li
                      key={index}
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-primary-600 dark:bg-primary-400" />
                      </div>
                      <p className="ml-3 text-gray-600 dark:text-gray-400">{project}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Certifications</h4>
                <div className="flex flex-wrap gap-3">
                  {expert.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-dark-700 rounded-full"
                    >
                      <Award className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Expertise</h4>
                <div className="space-y-2">
                  {expert.expertise.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-600 dark:text-gray-400">{skill}</span>
                      <div className="w-24 h-2 bg-gray-200 dark:bg-dark-600 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-600 dark:bg-primary-400 rounded-full"
                          style={{ width: `${90 - index * 10}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Languages</h4>
                <div className="space-y-2">
                  {expert.languages.map((language, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2"
                    >
                      <Globe className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">{language}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Availability</h4>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Available for consultation
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Typically responds within 24 hours
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Rate</h4>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {expert.hourlyRate}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">per hour</p>
                <button className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}