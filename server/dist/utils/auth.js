import jwt from 'jsonwebtoken';
// Use the correct environment variable name
const secret = process.env.JWT_SECRET_KEY || 'mysecret';
const expiration = '2h';
//  Sign a new token on register/login
export function signToken(user) {
    const payload = {
        _id: user._id.toString(),
        email: user.email,
        username: user.username,
        role: user.role,
    };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}
//  Apollo Server context function for auth
export const authenticateToken = async ({ req }) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.split(' ')[1]; // expects "Bearer <token>"
    if (!token) {
        return { user: null };
    }
    try {
        const decoded = jwt.verify(token, secret);
        return { user: decoded.data }; //  this becomes context.user
    }
    catch (err) {
        console.error(' Invalid token:', err);
        return { user: null };
    }
};
