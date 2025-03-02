import { getConnection } from '../config/database';
import sql from 'mssql';
import bcrypt from 'bcrypt';

export interface User {
    userId?: number;
    email: string;
    password?: string;
    createdAt?: Date;
    lastLogin?: Date;
    isActive?: boolean;
}

export interface UserProfile {
    profileId?: number;
    userId: number;
    position: string;
    industry: string;
    region: string;
    companyName?: string;
    companySize?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class UserService {
    // Create a new user
    async createUser(user: User): Promise<number> {
        const pool = await getConnection();
        const hashedPassword = await bcrypt.hash(user.password!, 10);

        const result = await pool
            .request()
            .input('email', sql.NVarChar, user.email)
            .input('passwordHash', sql.NVarChar, hashedPassword)
            .query(`
                INSERT INTO Users (Email, PasswordHash)
                OUTPUT INSERTED.UserId
                VALUES (@email, @passwordHash)
            `);

        return result.recordset[0].UserId;
    }

    // Create or update user profile
    async updateProfile(profile: UserProfile): Promise<void> {
        const pool = await getConnection();
        
        await pool
            .request()
            .input('userId', sql.Int, profile.userId)
            .input('position', sql.NVarChar, profile.position)
            .input('industry', sql.NVarChar, profile.industry)
            .input('region', sql.NVarChar, profile.region)
            .input('companyName', sql.NVarChar, profile.companyName)
            .input('companySize', sql.NVarChar, profile.companySize)
            .query(`
                MERGE UserProfiles AS target
                USING (SELECT @userId as UserId) AS source
                ON target.UserId = source.UserId
                WHEN MATCHED THEN
                    UPDATE SET
                        Position = @position,
                        Industry = @industry,
                        Region = @region,
                        CompanyName = @companyName,
                        CompanySize = @companySize,
                        UpdatedAt = GETDATE()
                WHEN NOT MATCHED THEN
                    INSERT (UserId, Position, Industry, Region, CompanyName, CompanySize)
                    VALUES (@userId, @position, @industry, @region, @companyName, @companySize);
            `);
    }

    // Get user by email
    async getUserByEmail(email: string): Promise<User | null> {
        const pool = await getConnection();
        
        const result = await pool
            .request()
            .input('email', sql.NVarChar, email)
            .query(`
                SELECT UserId, Email, PasswordHash, CreatedAt, LastLogin, IsActive
                FROM Users
                WHERE Email = @email
            `);

        return result.recordset[0] || null;
    }

    // Get user profile
    async getUserProfile(userId: number): Promise<UserProfile | null> {
        const pool = await getConnection();
        
        const result = await pool
            .request()
            .input('userId', sql.Int, userId)
            .query(`
                SELECT *
                FROM UserProfiles
                WHERE UserId = @userId
            `);

        return result.recordset[0] || null;
    }

    // Update last login
    async updateLastLogin(userId: number): Promise<void> {
        const pool = await getConnection();
        
        await pool
            .request()
            .input('userId', sql.Int, userId)
            .query(`
                UPDATE Users
                SET LastLogin = GETDATE()
                WHERE UserId = @userId
            `);
    }

    // Verify password
    async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
} 