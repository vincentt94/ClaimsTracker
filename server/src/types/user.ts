import { Document, Types } from 'mongoose';

export interface IUser {
    username: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
  }

  export interface IUserDocument extends IUser, Document {
    _id: Types.ObjectId; 
    isCorrectPassword(password: string): Promise<boolean>;
  }