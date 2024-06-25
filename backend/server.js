import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import connectDB from './configuration/db.js';

import router from './routes/api.js';

import "./configuration/passport.js";

connectDB();

const app = express();

// middlewares
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes

app.use('/api', router); // api/...

// google Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: true }),
    (req, res) => {
        // Successful authentication, redirect to the frontend or wherever.
        res.redirect('http://localhost:5173/home'); // Redirect to your frontend app
    }
);

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

app.get('/auth/check-session', (req, res) => {
    // Implement logic to check session here
    res.status(200).json({ isAuthenticated: true }); // Example response
});

const PORT = process.env.PORT;
app.listen(PORT || 5000, () => {
    console.log(`Listening on port ${PORT}`);
})