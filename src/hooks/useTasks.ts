import { useState, useEffect } from 'react';
import type { Task } from '../types/workspace';

// Mock data for tasks
const mockTasks: Record<string, Task[]> = {
  '1': [
    {
      id: '101',
      projectId: '1',
      title: 'Research AI technologies',
      description: 'Conduct research on available AI technologies and their potential applications',
      status: 'completed',
      priority: 'high',
      assignedTo: ['1'],
      dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '102',
      projectId: '1',
      title: 'Define implementation scope',
      description: 'Define the scope and boundaries of the AI implementation',
      status: 'completed',
      priority: 'high',
      assignedTo: ['2'],
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    }
  ],
  '2': [
    {
      id: '201',
      projectId: '2',
      title: 'Customer journey mapping',
      description: 'Map the current customer journey to identify pain points',
      status: 'todo',
      priority: 'high',
      assignedTo: ['1'],
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]
};

export function useTasks(projectId?: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;
    
    const fetchTasks = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setTasks(mockTasks[projectId] || []);
      } catch (err) {
        setError('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTasks();
  }, [projectId]);

  const createTask = async (data: Partial<Task> & { projectId: string }) => {
    try {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newTask: Task = {
        id: Date.now().toString(),
        projectId: data.projectId,
        title: data.title || 'New Task',
        description: data.description || '',
        status: data.status || 'todo',
        priority: data.priority || 'medium',
        assignedTo: data.assignedTo || [],
        dueDate: data.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Only update state if we're viewing this project's tasks
      if (projectId === data.projectId) {
        setTasks(prev => [newTask, ...prev]);
      }
      
      // Update mock data
      if (!mockTasks[data.projectId]) {
        mockTasks[data.projectId] = [];
      }
      mockTasks[data.projectId].push(newTask);
      
      return newTask;
    } catch (err) {
      setError('Failed to create task');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id: string, data: Partial<Task>) => {
    if (!projectId) throw new Error('Project ID is required');
    
    try {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedTasks = tasks.map(task => 
        task.id === id 
          ? { ...task, ...data, updatedAt: new Date().toISOString() } 
          : task
      );
      
      setTasks(updatedTasks);
      
      // Update mock data
      if (mockTasks[projectId]) {
        mockTasks[projectId] = mockTasks[projectId].map(task => 
          task.id === id 
            ? { ...task, ...data, updatedAt: new Date().toISOString() } 
            : task
        );
      }
      
      return updatedTasks.find(t => t.id === id);
    } catch (err) {
      setError('Failed to update task');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    if (!projectId) throw new Error('Project ID is required');
    
    try {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTasks(prev => prev.filter(task => task.id !== id));
      
      // Update mock data
      if (mockTasks[projectId]) {
        mockTasks[projectId] = mockTasks[projectId].filter(task => task.id !== id);
      }
    } catch (err) {
      setError('Failed to delete task');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask
  };
}