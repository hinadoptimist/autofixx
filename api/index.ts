import { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';

const app = express();

// CORS configuration for production
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://autofixx.vercel.app', 'https://www.autofixx.vercel.app']
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    message: 'AutoFixx API is running',
    timestamp: new Date().toISOString()
  });
});

// Basic API routes without database
app.get('/api/products', (req: Request, res: Response) => {
  // Mock data for demo - replace with your actual data source
  res.json([
    { id: 1, name: 'Sample Product', price: 1000, category: 'Engine Parts' }
  ]);
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  // Mock login - replace with actual authentication
  res.json({ success: true, message: 'Login successful' });
});

app.post('/api/auth/register', (req: Request, res: Response) => {
  // Mock registration - replace with actual user creation
  res.json({ success: true, message: 'Registration successful' });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('API Error:', err);
  res.status(500).json({ 
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message 
  });
});

// Export for Vercel
export default app;