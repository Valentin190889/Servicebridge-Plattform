import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { Task } from './Task';
import { Project } from './Project';

@Entity('time_entries')
export class TimeEntry {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'datetime2' })
  startTime!: Date;

  @Column({ type: 'datetime2', nullable: true })
  endTime?: Date;

  @Column({ type: 'float', default: 0 })
  duration!: number; // Duration in hours

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'bit', default: 0 })
  isBillable: boolean = false;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Task)
  task!: Task;

  @ManyToOne(() => Project)
  project!: Project;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
} 