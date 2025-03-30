import { IResolvers } from '@graphql-tools/utils';
import User from '../models/user';
import { signToken } from '../utils/auth';
import bcrypt from 'bcryptjs';

const resolvers: IResolvers = {
  Query: {
    me: async (_parent, _args, context) => {
      return context.user || null;
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
  },
};

export default resolvers;
