import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Project } from './Project';
import { Task } from './Task';
import { Role } from './Role';
import { Team } from './Team';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @ManyToMany(() => Role, role => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' }
  })
  roles?: Role[];

  @ManyToMany(() => Team, team => team.members)
  teams?: Team[];

  @OneToMany(() => Project, project => project.owner)
  projects?: Project[];

  @OneToMany(() => Task, task => task.assignee)
  assignedTasks?: Task[];

  @OneToMany(() => Task, task => task.creator)
  createdTasks?: Task[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
} 