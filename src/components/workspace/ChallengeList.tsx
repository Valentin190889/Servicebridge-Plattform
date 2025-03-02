import React from 'react';
import { Plus, ArrowRight } from 'lucide-react';
import type { Challenge } from '../../types/workspace';

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Improve Customer Retention',
    description: 'Develop strategies to increase customer loyalty and reduce churn rate.',
    tasks: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export function ChallengeList() {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4 mr-2" />
          New Challenge
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockChallenges.map((challenge) => (
          <div key={challenge.id} className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {challenge.title}
            </h3>
            <p className="text-gray-600 mb-4">{challenge.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {challenge.tasks.length} tasks
              </span>
              <button className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800">
                View Tasks
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}