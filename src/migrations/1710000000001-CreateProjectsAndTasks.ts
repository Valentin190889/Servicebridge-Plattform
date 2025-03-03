import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProjectsAndTasks1710000000001 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create projects table
        await queryRunner.createTable(
            new Table({
                name: "projects",
                columns: [
                    {
                        name: "id",
                        type: "uniqueidentifier",
                        isPrimary: true,
                        default: "NEWSEQUENTIALID()"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "255",
                        isNullable: false
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: true
                    },
                    {
                        name: "status",
                        type: "varchar",
                        length: "50",
                        default: "'planning'",
                        isNullable: false
                    },
                    {
                        name: "priority",
                        type: "varchar",
                        length: "50",
                        default: "'medium'",
                        isNullable: false
                    },
                    {
                        name: "startDate",
                        type: "date",
                        isNullable: false
                    },
                    {
                        name: "dueDate",
                        type: "date",
                        isNullable: false
                    },
                    {
                        name: "progress",
                        type: "decimal",
                        precision: 5,
                        scale: 2,
                        default: 0,
                        isNullable: false
                    },
                    {
                        name: "ownerId",
                        type: "uniqueidentifier",
                        isNullable: false
                    },
                    {
                        name: "createdAt",
                        type: "datetime2",
                        default: "GETDATE()",
                        isNullable: false
                    },
                    {
                        name: "updatedAt",
                        type: "datetime2",
                        default: "GETDATE()",
                        isNullable: false
                    }
                ]
            }),
            true
        );

        // Create tasks table
        await queryRunner.createTable(
            new Table({
                name: "tasks",
                columns: [
                    {
                        name: "id",
                        type: "uniqueidentifier",
                        isPrimary: true,
                        default: "NEWSEQUENTIALID()"
                    },
                    {
                        name: "title",
                        type: "varchar",
                        length: "255",
                        isNullable: false
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: true
                    },
                    {
                        name: "status",
                        type: "varchar",
                        length: "50",
                        default: "'todo'",
                        isNullable: false
                    },
                    {
                        name: "priority",
                        type: "varchar",
                        length: "50",
                        default: "'medium'",
                        isNullable: false
                    },
                    {
                        name: "dueDate",
                        type: "date",
                        isNullable: true
                    },
                    {
                        name: "progress",
                        type: "decimal",
                        precision: 5,
                        scale: 2,
                        default: 0,
                        isNullable: false
                    },
                    {
                        name: "estimatedHours",
                        type: "int",
                        default: 0,
                        isNullable: false
                    },
                    {
                        name: "projectId",
                        type: "uniqueidentifier",
                        isNullable: false
                    },
                    {
                        name: "assigneeId",
                        type: "uniqueidentifier",
                        isNullable: true
                    },
                    {
                        name: "creatorId",
                        type: "uniqueidentifier",
                        isNullable: false
                    },
                    {
                        name: "createdAt",
                        type: "datetime2",
                        default: "GETDATE()",
                        isNullable: false
                    },
                    {
                        name: "updatedAt",
                        type: "datetime2",
                        default: "GETDATE()",
                        isNullable: false
                    }
                ]
            }),
            true
        );

        // Add foreign key for projects.ownerId -> users.id
        await queryRunner.createForeignKey(
            "projects",
            new TableForeignKey({
                columnNames: ["ownerId"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "NO ACTION"
            })
        );

        // Add foreign key for tasks.projectId -> projects.id
        await queryRunner.createForeignKey(
            "tasks",
            new TableForeignKey({
                columnNames: ["projectId"],
                referencedColumnNames: ["id"],
                referencedTableName: "projects",
                onDelete: "CASCADE"
            })
        );

        // Add foreign key for tasks.assigneeId -> users.id
        await queryRunner.createForeignKey(
            "tasks",
            new TableForeignKey({
                columnNames: ["assigneeId"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "SET NULL"
            })
        );

        // Add foreign key for tasks.creatorId -> users.id
        await queryRunner.createForeignKey(
            "tasks",
            new TableForeignKey({
                columnNames: ["creatorId"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "NO ACTION"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign keys first
        const tasks = await queryRunner.getTable("tasks");
        const projects = await queryRunner.getTable("projects");
        
        if (tasks) {
            const foreignKeys = tasks.foreignKeys;
            for (const foreignKey of foreignKeys) {
                await queryRunner.dropForeignKey("tasks", foreignKey);
            }
        }

        if (projects) {
            const foreignKeys = projects.foreignKeys;
            for (const foreignKey of foreignKeys) {
                await queryRunner.dropForeignKey("projects", foreignKey);
            }
        }

        // Then drop tables
        await queryRunner.dropTable("tasks");
        await queryRunner.dropTable("projects");
    }
} 