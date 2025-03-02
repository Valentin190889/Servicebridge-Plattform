import { Router } from 'express';
import { AuthService } from '../services/authService';
import { UserService } from '../services/userService';
import { validateRegistration } from '../middleware/validation';
import { requireAuth, AuthRequest } from '../middleware/auth';
import type { LoginCredentials } from '../services/authService';
import type { User } from '../services/userService';

const router = Router();
const authService = new AuthService();
const userService = new UserService();

// Login endpoint
router.post('/login', async (req: AuthRequest, res) => {
    try {
        const credentials: LoginCredentials = req.body;
        const authResponse = await authService.login(credentials);

        if (!authResponse) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        res.json(authResponse);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Register endpoint
router.post('/register', validateRegistration, async (req: AuthRequest, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        // Check if user already exists
        const existingUser = await userService.getUserByEmail(email);
        if (existingUser) {
            res.status(400).json({ error: 'User already exists' });
            return;
        }

        // Create user in database
        const user = await userService.createUser({
            email,
            password,
            firstName,
            lastName
        });

        // Generate auth token
        const authResponse = await authService.login({ email, password });

        res.status(201).json({
            message: 'User registered successfully',
            ...authResponse
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// Get user profile endpoint
router.get('/profile', requireAuth, async (req: AuthRequest, res) => {
    try {
        const userId = req.user?.userId;
        const user = await userService.getUserById(userId!);

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        // Remove sensitive information
        const { password, ...userProfile } = user;
        res.json(userProfile);
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ error: 'Failed to get profile' });
    }
});

// Validate session endpoint
router.get('/session', requireAuth, async (req: AuthRequest, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ error: 'Authentication required' });
            return;
        }

        const user = await userService.getUserByEmail(req.user.email);
        
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        // Remove sensitive information
        const { password, ...userWithoutPassword } = user;
        
        res.json({ user: userWithoutPassword });
    } catch (error) {
        console.error('Session validation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router; 