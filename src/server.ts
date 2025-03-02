import express from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Basic middleware
app.use(express.json());

// Health check route
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Test route
app.post('/api/test', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Test endpoint working', 
    data: req.body 
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Test the server: http://localhost:${port}/api/health`);
});

export default app; 