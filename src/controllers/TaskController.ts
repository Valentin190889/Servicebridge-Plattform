import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Task } from '../entities/Task';
import { Project } from '../entities/Project';
import { User } from '../entities/User';
import { AuthRequest } from '../middleware/auth';

export class TaskController {
    private taskRepository = AppDataSource.getRepository(Task);
    private projectRepository = AppDataSource.getRepository(Project);
    private userRepository = AppDataSource.getRepository(User);

    constructor() {
        // Bind methods to instance
        this.getUserTasks = this.getUserTasks.bind(this);
        this.getProjectTasks = this.getProjectTasks.bind(this);
        this.createTask = this.createTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    async getUserTasks(req: AuthRequest, res: Response) {
        try {
            const tasks = await this.taskRepository
                .createQueryBuilder('task')
                .leftJoinAndSelect('task.project', 'project')
                .leftJoinAndSelect('task.assignee', 'assignee')
                .where('assignee.id = :userId', { userId: req.user?.id })
                .getMany();

            return res.json(tasks);
        } catch (error) {
            console.error('Get user tasks error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getProjectTasks(req: AuthRequest, res: Response) {
        try {
            // If using the validateProjectAccess middleware, the project is already attached to the request
            let project = req.project;
            
            if (!project) {
                // Fallback to the original implementation if middleware is not used
                const foundProject = await this.projectRepository
                    .createQueryBuilder('project')
                    .leftJoinAndSelect('project.owner', 'owner')
                    .where('project.id = :projectId', { projectId: req.params.projectId })
                    .andWhere('owner.id = :userId', { userId: req.user?.id })
                    .getOne();

                if (!foundProject) {
                    return res.status(404).json({ message: 'Project not found' });
                }
                
                project = foundProject;
            }

            const tasks = await this.taskRepository
                .createQueryBuilder('task')
                .leftJoinAndSelect('task.project', 'project')
                .leftJoinAndSelect('task.assignee', 'assignee')
                .where('project.id = :projectId', { projectId: project.id })
                .getMany();

            return res.json(tasks);
        } catch (error) {
            console.error('Get project tasks error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async createTask(req: AuthRequest, res: Response) {
        try {
            const { title, description, projectId, assigneeId, status, priority, dueDate, estimatedHours } = req.body;

            if (!title || !projectId) {
                return res.status(400).json({ message: 'Title and project ID are required' });
            }

            const project = await this.projectRepository
                .createQueryBuilder('project')
                .leftJoinAndSelect('project.owner', 'owner')
                .where('project.id = :projectId', { projectId })
                .andWhere('owner.id = :userId', { userId: req.user?.id })
                .getOne();

            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }

            let assignee = null;
            if (assigneeId) {
                assignee = await this.userRepository.findOneBy({ id: assigneeId });
                if (!assignee) {
                    return res.status(404).json({ message: 'Assignee not found' });
                }
            }

            const task = this.taskRepository.create({
                title,
                description,
                status,
                priority,
                dueDate: dueDate ? new Date(dueDate) : undefined,
                estimatedHours,
                project,
                assignee,
                creator: req.user
            });

            await this.taskRepository.save(task);
            return res.status(201).json(task);
        } catch (error) {
            console.error('Create task error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateTask(req: AuthRequest, res: Response) {
        try {
            // If using the validateTaskAccess middleware, the task is already attached to the request
            let task = req.task;
            
            if (!task) {
                // Fallback to the original implementation if middleware is not used
                const foundTask = await this.taskRepository
                    .createQueryBuilder('task')
                    .leftJoinAndSelect('task.project', 'project')
                    .leftJoinAndSelect('project.owner', 'owner')
                    .leftJoinAndSelect('task.assignee', 'assignee')
                    .where('task.id = :taskId', { taskId: req.params.id })
                    .andWhere('(owner.id = :userId OR assignee.id = :userId)', { userId: req.user?.id })
                    .getOne();

                if (!foundTask) {
                    return res.status(404).json({ message: 'Task not found or unauthorized' });
                }
                
                task = foundTask;
            }

            const { title, description, status, priority, dueDate, progress, estimatedHours, assigneeId } = req.body;

            if (title) task.title = title;
            if (description !== undefined) task.description = description;
            if (status) task.status = status;
            if (priority) task.priority = priority;
            if (dueDate) task.dueDate = new Date(dueDate);
            if (progress !== undefined) task.progress = progress;
            if (estimatedHours !== undefined) task.estimatedHours = estimatedHours;

            if (assigneeId !== undefined) {
                if (assigneeId === null) {
                    task.assignee = null;
                } else {
                    const assignee = await this.userRepository.findOneBy({ id: assigneeId });
                    if (!assignee) {
                        return res.status(404).json({ message: 'Assignee not found' });
                    }
                    task.assignee = assignee;
                }
            }

            await this.taskRepository.save(task);
            return res.json(task);
        } catch (error) {
            console.error('Update task error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteTask(req: AuthRequest, res: Response) {
        try {
            // If using the validateTaskAccess middleware, the task is already attached to the request
            let task = req.task;
            
            if (!task) {
                // Fallback to the original implementation if middleware is not used
                const foundTask = await this.taskRepository
                    .createQueryBuilder('task')
                    .leftJoinAndSelect('task.project', 'project')
                    .leftJoinAndSelect('project.owner', 'owner')
                    .where('task.id = :taskId', { taskId: req.params.id })
                    .andWhere('owner.id = :userId', { userId: req.user?.id })
                    .getOne();

                if (!foundTask) {
                    return res.status(404).json({ message: 'Task not found or unauthorized' });
                }
                
                task = foundTask;
            }

            await this.taskRepository.remove(task);
            return res.json({ message: 'Task deleted successfully' });
        } catch (error) {
            console.error('Delete task error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
} 