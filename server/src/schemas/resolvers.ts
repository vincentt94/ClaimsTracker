import { IResolvers } from '@graphql-tools/utils';
import mongoose from 'mongoose';
import User from '../models/user.js';
import Claim from '../models/claim.js';
import { signToken } from '../utils/auth.js';


// Utility for generating a random 5-digit claim number
const generateClaimNumber = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

const resolvers: IResolvers = {
  Query: {
    // Current logged-in user
    me: async (_parent, _args, context) => {
      return context.user || null;
    },

    // Claims for the currently logged-in user (user role)
    getClaimsByUser: async (_parent, _args, context) => {
      if (!context.user) throw new Error('Not authenticated');

      const userId = new mongoose.Types.ObjectId(context.user._id);
      return await Claim.find({ userId });
    },

    // Admin: list all users with role 'user'
    getAllUsers: async (_parent, _args, context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      return await User.find({ role: 'user' });
    },

    // Admin: get claims by any userId
    getClaimsByUserId: async (_parent, { userId }, context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }

      const id = new mongoose.Types.ObjectId(userId);
      return await Claim.find({ userId: id });
    },
  },

  Mutation: {
    // Register a new user
    register: async (_parent, { username, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Email already registered');
      }

      const user = await User.create({ username, email, password });

      const token = signToken({
        _id: user._id.toString(),
        email: user.email,
        username: user.username,
        role: user.role,
      });

      return { token, user };
    },

    // Login an existing user
    login: async (_parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('Invalid email');

      const isValid = await user.isCorrectPassword(password);
      if (!isValid) throw new Error('Invalid password');

      const token = signToken({
        _id: user._id.toString(),
        email: user.email,
        username: user.username,
        role: user.role,
      });

      return { token, user };
    },

    // User creates a claim
    createClaim: async (_parent, args, context) => {
      if (!context.user) throw new Error('Not authenticated');

      const claimNumber = generateClaimNumber();

      const newClaim = await Claim.create({
        userId: new mongoose.Types.ObjectId(context.user._id),
        claimNumber,
        ...args,
      });

      return newClaim;
    },

    // Admin updates claim status
    updateClaimStatus: async (_parent, { claimId, status }, context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }

      const updatedClaim = await Claim.findByIdAndUpdate(
        claimId,
        { status },
        { new: true }
      );

      return updatedClaim;
    },
  },
};

export default resolvers;
