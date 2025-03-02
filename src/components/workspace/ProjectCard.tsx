import React from 'react';
import { Calendar, Users, CheckSquare } from 'lucide-react';
import type { Project } from '../../types/workspace';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div 
      onClick={() => onClick(project)}
      className="bg-white dark:bg-dark-800 rounded-lg p-6 border border-gray-200 dark:border-dark-700 hover:border-primary-500 transition-colors cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{project.description}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          project.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
          project.status === 'completed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
        }`}>
          {project.status}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex space-x-4">
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(project.dueDate).toLocaleDateString()}
          </span>
          <span className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {project.teamMembers.length}
          </span>
          <span className="flex items-center">
            <CheckSquare className="h-4 w-4 mr-1" />
            {project.completedTasks}/{project.totalTasks}
          </span>
        </div>
      </div>
    </div>
  );
}