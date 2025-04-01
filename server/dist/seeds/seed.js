import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/user.js';
import Claim from '../models/claim.js';
import db from '../config/connection.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });
// Utility: get random item from array
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
// Generate random date in YYYY-MM-DD format
const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    .toISOString()
    .split('T')[0];
const claimTypes = ['medical', 'dental', 'vision', 'other'];
const statusOptions = ['pending', 'approved', 'denied'];
const descriptions = {
    medical: ['Annual physical exam', 'Follow-up consultation', 'Urgent care visit'],
    dental: ['Routine cleaning', 'Cavity filling', 'Wisdom tooth extraction'],
    vision: ['Eye exam', 'New prescription lenses', 'Vision therapy session'],
    other: ['Chiropractic adjustment', 'Massage therapy', 'Acupuncture treatment'],
};
// ✅ Updated: Accept static DOB as argument
const generateClaim = (userId, username, dateOfBirth) => {
    const claimType = getRandom([...claimTypes]);
    const description = getRandom(descriptions[claimType]);
    return {
        userId,
        fullName: username,
        dateOfBirth, //
        dateOfService: randomDate(new Date(2023, 0, 1), new Date()),
        claimType,
        description,
        status: getRandom([...statusOptions]),
        claimNumber: Math.floor(10000 + Math.random() * 90000).toString(),
    };
};
const seed = async () => {
    await db();
    console.log('🌱 Seeding database...');
    await User.deleteMany({});
    await Claim.deleteMany({});
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
    const users = [];
    for (const u of seedUsers) {
        const user = new User(u);
        await user.save();
        users.push(user);
    }
    const john = users[0];
    const jane = users[1];
    const smith = users[2];
    const johnDOB = randomDate(new Date(1980, 0, 1), new Date(1990, 0, 1));
    const janeDOB = randomDate(new Date(1985, 0, 1), new Date(1995, 0, 1));
    const smithDOB = randomDate(new Date(1975, 0, 1), new Date(1985, 0, 1));
    const claims = [
        ...Array(3).fill(null).map(() => generateClaim(john._id, john.username, johnDOB)),
        ...Array(3).fill(null).map(() => generateClaim(jane._id, jane.username, janeDOB)),
        ...Array(4).fill(null).map(() => generateClaim(smith._id, smith.username, smithDOB)),
    ];
    await Claim.insertMany(claims);
    console.log(' Database seeded successfully.');
    process.exit(0);
};
seed().catch((err) => {
    console.error(' Error seeding DB:', err);
    process.exit(1);
});
