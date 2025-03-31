import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
});
// Hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});
// Password comparison method
userSchema.methods.isCorrectPassword = function (password) {
    return bcrypt.compare(password, this.password);
};
const User = mongoose.model('User', userSchema);
export default User;
