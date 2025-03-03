import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { Project } from './Project';
import { Task } from './Task';

export enum CommentTargetType {
  PROJECT = 'project',
  TASK = 'task'
}

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({
    type: 'varchar',
    enum: ['project', 'task']
  })
  targetType!: CommentTargetType;

  @Column({ type: 'uuid', nullable: true })
  projectId?: string;

  @Column({ type: 'uuid', nullable: true })
  taskId?: string;

  @ManyToOne(() => User)
  author!: User;

  @ManyToOne(() => Project, { nullable: true })
  project?: Project;

  @ManyToOne(() => Task, { nullable: true })
  task?: Task;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
} 