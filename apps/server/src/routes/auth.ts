import { Router } from 'express';
import type { Request, Response } from 'express';
import { db } from '../lib/db.js';
import type { User } from '../models/user.js';

const router = Router();
const usersCollection = db.collection<User>('users');

// POST /api/auth/register - Register a new user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // Validate required fields
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    // Check if user already exists
    const existingUsers = await usersCollection.find({ email });
    if (existingUsers.length > 0) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    // Create new user
    const userId = await usersCollection.insertOne({
      email,
      password, // In production, this should be hashed!
      name,
      createdAt: new Date().toISOString(),
    });

    // Return user without password
    const user: Omit<User, 'password'> = {
      id: userId,
      email,
      name,
      createdAt: new Date().toISOString(),
    };

    // Generate a simple token (in production, use JWT)
    const token = Buffer.from(`${userId}:${email}`).toString('base64');

    res.status(201).json({ data: { user, token } });
  } catch (error) {
    console.error('[auth] Register error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/auth/login - Login an existing user
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const users = await usersCollection.find({ email });
    const user = users[0];

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password (in production, use bcrypt.compare)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    // Generate a simple token (in production, use JWT)
    const token = Buffer.from(`${user.id}:${email}`).toString('base64');

    res.json({ data: { user: userWithoutPassword, token } });
  } catch (error) {
    console.error('[auth] Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/auth/me - Get current user from token
router.get('/me', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.replace('Bearer ', '');
    
    try {
      const decoded = Buffer.from(token, 'base64').toString();
      const [userId] = decoded.split(':');

      const user = await usersCollection.findById(userId);
      
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      const { password: _, ...userWithoutPassword } = user;
      res.json({ data: { user: userWithoutPassword, token } });
    } catch {
      return res.status(401).json({ error: 'Invalid token' });
    }
  } catch (error) {
    console.error('[auth] Get me error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;