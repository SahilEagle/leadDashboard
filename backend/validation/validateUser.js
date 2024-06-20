import validator from 'validator';

const validateSignup = (req, res, next) => {
    const { email, password, name } = req.body;

    // Validate email
    if (!email || !validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate password
    if (!password || !validator.isLength(password, { min: 6 })) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Validate name
    if (!name || !validator.isLength(name, { min: 2 })) {
        return res.status(400).json({ message: 'Name must be at least 2 characters long' });
    }

    next(); // Proceed to the next middleware or route handler
};

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    // Validate email
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate password
    if (!validator.isLength(password, { min: 6 })) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    next(); // Proceed to the next middleware
};

const validateForgotPassword = (req, res, next) => {
    const { email } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    next();
};

const validateChangePassword = (req, res, next) => {
    const { email, otp, newPassword, confirmPassword } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!validator.isLength(newPassword, { min: 6 })) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    next();
};

export { validateSignup, validateLogin, validateForgotPassword, validateChangePassword };
