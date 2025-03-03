import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateUsersTable1710000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uniqueidentifier",
                        isPrimary: true,
                        default: "NEWSEQUENTIALID()"
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "255",
                        isUnique: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "createdAt",
                        type: "datetime2",
                        default: "GETDATE()"
                    },
                    {
                        name: "updatedAt",
                        type: "datetime2",
                        default: "GETDATE()"
                    }
                ]
            }),
            true
        );

        // Add indexes
        await queryRunner.createIndex(
            "users",
            new TableIndex({
                name: "IDX_users_email",
                columnNames: ["email"],
                isUnique: true
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("users", "IDX_users_email");
        await queryRunner.dropTable("users");
    }
} 