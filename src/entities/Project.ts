import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { Task } from './Task';
import { Team } from './Team';
import { Tag } from './Tag';

export type ProjectStatus = 'planning' | 'active' | 'completed' | 'on_hold';
export type ProjectPriority = 'low' | 'medium' | 'high';

@Entity('projects')
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ 
        type: 'varchar',
        default: 'planning',
        enum: ['planning', 'active', 'completed', 'on_hold']
    })
    status: ProjectStatus = 'planning';

    @Column({ 
        type: 'varchar',
        default: 'medium',
        enum: ['low', 'medium', 'high']
    })
    priority: ProjectPriority = 'medium';

    @Column({ type: 'datetime2' })
    startDate: Date = new Date();

    @Column({ type: 'datetime2' })
    dueDate: Date = new Date(new Date().setMonth(new Date().getMonth() + 1));

    @Column({ type: 'float', default: 0 })
    progress: number = 0;

    @ManyToOne(() => User, user => user.projects)
    owner!: User;

    @ManyToOne(() => Team, team => team.projects, { nullable: true })
    team?: Team;

    @OneToMany(() => Task, task => task.project)
    tasks?: Task[];

    @ManyToMany(() => Tag, tag => tag.projects)
    tags?: Tag[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
} 