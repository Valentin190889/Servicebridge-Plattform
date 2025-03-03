import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Project } from '../entities/Project';
import { Task } from '../entities/Task';
import { Comment } from '../entities/Comment';
import { Attachment } from '../entities/Attachment';
import { TimeEntry } from '../entities/TimeEntry';
import { Notification } from '../entities/Notification';
import { Team } from '../entities/Team';
import { Role } from '../entities/Role';
import { Permission } from '../entities/Permission';
import { Tag } from '../entities/Tag';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_SERVER || 'localhost',
  port: parseInt(process.env.DB_PORT || '1433'),
  username: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'freebsd',
  database: process.env.DB_NAME || 'ServiceBridgeDB',
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  entities: [
    User, 
    Project, 
    Task, 
    Comment, 
    Attachment, 
    TimeEntry, 
    Notification, 
    Team, 
    Role, 
    Permission, 
    Tag
  ],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  extra: {
    trustServerCertificate: true,
    Encrypt: true,
    IntegratedSecurity: false,
  }
}); 