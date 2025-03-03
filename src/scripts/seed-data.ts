import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import { Project, ProjectStatus, ProjectPriority } from '../entities/Project';
import { Task, TaskStatus, TaskPriority } from '../entities/Task';
import * as bcrypt from 'bcrypt';
import { addDays } from 'date-fns';

async function seedDatabase() {
    try {
        // Initialize the database connection
        await AppDataSource.initialize();
        console.log('Database connection initialized');

        // Create repositories
        const userRepository = AppDataSource.getRepository(User);
        const projectRepository = AppDataSource.getRepository(Project);
        const taskRepository = AppDataSource.getRepository(Task);

        // Sample test users
        const testUsers = [
            {
                email: 'admin@servicebridge.ai',
                name: 'Admin User',
                password: await bcrypt.hash('admin123', 10)
            },
            {
                email: 'test@servicebridge.ai',
                name: 'Test User',
                password: await bcrypt.hash('test123', 10)
            },
            {
                email: 'demo@servicebridge.ai',
                name: 'Demo User',
                password: await bcrypt.hash('demo123', 10)
            }
        ];

        // Save users
        const savedUsers: User[] = [];
        for (const userData of testUsers) {
            // Check if user already exists
            let user = await userRepository.findOne({
                where: { email: userData.email }
            });

            if (!user) {
                user = userRepository.create(userData);
                await userRepository.save(user);
                console.log(`Created user: ${userData.email}`);
            } else {
                console.log(`User already exists: ${userData.email}`);
            }
            savedUsers.push(user);
        }

        // Sample projects
        const projects = [
            {
                name: 'AI Integration Platform',
                description: 'Develop an AI-powered integration platform for enterprise services',
                status: ProjectStatus.ACTIVE,
                priority: ProjectPriority.HIGH,
                startDate: new Date(),
                dueDate: addDays(new Date(), 90),
                owner: savedUsers[0]
            },
            {
                name: 'Customer Portal Redesign',
                description: 'Modernize the customer portal with new features and improved UX',
                status: ProjectStatus.PLANNING,
                priority: ProjectPriority.MEDIUM,
                startDate: addDays(new Date(), 7),
                dueDate: addDays(new Date(), 60),
                owner: savedUsers[1]
            },
            {
                name: 'Mobile App Development',
                description: 'Create a mobile app for service management and tracking',
                status: ProjectStatus.ACTIVE,
                priority: ProjectPriority.HIGH,
                startDate: new Date(),
                dueDate: addDays(new Date(), 120),
                owner: savedUsers[2]
            }
        ];

        // Save projects
        const savedProjects: Project[] = [];
        for (const projectData of projects) {
            const project = projectRepository.create(projectData);
            await projectRepository.save(project);
            savedProjects.push(project);
            console.log(`Created project: ${project.name}`);
        }

        // Sample tasks for each project
        const tasks = [
            // AI Integration Platform tasks
            {
                title: 'Requirements Analysis',
                description: 'Gather and analyze requirements from stakeholders',
                status: TaskStatus.COMPLETED,
                priority: TaskPriority.HIGH,
                dueDate: addDays(new Date(), 15),
                estimatedHours: 40,
                project: savedProjects[0],
                assignee: savedUsers[1],
                creator: savedUsers[0]
            },
            {
                title: 'API Design',
                description: 'Design RESTful APIs for the integration platform',
                status: TaskStatus.IN_PROGRESS,
                priority: TaskPriority.HIGH,
                dueDate: addDays(new Date(), 30),
                estimatedHours: 60,
                project: savedProjects[0],
                assignee: savedUsers[2],
                creator: savedUsers[0]
            },
            // Customer Portal Redesign tasks
            {
                title: 'UI/UX Design',
                description: 'Create wireframes and design mockups',
                status: TaskStatus.TODO,
                priority: TaskPriority.MEDIUM,
                dueDate: addDays(new Date(), 20),
                estimatedHours: 30,
                project: savedProjects[1],
                assignee: savedUsers[0],
                creator: savedUsers[1]
            },
            {
                title: 'Frontend Development',
                description: 'Implement new UI components and features',
                status: TaskStatus.TODO,
                priority: TaskPriority.MEDIUM,
                dueDate: addDays(new Date(), 40),
                estimatedHours: 80,
                project: savedProjects[1],
                assignee: savedUsers[2],
                creator: savedUsers[1]
            },
            // Mobile App Development tasks
            {
                title: 'App Architecture',
                description: 'Design the mobile app architecture',
                status: TaskStatus.IN_PROGRESS,
                priority: TaskPriority.HIGH,
                dueDate: addDays(new Date(), 10),
                estimatedHours: 20,
                project: savedProjects[2],
                assignee: savedUsers[0],
                creator: savedUsers[2]
            },
            {
                title: 'Core Features Implementation',
                description: 'Implement core app features and functionality',
                status: TaskStatus.TODO,
                priority: TaskPriority.HIGH,
                dueDate: addDays(new Date(), 45),
                estimatedHours: 100,
                project: savedProjects[2],
                assignee: savedUsers[1],
                creator: savedUsers[2]
            }
        ];

        // Save tasks
        for (const taskData of tasks) {
            const task = taskRepository.create(taskData);
            await taskRepository.save(task);
            console.log(`Created task: ${task.title}`);
        }

        console.log('Seed completed successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
        throw error;
    } finally {
        // Close the connection
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
    }
}

// Run the seed
seedDatabase()
    .then(() => {
        console.log('Seeding complete');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Seeding failed:', error);
        process.exit(1);
    }); 