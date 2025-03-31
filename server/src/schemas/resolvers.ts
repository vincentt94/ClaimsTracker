import { IResolvers } from '@graphql-tools/utils';
import User from '../models/user';
import Claim from '../models/claim';
import { signToken } from '../utils/auth';
import bcrypt from 'bcryptjs';

//generates random 5 digit number for claim
const generateClaimNumber = () => {
  return Math.floor(10000 + Math.random() * 90000).toString(); // 5-digit number
};

const resolvers: IResolvers = {
  Query: {

    me: async (_parent, _args, context) => {
      return context.user || null;
    },
    
    getClaimsByUser: async (_parent, _args, context) => {
      if (!context.user) throw new Error('Not authenticated');
      return await Claim.find({ userId: context.user._id });
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
      if (!context.user) throw new Error('Not authenticated');
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
