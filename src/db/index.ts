import { AppDataSource } from '../config/database';

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection has been established successfully.');
    
    // Run migrations if any
    await AppDataSource.runMigrations();
    console.log('Migrations completed successfully.');
    
    return AppDataSource;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

export const closeDatabase = async () => {
  try {
    await AppDataSource.destroy();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error closing database connection:', error);
    throw error;
  }
};

export default AppDataSource; 