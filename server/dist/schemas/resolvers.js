import User from '../models/user.js';
import Claim from '../models/claim.js';
import { signToken } from '../utils/auth.js';
// Generates random 5-digit claim number
const generateClaimNumber = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
};
const resolvers = {
    Query: {
        me: async (_parent, _args, context) => {
            return context.user || null;
        },
        getClaimsByUser: async (_parent, _args, context) => {
            if (!context.user)
                throw new Error('Not authenticated');
            return await Claim.find({ userId: context.user._id });
        },
        getAllUsers: async (_parent, _args, context) => {
            if (!context.user || context.user.role !== 'admin') {
                throw new Error('Unauthorized');
            }
            return await User.find({ role: 'user' });
        },
        getClaimsByUserId: async (_parent, { userId }, context) => {
            if (!context.user || context.user.role !== 'admin') {
                throw new Error('Unauthorized');
            }
            return await Claim.find({ userId });
        },
    },
    Mutation: {
        register: async (_parent, { username, email, password }) => {
            try {
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    throw new Error('Email already registered');
                }
                const user = await User.create({ username, email, password });
                const token = signToken({
                    _id: user._id.toString(), // Convert ObjectId to string
                    email: user.email,
                    username: user.username,
                    role: user.role,
                });
                return { token, user };
            }
            catch (err) {
                console.error('❌ Registration error:', err);
                throw new Error('Registration failed');
            }
        },
        login: async (_parent, { email, password }) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error('Invalid email');
                }
                const valid = await user.isCorrectPassword(password);
                if (!valid) {
                    throw new Error('Invalid password');
                }
                const token = signToken({
                    _id: user._id.toString(),
                    email: user.email,
                    username: user.username,
                    role: user.role,
                });
                return { token, user };
            }
            catch (err) {
                console.error(' Login error:', err);
                throw new Error('Login failed');
            }
        },
        createClaim: async (_parent, args, context) => {
            if (!context.user)
                throw new Error('Not authenticated');
            const claimNumber = generateClaimNumber();
            const newClaim = await Claim.create({
                userId: context.user._id,
                claimNumber,
                ...args,
            });
            return newClaim;
        },
        updateClaimStatus: async (_parent, { claimId, status }, context) => {
            if (!context.user || context.user.role !== 'admin') {
                throw new Error('Unauthorized');
            }
            const updated = await Claim.findByIdAndUpdate(claimId, { status }, { new: true });
            if (!updated)
                throw new Error('Claim not found');
            return updated;
        },
    },
};
export default resolvers;
