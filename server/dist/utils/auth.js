import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET_KEY || 'mysecret';
const expiration = '2h';
// Sign a new token (used on login/register)
export function signToken(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
    };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}
// Middleware-style context function for Apollo Server v4
export const authenticateToken = async ({ req }) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.split(' ')[1]; // Expects "Bearer <token>"
    if (!token) {
        return { user: null };
    }
    try {
        const decoded = jwt.verify(token, secret);
        return { user: decoded.data }; // Attaches user to context
    }
    catch (err) {
        console.error(' Invalid token:', err);
        return { user: null };
    }
};
