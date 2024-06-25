import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    googleId: { type: String },
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String },
    picture: { type: String },
    otp: { type: Number },
});

// Hash password before saving to database
userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
};

const User = mongoose.model('User', userSchema);

export default User;