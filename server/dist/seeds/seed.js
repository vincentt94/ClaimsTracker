import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/user.js';
import Claim from '../models/claim.js';
import db from '../config/connection.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });
const generateClaim = (userId) => ({
    userId,
    fullName: 'Random Name',
    dateOfBirth: '1990-01-01',
    dateOfService: new Date().toISOString().split('T')[0],
    claimType: 'medical',
    description: 'Routine checkup claim',
    status: 'pending',
    claimNumber: Math.floor(10000 + Math.random() * 90000).toString(),
});
const seed = async () => {
    await db(); // Connect to DB
    console.log('🌱 Seeding database...');
    await User.deleteMany({});
    await Claim.deleteMany({});
    // Users to be seeded
    const seedUsers = [
        {
            username: 'john_doe',
            email: 'john@example.com',
            password: 'password123',
            role: 'user',
        },
        {
            username: 'jane_doe',
            email: 'jane@example.com',
            password: 'password123',
            role: 'user',
        },
        {
            username: 'john_smith',
            email: 'smith@example.com',
            password: 'password123',
            role: 'user',
        },
        {
            username: 'admin_user',
            email: 'admin@example.com',
            password: 'adminpass',
            role: 'admin',
        },
    ];
    // Save users and trigger password hashing
    const users = [];
    for (const u of seedUsers) {
        const user = new User(u);
        await user.save(); // triggers pre-save hook
        users.push(user);
    }
    const john = users[0];
    const jane = users[1];
    const smith = users[2];
    const claims = [
        ...Array(3).fill(null).map(() => generateClaim(john._id)),
        ...Array(3).fill(null).map(() => generateClaim(jane._id)),
        ...Array(4).fill(null).map(() => generateClaim(smith._id)),
    ];
    await Claim.insertMany(claims);
    console.log(' Database seeded successfully.');
    process.exit(0);
};
seed().catch(err => {
    console.error(' Error seeding DB:', err);
    process.exit(1);
});
