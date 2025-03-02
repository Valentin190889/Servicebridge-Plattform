export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
  createdAt: string;
  dueDate: string;
  teamMembers: string[];
  completedTasks: number;
  totalTasks: number;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  assignedTo: string[];
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectCreateInput {
  name: string;
  description: string;
  dueDate: string;
  teamMembers?: string[];
  tags?: string[];
  priority?: 'low' | 'medium' | 'high';
  initialTasks?: Array<Partial<Task>>;
}