import React, { useState } from 'react';
import { Loader } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';
import type { Task } from '../../types/workspace';

interface TaskBoardProps {
  projectId: string;
}

export function TaskBoard({ projectId }: TaskBoardProps) {
  const { tasks, loading, error, updateTask } = useTasks(projectId);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const columns = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' }
  ];

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (status: string) => {
    if (draggedTask) {
      try {
        await updateTask(draggedTask.id, { status });
      } catch (err) {
        console.error('Failed to update task status:', err);
      }
      setDraggedTask(null);
    }
  };

  if (error) {
    return (
      <div className="text-center text-red-600 dark:text-red-400">
        Error loading tasks: {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="h-8 w-8 text-primary-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((column) => (
        <div
          key={column.id}
          className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(column.id)}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {column.title}
          </h3>
          <div className="space-y-4">
            {tasks
              .filter((task) => task.status === column.id)
              .map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task)}
                  className="bg-white dark:bg-dark-800 rounded-lg shadow-sm p-4 cursor-move hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{task.title}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{task.description}</p>
                  {task.due_date && (
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                      Due: {new Date(task.due_date).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}