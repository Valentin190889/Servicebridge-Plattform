import { Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database';
import { Project } from '../entities/Project';
import { Task } from '../entities/Task';
import { AuthRequest } from './auth';

/**
 * Middleware to validate that a user has access to a project
 */
export const validateProjectAccess = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const projectId = req.params.id || req.params.projectId || req.body.projectId;
    
    if (!projectId) {
      return res.status(400).json({ message: 'Project ID is required' });
    }

    const projectRepository = AppDataSource.getRepository(Project);
    const project = await projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.owner', 'owner')
      .leftJoinAndSelect('project.team', 'team')
      .leftJoinAndSelect('team.members', 'members')
      .where('project.id = :projectId', { projectId })
      .getOne();

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is the owner of the project
    const isOwner = project.owner.id === req.user?.id;
    
    // Check if user is a member of the project's team
    const isTeamMember = project.team?.members?.some(member => member.id === req.user?.id) || false;

    if (!isOwner && !isTeamMember) {
      return res.status(403).json({ message: 'You do not have access to this project' });
    }

    // Attach the project to the request for later use
    req.project = project;
    next();
  } catch (error) {
    console.error('Project access validation error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Middleware to validate that a user has access to a task
 */
export const validateTaskAccess = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const taskId = req.params.id || req.params.taskId || req.body.taskId;
    
    if (!taskId) {
      return res.status(400).json({ message: 'Task ID is required' });
    }

    const taskRepository = AppDataSource.getRepository(Task);
    const task = await taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.project', 'project')
      .leftJoinAndSelect('project.owner', 'projectOwner')
      .leftJoinAndSelect('project.team', 'team')
      .leftJoinAndSelect('team.members', 'members')
      .leftJoinAndSelect('task.assignee', 'assignee')
      .leftJoinAndSelect('task.creator', 'creator')
      .where('task.id = :taskId', { taskId })
      .getOne();

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if user is the project owner, task creator, task assignee, or team member
    const isProjectOwner = task.project.owner.id === req.user?.id;
    const isTaskCreator = task.creator.id === req.user?.id;
    const isTaskAssignee = task.assignee?.id === req.user?.id;
    const isTeamMember = task.project.team?.members?.some(member => member.id === req.user?.id) || false;

    if (!isProjectOwner && !isTaskCreator && !isTaskAssignee && !isTeamMember) {
      return res.status(403).json({ message: 'You do not have access to this task' });
    }

    // Attach the task to the request for later use
    req.task = task;
    next();
  } catch (error) {
    console.error('Task access validation error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}; 