import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { Project } from './Project';
import { Tag } from './Tag';

export type TaskStatus = 'pending' | 'in_progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title!: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ 
        type: 'varchar',
        default: 'pending',
        enum: ['pending', 'in_progress', 'completed']
    })
    status: TaskStatus = 'pending';

    @Column({ 
        type: 'varchar',
        default: 'medium',
        enum: ['low', 'medium', 'high']
    })
    priority: TaskPriority = 'medium';

    @Column({ type: 'datetime2', nullable: true })
    dueDate?: Date;

    @Column({ type: 'float', default: 0 })
    progress: number = 0;

    @Column({ type: 'float', nullable: true })
    estimatedHours?: number;

    @ManyToOne(() => Project, project => project.tasks, { onDelete: 'CASCADE' })
    project!: Project;

    @ManyToOne(() => User, { nullable: true })
    assignee?: User | null;

    @ManyToOne(() => User)
    creator!: User;

    @ManyToMany(() => Tag, tag => tag.tasks)
    tags?: Tag[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
} 