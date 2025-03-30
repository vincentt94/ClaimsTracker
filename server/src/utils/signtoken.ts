import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'mysecret';
const expiration = '2h';

export function signToken(user: any) {
  const payload = {
    _id: user._id,
    email: user.email,
    username: user.username,
    role: user.role,
  };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}
