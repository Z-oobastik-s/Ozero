import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

interface LoginRequestBody {
  email: string;
  password: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body as LoginRequestBody;

    // In a real application, you would validate against a database
    // This is a mock authentication for demonstration purposes only
    if (email === 'admin@ozero-mikhailyna.com' && password === 'admin123') {
      // Generate tokens
      // In production, use proper secret keys from environment variables
      const accessToken = jwt.sign(
        { userId: '1', email, role: 'admin' },
        'access-token-secret',
        { expiresIn: '15m' }
      );

      const refreshToken = jwt.sign(
        { userId: '1', email, role: 'admin' },
        'refresh-token-secret',
        { expiresIn: '7d' }
      );

      // Set refresh token in an HTTP-only cookie for better security
      res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict`);

      return res.status(200).json({
        message: 'Authentication successful',
        accessToken,
        user: {
          id: '1',
          email,
          role: 'admin'
        }
      });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
} 