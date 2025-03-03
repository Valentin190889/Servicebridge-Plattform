import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Project } from '../entities/Project';
import { Task } from '../entities/Task';
import { User } from '../entities/User';
import { AuthRequest } from '../middleware/auth';

export class ProjectController {
    private projectRepository = AppDataSource.getRepository(Project);
    private taskRepository = AppDataSource.getRepository(Task);
    private userRepository = AppDataSource.getRepository(User);

    constructor() {
        // Bind methods to instance
        this.getUserProjects = this.getUserProjects.bind(this);
        this.getProject = this.getProject.bind(this);
        this.createProject = this.createProject.bind(this);
        this.updateProject = this.updateProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
    }

    async getUserProjects(req: AuthRequest, res: Response) {
        try {
            const projects = await this.projectRepository
                .createQueryBuilder('project')
                .leftJoinAndSelect('project.tasks', 'tasks')
                .leftJoinAndSelect('project.owner', 'owner')
                .where('owner.id = :userId', { userId: req.user?.id })
                .getMany();

            return res.json(projects);
        } catch (error) {
            console.error('Get user projects error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getProject(req: AuthRequest, res: Response) {
        try {
            // If using the validateProjectAccess middleware, the project is already attached to the request
            if (req.project) {
                return res.json(req.project);
            }

            // Fallback to the original implementation if middleware is not used
            const project = await this.projectRepository
                .createQueryBuilder('project')
                .leftJoinAndSelect('project.tasks', 'tasks')
                .leftJoinAndSelect('project.owner', 'owner')
                .where('project.id = :projectId', { projectId: req.params.id })
                .andWhere('owner.id = :userId', { userId: req.user?.id })
                .getOne();

            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }

            return res.json(project);
        } catch (error) {
            console.error('Get project error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async createProject(req: AuthRequest, res: Response) {
        try {
            const { name, description, status, priority, startDate, dueDate } = req.body;

            if (!name) {
                return res.status(400).json({ message: 'Project name is required' });
            }

            // Ensure startDate and dueDate are set
            const projectStartDate = startDate ? new Date(startDate) : new Date();
            const projectDueDate = dueDate ? new Date(dueDate) : new Date(new Date().setMonth(new Date().getMonth() + 1));

            const project = this.projectRepository.create({
                name,
                description,
                status,
                priority,
                startDate: projectStartDate,
                dueDate: projectDueDate,
                owner: req.user
            });

            await this.projectRepository.save(project);
            return res.status(201).json(project);
        } catch (error) {
            console.error('Create project error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateProject(req: AuthRequest, res: Response) {
        try {
            const { name, description, status, priority, startDate, dueDate, progress } = req.body;
            
            // If using the validateProjectAccess middleware, the project is already attached to the request
            let project = req.project;
            
            if (!project) {
                // Fallback to the original implementation if middleware is not used
                const foundProject = await this.projectRepository
                    .createQueryBuilder('project')
                    .leftJoinAndSelect('project.owner', 'owner')
                    .where('project.id = :projectId', { projectId: req.params.id })
                    .andWhere('owner.id = :userId', { userId: req.user?.id })
                    .getOne();

                if (!foundProject) {
                    return res.status(404).json({ message: 'Project not found' });
                }
                
                project = foundProject;
            }

            if (name) project.name = name;
            if (description !== undefined) project.description = description;
            if (status) project.status = status;
            if (priority) project.priority = priority;
            if (startDate) project.startDate = new Date(startDate);
            if (dueDate) project.dueDate = new Date(dueDate);
            if (progress !== undefined) project.progress = progress;

            await this.projectRepository.save(project);
            return res.json(project);
        } catch (error) {
            console.error('Update project error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteProject(req: AuthRequest, res: Response) {
        try {
            // If using the validateProjectAccess middleware, the project is already attached to the request
            let project = req.project;
            
            if (!project) {
                // Fallback to the original implementation if middleware is not used
                const foundProject = await this.projectRepository
                    .createQueryBuilder('project')
                    .leftJoinAndSelect('project.owner', 'owner')
                    .where('project.id = :projectId', { projectId: req.params.id })
                    .andWhere('owner.id = :userId', { userId: req.user?.id })
                    .getOne();

                if (!foundProject) {
                    return res.status(404).json({ message: 'Project not found' });
                }
                
                project = foundProject;
            }

            await this.projectRepository.remove(project);
            return res.json({ message: 'Project deleted successfully' });
        } catch (error) {
            console.error('Delete project error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
} 