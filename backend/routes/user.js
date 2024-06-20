import { Router } from 'express';
import User from '../model/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { validateSignup, validateLogin, validateForgotPassword, validateChangePassword } from '../validation/validateUser.js';

const router = Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host:'smtp.gmail.com',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

// api/user/signup
router.post('/signup', validateSignup, async (req, res) => {
    const { email, password, name } = req.body;

    try {
        // Check if user with the same email already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ email, password: hashedPassword, name });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ message: 'Failed to register user' });
    }
});

// api/user/login
router.post('/login', validateLogin, async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate password
        const isPasswordValid = bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Set token as cookie
        res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days validity

        res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Failed to login' });
    }
});

// api/user/forgot-password
router.put('/forgot-password', validateForgotPassword, async (req, res) => {
    const { email } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ error: 'User not found with that email' });
        }

        // Generate OTP (assume it's a random 6-digit number)
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Save OTP to user document in database
        await User.findOneAndUpdate(
            { email },
            { otp },
            { new: true }
        );

        // Send OTP to user's email
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'OTP for Forgot Password',
            text: `Your OTP for Forgot Password is: ${otp}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
        console.error('Error in forgot password:', error);
        res.status(500).json({ message: 'Failed to process request' });
    }
});

// api/user/change-password
router.put('/change-password', validateChangePassword, async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        // Verify OTP
        const user = await User.findOne({ email, otp });
        if (!user) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Update password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.otp = undefined; // Clear OTP after successful password change
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error in changing password:', error);
        res.status(500).json({ message: 'Failed to process request' });
    }
});

export default router;