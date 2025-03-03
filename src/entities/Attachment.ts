import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { Project } from './Project';
import { Task } from './Task';

export enum AttachmentTargetType {
  PROJECT = 'project',
  TASK = 'task'
}

@Entity('attachments')
export class Attachment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  filename!: string;

  @Column()
  originalFilename!: string;

  @Column()
  mimeType!: string;

  @Column({ type: 'bigint' })
  size!: number;

  @Column({ type: 'varchar', nullable: true })
  path?: string;

  @Column({
    type: 'varchar',
    enum: ['project', 'task']
  })
  targetType!: AttachmentTargetType;

  @Column({ type: 'uuid', nullable: true })
  projectId?: string;

  @Column({ type: 'uuid', nullable: true })
  taskId?: string;

  @ManyToOne(() => User)
  uploader!: User;

  @ManyToOne(() => Project, { nullable: true })
  project?: Project;

  @ManyToOne(() => Task, { nullable: true })
  task?: Task;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
} 