import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';


interface AuthRequest extends Request
{
  userId?: number;
}

// Middleware to verify the JWT
function verifyToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = jwt.verify(token, 'your-secret-key') as {
        userId: number
      };
      req.userId = decodedToken.userId;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    res.status(401).json({ error: 'Authorization header not found' });
  }
}


export
{
  AuthRequest,
  verifyToken,
};
