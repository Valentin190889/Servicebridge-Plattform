import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { Project } from './Project';
import { Task } from './Task';

export enum NotificationType {
  PROJECT_ASSIGNED = 'project_assigned',
  PROJECT_UPDATED = 'project_updated',
  TASK_ASSIGNED = 'task_assigned',
  TASK_UPDATED = 'task_updated',
  COMMENT_ADDED = 'comment_added',
  DEADLINE_APPROACHING = 'deadline_approaching'
}

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    enum: [
      'project_assigned',
      'project_updated',
      'task_assigned',
      'task_updated',
      'comment_added',
      'deadline_approaching'
    ]
  })
  type!: NotificationType;

  @Column()
  message!: string;

  @Column({ type: 'bit', default: 0 })
  isRead: boolean = false;

  @Column({ type: 'uuid', nullable: true })
  projectId?: string;

  @Column({ type: 'uuid', nullable: true })
  taskId?: string;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Project, { nullable: true })
  project?: Project;

  @ManyToOne(() => Task, { nullable: true })
  task?: Task;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
} 