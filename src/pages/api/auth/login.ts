import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

// Mock user database
const users = [
  {
    id: 1,
    email: 'admin@ozero-mikhaylyna.com',
    password: 'admin123', // In a real app, this would be a hashed password
    role: 'admin'
  },
  {
    id: 2,
    email: 'editor@ozero-mikhaylyna.com',
    password: 'editor456',
    role: 'editor'
  }
];

// JWT secret key - should be stored in environment variables in a real app
const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key-should-be-in-env';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find the user
    const user = users.find(u => u.email === email);
    
    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return the token
    return res.status(200).json({
      message: 'Authentication successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
    
  } catch (error) {
    // Log error for debugging, but don't expose in response
    return res.status(500).json({ message: 'Internal server error' });
  }
} 