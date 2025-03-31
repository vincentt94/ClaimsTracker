import User from '../models/user.js';
import Claim from '../models/claim.js';
import { signToken } from '../utils/auth.js';
import bcrypt from 'bcryptjs';
//generates random 5 digit number for claim
const generateClaimNumber = () => {
    return Math.floor(10000 + Math.random() * 90000).toString(); // 5-digit number
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
        //query for admin
        getAllUsers: async (_, __, context) => {
            if (!context.user || context.user.role !== 'admin')
                throw new Error('Unauthorized');
            return await User.find({ role: 'user' });
        },
        //get all claims for specific user
        getClaimsByUserId: async (_, { userId }, context) => {
            if (!context.user || context.user.role !== 'admin')
                throw new Error('Unauthorized');
            return await Claim.find({ userId });
        },
    },
    Mutation: {
        register: async (_parent, { username, email, password }) => {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('Email already registered');
            }
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (_parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('Invalid email');
            }
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                throw new Error('Invalid password');
            }
            const token = signToken(user);
            return { token, user };
        },
        // creates claims
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
    },
};
export default resolvers;
