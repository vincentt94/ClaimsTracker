import jwt from 'jsonwebtoken';
import { Request } from 'express';

const secret = process.env.JWT_SECRET || 'mysecret';
const expiration = '2h';

// Sign a token when user logs in or registers
export function signToken(user: any) {
  const payload = {
    _id: user._id,
    email: user.email,
    username: user.username,
    role: user.role,
  };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

// Middleware for Apollo context — authenticates token from headers
export function authenticateToken({ req }: { req: Request }) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split(' ')[1]; // expecting "Bearer <token>"

  if (!token) {
    return { user: null };
  }

  try {
    const decoded = jwt.verify(token, secret);
    return { user: (decoded as any).data };
  } catch (err) {
    console.error('Invalid token:', err);
    return { user: null };
  }
}
