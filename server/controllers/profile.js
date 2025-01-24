
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';
const Users = require('../models/connection');


const getUserProfile = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET); // Verify the JWT token
        const user = await Users.findOne({ email: decoded.email }).select('name email'); // Fetch user details
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ name: user.name, email: user.email });
    } catch (err) {
        console.error('Error during token verification:', err);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

const signOut = (req, res) => {
    // Frontend clears the token; backend can return a success message.
    res.status(200).json({ message: 'Signed out successfully' });
};

module.exports = {
    getUserProfile,
    signOut,
};