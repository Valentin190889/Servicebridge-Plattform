import { useState, useEffect } from 'react';
import type { Project } from '../types/workspace';

// Mock data for projects
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'AI Implementation Strategy',
    description: 'Develop a comprehensive AI implementation strategy for our organization',
    status: 'active',
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    teamMembers: ['1', '2', '3'],
    completedTasks: 3,
    totalTasks: 8,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Customer Experience Redesign',
    description: 'Redesign the customer experience journey with AI-powered touchpoints',
    status: 'planning',
    dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days from now
    teamMembers: ['1', '4'],
    completedTasks: 0,
    totalTasks: 5,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Data Analytics Platform',
    description: 'Build an internal data analytics platform for business intelligence',
    status: 'completed',
    dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    teamMembers: ['1', '2', '5', '6'],
    completedTasks: 12,
    totalTasks: 12,
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days ago
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() // 10 days ago
  }
];

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const createProject = async (data: Partial<Project>) => {
    try {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newProject: Project = {
        id: Date.now().toString(),
        name: data.name || 'New Project',
        description: data.description || '',
        status: data.status || 'planning',
        dueDate: data.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        teamMembers: data.teamMembers || ['1'],
        completedTasks: 0,
        totalTasks: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setProjects(prev => [newProject, ...prev]);
      return newProject;
    } catch (err) {
      setError('Failed to create project');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id: string, data: Partial<Project>) => {
    try {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedProjects = projects.map(project => 
        project.id === id 
          ? { ...project, ...data, updatedAt: new Date().toISOString() } 
          : project
      );
      
      setProjects(updatedProjects);
      return updatedProjects.find(p => p.id === id);
    } catch (err) {
      setError('Failed to update project');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProjects(prev => prev.filter(project => project.id !== id));
    } catch (err) {
      setError('Failed to delete project');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject
  };
}