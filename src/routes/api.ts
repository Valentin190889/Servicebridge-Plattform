import express from 'express';
import { ProjectController } from '../controllers/ProjectController';
import { TaskController } from '../controllers/TaskController';
import { authenticateToken } from '../middleware/auth';
import { validateProjectAccess, validateTaskAccess } from '../middleware/resourceAccess';

const router = express.Router();
const projectController = new ProjectController();
const taskController = new TaskController();

// Project routes
router.get('/projects', authenticateToken, projectController.getUserProjects);
router.get('/projects/:id', authenticateToken, validateProjectAccess, projectController.getProject);
router.post('/projects', authenticateToken, projectController.createProject);
router.put('/projects/:id', authenticateToken, validateProjectAccess, projectController.updateProject);
router.delete('/projects/:id', authenticateToken, validateProjectAccess, projectController.deleteProject);

// Task routes
router.get('/tasks', authenticateToken, taskController.getUserTasks);
router.get('/projects/:projectId/tasks', authenticateToken, validateProjectAccess, taskController.getProjectTasks);
router.post('/tasks', authenticateToken, taskController.createTask);
router.put('/tasks/:id', authenticateToken, validateTaskAccess, taskController.updateTask);
router.delete('/tasks/:id', authenticateToken, validateTaskAccess, taskController.deleteTask);

export default router; 