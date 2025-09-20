import { Router } from 'express';
import { signUp } from '../controllers/authController.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const router = Router();

router.post('/signup', signUp);

router.get('/verify', async (req, res) => {
  try {
    const token = req.query.token as string;
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret');
    await User.findByIdAndUpdate((payload as any).userId, { isVerified: true });
    res.send('Email verified! You can log in.');
  } catch (error) {
    res.status(400).send('Invalid or expired token');
  }
});

export default router;
