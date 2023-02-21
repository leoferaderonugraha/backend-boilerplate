import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { UserModel } from '../models/user';
import { verifyToken, AuthRequest } from '../middleware/auth';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const router: Router = Router();
const userModel = new UserModel(prisma.user);


async function signup(req: Request, res: Response)
{
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({'error': 'Email and password required!'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        email: email,
        password: hashedPassword,
        name: name,
    });
    const token = jwt.sign({ userId: user.id }, 'your-secret-key');
    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}


async function login(req: Request, res: Response)
{
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne(email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, 'your-secret-key');
    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}


async function check(req: AuthRequest, res: Response)
{
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}


router.post('/signup', signup);
router.post('/login', login);
router.get('/check', verifyToken, check);

export default router;
