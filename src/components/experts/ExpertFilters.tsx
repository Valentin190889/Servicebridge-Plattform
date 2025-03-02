import React, { useState } from 'react';
import { Filter, Check } from 'lucide-react';

const expertiseAreas = [
  'AI Development',
  'Machine Learning',
  'Cloud Architecture',
  'Data Science',
  'DevOps',
  'Security'
];

const availabilityOptions = [
  'Available Now',
  'Available Today',
  'Available This Week'
];

export function ExpertFilters() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string>('');

  const toggleExpertise = (expertise: string) => {
    setSelectedExpertise(prev =>
      prev.includes(expertise)
        ? prev.filter(e => e !== expertise)
        : [...prev, expertise]
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300"
      >
        <Filter className="h-5 w-5" />
        <span>Filter</span>
      </button>

      {showFilters && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-gray-200 dark:border-dark-700 z-50">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Expertise
            </h3>
            <div className="space-y-2">
              {expertiseAreas.map(area => (
                <label
                  key={area}
                  className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  <input
                    type="checkbox"
                    checked={selectedExpertise.includes(area)}
                    onChange={() => toggleExpertise(area)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span>{area}</span>
                </label>
              ))}
            </div>

            <h3 className="text-sm font-medium text-gray-900 dark:text-white mt-4 mb-3">
              Availability
            </h3>
            <div className="space-y-2">
              {availabilityOptions.map(option => (
                <label
                  key={option}
                  className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  <input
                    type="radio"
                    name="availability"
                    value={option}
                    checked={selectedAvailability === option}
                    onChange={(e) => setSelectedAvailability(e.target.value)}
                    className="border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => {
                  setSelectedExpertise([]);
                  setSelectedAvailability('');
                }}
                className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Clear
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}