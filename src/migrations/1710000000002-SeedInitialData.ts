import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedInitialData1710000000002 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Insert test users
        await queryRunner.query(`
            INSERT INTO users (id, email, name, password, createdAt, updatedAt)
            VALUES 
            (NEWID(), 'john.doe@example.com', 'John Doe', '$2b$10$6jM7.1RcjrH.9ZZHT3YYU.F.8yg5E1BHh3YG4DJ1lJCYRz5ZmnmKy', GETDATE(), GETDATE()),
            (NEWID(), 'jane.smith@example.com', 'Jane Smith', '$2b$10$6jM7.1RcjrH.9ZZHT3YYU.F.8yg5E1BHh3YG4DJ1lJCYRz5ZmnmKy', GETDATE(), GETDATE()),
            (NEWID(), 'mike.wilson@example.com', 'Mike Wilson', '$2b$10$6jM7.1RcjrH.9ZZHT3YYU.F.8yg5E1BHh3YG4DJ1lJCYRz5ZmnmKy', GETDATE(), GETDATE());
        `);

        // Get the inserted user IDs
        const users = await queryRunner.query(`SELECT id FROM users`);
        const [user1, user2, user3] = users;

        // Insert test projects
        await queryRunner.query(`
            INSERT INTO projects (id, name, description, status, priority, startDate, dueDate, progress, ownerId, createdAt, updatedAt)
            VALUES 
            (NEWID(), 'Website Redesign', 'Complete overhaul of company website with modern design', 'planning', 'high', '2024-03-15', '2024-05-15', 0, '${user1.id}', GETDATE(), GETDATE()),
            (NEWID(), 'Mobile App Development', 'Develop new mobile app for customer engagement', 'active', 'medium', '2024-03-20', '2024-06-30', 25, '${user2.id}', GETDATE(), GETDATE()),
            (NEWID(), 'Data Migration', 'Migrate legacy data to new cloud platform', 'planning', 'high', '2024-04-01', '2024-04-30', 0, '${user3.id}', GETDATE(), GETDATE());
        `);

        // Get the inserted project IDs
        const projects = await queryRunner.query(`SELECT id FROM projects`);
        const [project1, project2, project3] = projects;

        // Insert test tasks
        await queryRunner.query(`
            INSERT INTO tasks (id, title, description, status, priority, dueDate, progress, estimatedHours, projectId, assigneeId, creatorId, createdAt, updatedAt)
            VALUES 
            -- Website Redesign Tasks
            (NEWID(), 'Design Homepage Mockup', 'Create initial mockup for homepage design', 'todo', 'high', '2024-03-30', 0, 20, '${project1.id}', '${user2.id}', '${user1.id}', GETDATE(), GETDATE()),
            (NEWID(), 'User Research', 'Conduct user interviews and gather requirements', 'in-progress', 'medium', '2024-04-15', 50, 30, '${project1.id}', '${user3.id}', '${user1.id}', GETDATE(), GETDATE()),
            
            -- Mobile App Tasks
            (NEWID(), 'API Development', 'Develop RESTful APIs for mobile app', 'in-progress', 'high', '2024-04-30', 30, 40, '${project2.id}', '${user1.id}', '${user2.id}', GETDATE(), GETDATE()),
            (NEWID(), 'UI Implementation', 'Implement user interface designs', 'todo', 'medium', '2024-05-15', 0, 50, '${project2.id}', '${user3.id}', '${user2.id}', GETDATE(), GETDATE()),
            
            -- Data Migration Tasks
            (NEWID(), 'Data Mapping', 'Create data mapping documentation', 'todo', 'high', '2024-04-10', 0, 15, '${project3.id}', '${user1.id}', '${user3.id}', GETDATE(), GETDATE()),
            (NEWID(), 'Test Migration Script', 'Test migration script with sample data', 'todo', 'medium', '2024-04-20', 0, 25, '${project3.id}', '${user2.id}', '${user3.id}', GETDATE(), GETDATE());
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Clear all data
        await queryRunner.query(`DELETE FROM tasks`);
        await queryRunner.query(`DELETE FROM projects`);
        await queryRunner.query(`DELETE FROM users`);
    }
} 