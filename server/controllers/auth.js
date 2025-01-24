const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require('../models/connection');
const JWT_SECRET = 'your_jwt_secret_key';

const signup = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    // Validate input fields
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        // Check if email is already registered
        const userExists = await Users.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new Users({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({ message: 'Error occurred during signup' });

    }
}



const login =  async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find the user by email
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User does not exist' });
        }

        // Compare the password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Error occurred during login' });
    }
}


module.exports = {
    login,
    signup
}