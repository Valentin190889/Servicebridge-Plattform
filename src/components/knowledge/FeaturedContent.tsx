import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

export function FeaturedContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="relative h-96 rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="Featured webinar"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-500 text-white mb-3">
              Featured Webinar
            </span>
            <h3 className="text-2xl font-bold text-white mb-2">
              AI Implementation Strategies for Enterprise
            </h3>
            <p className="text-gray-200 mb-4">
              Join our expert panel discussing best practices and real-world case studies
            </p>
            <button className="inline-flex items-center space-x-2 text-white hover:text-primary-400">
              <span>Watch Now</span>
              <Play className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 border border-gray-200 dark:border-dark-700">
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 mb-3">
            New Course
          </span>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Machine Learning Fundamentals
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Master the basics of ML with hands-on tutorials and real-world examples
          </p>
          <button className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 dark:text-primary-400">
            <span>Start Learning</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 border border-gray-200 dark:border-dark-700">
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 mb-3">
            Trending
          </span>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            AI Ethics and Governance
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Essential guidelines for responsible AI development and deployment
          </p>
          <button className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 dark:text-primary-400">
            <span>Read More</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}