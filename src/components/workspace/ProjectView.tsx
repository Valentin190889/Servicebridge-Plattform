import React, { useState } from 'react';
import { X, Plus, Calendar, Users, CheckSquare } from 'lucide-react';
import { TaskModal } from './TaskModal';
import { TaskCard } from './TaskCard';
import { useTasks } from '../../hooks/useTasks';
import type { Project, Task } from '../../types/workspace';

interface ProjectViewProps {
  project: Project;
  onClose: () => void;
}

export function ProjectView({ project, onClose }: ProjectViewProps) {
  const { tasks, loading, createTask, updateTask, deleteTask } = useTasks(project.id);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const columns: Array<{ id: Task['status']; title: string }> = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'completed', title: 'Completed' }
  ];

  const handleDragStart = (task: Task, e: React.DragEvent<HTMLDivElement>) => {
    setDraggedTask(task);
    e.dataTransfer.setData('taskId', task.id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (status: Task['status'], e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    
    if (draggedTask && draggedTask.id === taskId && draggedTask.status !== status) {
      try {
        await updateTask(draggedTask.id, { 
          status,
          updatedAt: new Date().toISOString()
        });
      } catch (err) {
        console.error('Failed to update task status:', err);
      }
    }
    setDraggedTask(null);
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setShowTaskModal(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
      } catch (err) {
        console.error('Failed to delete task:', err);
      }
    }
  };

  const handleSaveTask = async (taskData: Partial<Task>) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, {
          ...taskData,
          updatedAt: new Date().toISOString()
        });
      } else {
        await createTask({
          ...taskData,
          projectId: project.id,
          status: 'todo',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
      setShowTaskModal(false);
      setEditingTask(null);
    } catch (err) {
      console.error('Failed to save task:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1a1a1a]/95 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col border border-white/20">
        <div className="p-6 flex justify-between items-start border-b border-white/20 bg-[#1a1a1a]">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">{project.name}</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>
            <p className="text-gray-300 mb-4">{project.description}</p>
            <div className="flex items-center space-x-6 text-sm text-gray-300">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>Team: {project.teamMembers.length}</span>
              </div>
              <div className="flex items-center">
                <CheckSquare className="h-5 w-5 mr-2" />
                <span>Tasks: {project.completedTasks}/{project.totalTasks}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                project.status === 'active' ? 'bg-green-500/20 text-green-300' :
                project.status === 'completed' ? 'bg-blue-500/20 text-blue-300' :
                'bg-yellow-500/20 text-yellow-300'
              }`}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
            </div>
            <button
              onClick={handleAddTask}
              className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg transform transition-all duration-500"
              style={{
                backgroundImage: 'linear-gradient(to right, #b0c6ff -40%, #001945 5%, #DA22FF 180%)',
                border: '1px solid white',
                boxShadow: '0 0 20px #eee',
                backgroundSize: '200% auto',
              }}
            >
              <Plus className="h-5 w-5" />
              <span>Add Task</span>
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#29DDDA]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {columns.map(column => (
                <div
                  key={column.id}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(column.id, e)}
                  className="bg-[#1a1a1a]/90 rounded-lg p-4 border border-white/10"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">{column.title}</h3>
                  {tasks
                    .filter(task => task.status === column.id)
                    .map(task => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onDragStart={(e) => handleDragStart(task, e)}
                        onEdit={() => handleEditTask(task)}
                        onDelete={() => handleDeleteTask(task.id)}
                      />
                    ))
                  }
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showTaskModal && (
        <TaskModal
          projectId={project.id}
          task={editingTask || undefined}
          onClose={() => {
            setShowTaskModal(false);
            setEditingTask(null);
          }}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
}