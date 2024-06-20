import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                user = new User({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    picture: profile.photos[0].value,
                });
                await user.save();
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

            return done(null, { user, token });
        } catch (error) {
            return done(error, null);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
