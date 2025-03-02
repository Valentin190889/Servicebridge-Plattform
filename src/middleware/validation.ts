import { Request, Response, NextFunction } from 'express';

export const validateRegistration = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { email, password } = req.body;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        res.status(400).json({ error: 'Invalid email address' });
        return;
    }

    // Validate password
    if (!password || password.length < 8) {
        res.status(400).json({ 
            error: 'Password must be at least 8 characters long'
        });
        return;
    }

    // Check for password complexity
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    if (!passwordRegex.test(password)) {
        res.status(400).json({
            error: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        });
        return;
    }

    next();
};

export const validateProfileUpdate = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { position, industry, region } = req.body;

    // Required fields
    if (!position || !industry || !region) {
        res.status(400).json({
            error: 'Position, industry, and region are required fields'
        });
        return;
    }

    // Validate field lengths
    if (position.length < 2 || position.length > 100) {
        res.status(400).json({
            error: 'Position must be between 2 and 100 characters'
        });
        return;
    }

    if (industry.length < 2 || industry.length > 100) {
        res.status(400).json({
            error: 'Industry must be between 2 and 100 characters'
        });
        return;
    }

    if (region.length < 2 || region.length > 100) {
        res.status(400).json({
            error: 'Region must be between 2 and 100 characters'
        });
        return;
    }

    // Optional fields validation
    const { companyName, companySize } = req.body;
    if (companyName && (companyName.length < 2 || companyName.length > 255)) {
        res.status(400).json({
            error: 'Company name must be between 2 and 255 characters'
        });
        return;
    }

    const validCompanySizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];
    if (companySize && !validCompanySizes.includes(companySize)) {
        res.status(400).json({
            error: 'Invalid company size'
        });
        return;
    }

    next();
}; 