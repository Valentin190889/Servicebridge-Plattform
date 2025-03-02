import jwt from 'jsonwebtoken';
import { UserService, User } from './userService';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // In production, always use environment variable
const TOKEN_EXPIRY = '24h';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: Omit<User, 'password'>;
}

export class AuthService {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async login(credentials: LoginCredentials): Promise<AuthResponse | null> {
        const user = await this.userService.getUserByEmail(credentials.email);
        
        if (!user) {
            return null;
        }

        const isValidPassword = await this.userService.verifyPassword(
            credentials.password,
            user.password!
        );

        if (!isValidPassword) {
            return null;
        }

        // Update last login timestamp
        await this.userService.updateLastLogin(user.userId!);

        // Generate JWT token
        const token = this.generateToken(user);

        // Remove password from user object before returning
        const { password, ...userWithoutPassword } = user;
        
        return {
            token,
            user: userWithoutPassword
        };
    }

    private generateToken(user: User): string {
        return jwt.sign(
            {
                userId: user.userId,
                email: user.email
            },
            JWT_SECRET,
            { expiresIn: TOKEN_EXPIRY }
        );
    }

    verifyToken(token: string): { userId: number; email: string } | null {
        try {
            return jwt.verify(token, JWT_SECRET) as { userId: number; email: string };
        } catch (error) {
            return null;
        }
    }

    async validateSession(token: string): Promise<User | null> {
        const decoded = this.verifyToken(token);
        if (!decoded) {
            return null;
        }

        const user = await this.userService.getUserByEmail(decoded.email);
        if (!user) {
            return null;
        }

        // Remove password from user object
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
} 