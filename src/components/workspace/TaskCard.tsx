import React from 'react';
import { Edit, Trash } from 'lucide-react';
import type { Task } from '../../types/workspace';

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskCard({ task, onDragStart, onEdit, onDelete }: TaskCardProps) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="bg-white/10 rounded-lg p-4 mb-4 cursor-move border border-white/20 hover:border-[#29DDDA] transition-colors"
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-white">{task.title}</h4>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            task.priority === 'high' ? 'bg-red-500/20 text-red-300' :
            task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
            'bg-green-500/20 text-green-300'
          }`}>
            {task.priority}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEdit();
            }}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 text-gray-400 hover:text-red-400 transition-colors"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-300">{task.description}</p>
      {task.dueDate && (
        <div className="mt-2 text-xs text-gray-400">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
} 