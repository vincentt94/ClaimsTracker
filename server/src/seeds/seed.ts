import mongoose, { HydratedDocument } from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import User from '../models/user.js';
import Claim from '../models/claim.js';
import db from '../config/connection.js';
import { IUser } from '../types/user.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Utility: get random item from array
const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Generate random date in YYYY-MM-DD format
const randomDate = (start: Date, end: Date) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    .toISOString()
    .split('T')[0];

const claimTypes = ['medical', 'dental', 'vision', 'other'] as const;
const statusOptions = ['pending', 'approved', 'denied'] as const;
const descriptions: Record<(typeof claimTypes)[number], string[]> = {
  medical: ['Annual physical exam', 'Follow-up consultation', 'Urgent care visit', 'Back pain treatment'],
  dental: ['Routine cleaning', 'Cavity filling', 'Wisdom tooth extraction'],
  vision: ['Eye exam', 'New prescription lenses', 'Contact lens consultation'],
  other: ['Chiropractic adjustment', 'Massage therapy', 'Acupuncture treatment'],
};

const generateClaim = (
  userId: mongoose.Types.ObjectId,
  username: string,
  dateOfBirth: string
) => {
  const claimType = getRandom([...claimTypes]);
  const description = getRandom(descriptions[claimType]);

  return {
    userId,
    fullName: username,
    dateOfBirth,
    dateOfService: randomDate(new Date(2023, 0, 1), new Date()),
    claimType,
    description,
    status: getRandom([...statusOptions]),
    claimNumber: Math.floor(10000 + Math.random() * 90000).toString(),
  };
};

const seed = async () => {
  await db();
  console.log(' Seeding database...');

  await User.deleteMany({});
  await Claim.deleteMany({});

  const seedUsers: IUser[] = [
    {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password',
      role: 'user',
    },
    {
      username: 'jane_doe',
      email: 'jane@example.com',
      password: 'password',
      role: 'user',
    },
    {
      username: 'michael_smith',
      email: 'michael@example.com',
      password: 'password',
      role: 'user',
    },
    {
      username: 'sara_lee',
      email: 'sara@example.com',
      password: 'password',
      role: 'user',
    },
    {
      username: 'david_kim',
      email: 'david@example.com',
      password: 'password',
      role: 'user',
    },
    {
      username: 'admin',
      email: 'admin@example.com',
      password: 'adminpass',
      role: 'admin',
    },
  ];

  const users: HydratedDocument<IUser>[] = [];
  for (const u of seedUsers) {
    const user = new User(u);
    await user.save();
    users.push(user);
  }

  const userDOBs = {
    john_doe: randomDate(new Date(1980, 0, 1), new Date(1990, 0, 1)),
    jane_doe: randomDate(new Date(1985, 0, 1), new Date(1995, 0, 1)),
    michael_smith: randomDate(new Date(1975, 0, 1), new Date(1985, 0, 1)),
    sara_lee: randomDate(new Date(1990, 0, 1), new Date(1996, 0, 1)),
    david_kim: randomDate(new Date(1982, 0, 1), new Date(1992, 0, 1)),
  };

  const claims = users
    .filter((u) => u.role !== 'admin')
    .flatMap((user) => {
      const dob = userDOBs[user.username as keyof typeof userDOBs];
      const count = Math.floor(Math.random() * 3) + 4; // 4 to 6 claims
      return Array.from({ length: count }, () =>
        generateClaim(user._id, user.username, dob)
      );
    });

  await Claim.insertMany(claims);

  console.log(' Database seeded successfully.');
  process.exit(0);
};

seed().catch((err) => {
  console.error(' Error seeding DB:', err);
  process.exit(1);
});
