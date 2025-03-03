import express from 'express';
import { AuthController } from '../controllers/AuthController';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();
const authController = new AuthController();

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Get current user profile
router.get('/profile', authenticateToken, async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    // Return user data without password
    const { password, ...userWithoutPassword } = req.user;
    return res.json(userWithoutPassword);
  } catch (error) {
    console.error('Profile error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router; 