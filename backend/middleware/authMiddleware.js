const jwt = require('jsonwebtoken');
const User = require('../Model/users');

// Middleware to protect routes
const protect = async (req, res, next) => {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else {
        return res.status(401).json({ success: false, msg: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user from database and attach to request object (excluding password)
        req.user = await User.findById(decoded.id).select('-password');
        
        if (!req.user) {
            return res.status(401).json({ success: false, msg: 'User not found' });
        }

        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ success: false, msg: 'Token is not valid or has expired' });
    }
};

// Function to generate a token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '1h' });
};

module.exports = { protect, generateToken };
