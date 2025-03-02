import React, { useState, useEffect } from 'react';
import { Plus, Search, Loader } from 'lucide-react';
import { ProjectList } from '../components/workspace/ProjectList';
import { ProjectModal } from '../components/workspace/ProjectModal';
import { ProjectView } from '../components/workspace/ProjectView';
import { useProjects } from '../hooks/useProjects';
import { useTasks } from '../hooks/useTasks';
import type { Project } from '../types/workspace';

export function Workspace() {
  const { projects, loading, error, createProject, updateProject } = useProjects();
  const { createTask } = useTasks();
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewingProject, setViewingProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Check for new project from AiCo
  useEffect(() => {
    const newProjectData = localStorage.getItem('newProject');
    if (newProjectData) {
      try {
        const projectInput = JSON.parse(newProjectData);
        const { initialTasks, ...projectData } = projectInput;
        
        // Remove from localStorage immediately to prevent duplicates
        localStorage.removeItem('newProject');
        
        // Create the project first
        createProject(projectData).then(project => {
          // Then create all initial tasks if they exist
          if (initialTasks && Array.isArray(initialTasks)) {
            Promise.all(
              initialTasks.map(taskData => 
                createTask({
                  ...taskData,
                  projectId: project.id
                })
              )
            ).catch(err => {
              console.error('Failed to create initial tasks:', err);
            });
          }
          
          setViewingProject(project); // Automatically open the new project
        }).catch(err => {
          console.error('Failed to create project:', err);
        });
      } catch (err) {
        console.error('Failed to parse project data:', err);
        localStorage.removeItem('newProject'); // Clean up in case of error
      }
    }
  }, [createProject, createTask]);

  const handleProjectClick = (project: Project) => {
    setViewingProject(project);
  };

  const handleSaveProject = async (projectData: Partial<Project>) => {
    try {
      if (selectedProject) {
        await updateProject(selectedProject.id, projectData);
      } else {
        await createProject(projectData);
      }
      setShowNewProjectModal(false);
      setSelectedProject(null);
    } catch (err) {
      console.error('Failed to save project:', err);
    }
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (project.description?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-8">
        <div className="text-center text-red-600 dark:text-red-400">
          Error loading projects: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/Background_Theme_SAI.jpg")',
          filter: 'brightness(0.9)'
        }}
      />
      {/* Overlay for better content visibility */}
      <div className="absolute inset-0 z-0 bg-black bg-opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-[#29DDDA] text-transparent bg-clip-text">Workspace</h1>
            <p className="mt-2 text-gray-300">
              Manage your projects and track progress
            </p>
          </div>
          <div className="flex space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="search"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300/20 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-white/50 focus:border-transparent w-64"
              />
            </div>
            <button
              onClick={() => {
                setSelectedProject(null);
                setShowNewProjectModal(true);
              }}
              className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg transform transition-all duration-500"
              style={{
                backgroundImage: 'linear-gradient(to right, #b0c6ff -40%, #001945 5%, #DA22FF 180%)',
                border: '1px solid white',
                boxShadow: '0 0 20px #eee',
                backgroundSize: '200% auto',
              }}
            >
              <Plus className="h-5 w-5" />
              <span>New Project</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="h-8 w-8 text-white animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project)}
                className="bg-white/10 border border-white/20 rounded-lg p-6 hover:border-[#29DDDA] transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                    <p className="text-sm text-gray-300 mt-1">{project.description}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    project.status === 'active' ? 'bg-green-500/20 text-green-300' :
                    project.status === 'completed' ? 'bg-blue-500/20 text-blue-300' :
                    'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-300">
                  <div className="flex space-x-4">
                    <span className="flex items-center">
                      <span className="mr-1">Due:</span>
                      {new Date(project.dueDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <span className="mr-1">Team:</span>
                      {project.teamMembers.length}
                    </span>
                  </div>
                  <span className="flex items-center">
                    <span className="mr-1">Tasks:</span>
                    {project.completedTasks}/{project.totalTasks}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {showNewProjectModal && (
          <ProjectModal
            project={selectedProject || undefined}
            onClose={() => {
              setShowNewProjectModal(false);
              setSelectedProject(null);
            }}
            onSave={handleSaveProject}
          />
        )}

        {viewingProject && (
          <ProjectView
            project={viewingProject}
            onClose={() => setViewingProject(null)}
          />
        )}
      </div>
    </div>
  );
}