
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';
const Users = require('../models/connection');
const History = require('../models/connection2')
const bcrypt = require('bcryptjs');



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




const updateHistory = async (req, res) => {
    const {image, result, probability, location, description} = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    let userId = null
    try {
        // Decode the JWT token and extract the payload
        const decoded = jwt.verify(token, JWT_SECRET);  // Use the same secret key used to sign the token
        // Extract the userId from the decoded payload
        userId = decoded.userId;  // assuming 'userId' is stored in the token payload

        // You can now use userId to query the database or for other purposes
    } catch (error) {
        console.error('Invalid token or decoding error:', error);
    }

    try {
        // Create a new report document
        const newReport = new History({
            image,
            prediction: result,
            probability,
            address: location,
            description,
            userId
        });

        // Save to MongoDB
        await newReport.save();
        res.status(200).json({message: "Report stored successfully"});
    } catch (err) {
        console.error("Error storing report:", err);
        res.status(500).json({message: "Failed to store report"});
    }

}


const getHistory = async (req, res) => {

        try {
            // Extracting the token from the reuest's Authorization header
            const token = req.headers.authorization?.split(" ")[1];


            if (!token) {
                return res.status(401).json({ message: "Authorization token missing or invalid." });
            }

            let userId = null;

            // Decoding the the JWT token and extract the payload i.e the userid
            try {
                const decoded = jwt.verify(token, JWT_SECRET); // Use your JWT secret key
                userId = decoded.userId; // Assuming 'userId' is stored in the token payload
            } catch (error) {
                console.error("Invalid token or decoding error:", error);
                return res.status(403).json({ message: "Invalid or expired token." });
            }

            // Query the database for the user's history
            const userHistory = await History.find({ userId }).sort({ timestamp: -1 }); // Sort by timestamp in descending order

            if (!userHistory || userHistory.length === 0) {
                return res.status(404).json({ message: "No reported potholes found for this user." });
            }

            // Return the user's history as a JSON response
            res.status(200).json(userHistory);
        } catch (error) {
            console.error("Error fetching user history:", error);
            res.status(500).json({ message: "Server error while fetching history." });
        }

}


// const deleteHistory = async (req, res) => {
//     try {
//         // Extract the token from the Authorization header
//         const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"
//
//
//         if (!token) {
//             return res.status(401).json({ message: "Unauthorized: No token provided" });
//         }
//
//         // Verify the token
//         const decoded = jwt.verify(token, JWT_SECRET); // Verify the JWT token
//
//         // Extract userId from the decoded token payload
//         const userId = decoded.userId;
//         console.log(userId);
//
//         // Get the history entry ID from the request params
//         const historyId = req.params.id;
//         console.log(historyId);
//
//         // Find the history entry by its ID and verify if it belongs to the authenticated user
//         const historyEntry = await History.findById(historyId);
//
//         if (!historyEntry) {
//             return res.status(404).json({ message: "History entry not found." });
//         }
//
//         // Check if the history entry belongs to the authenticated user
//         if (historyEntry.userId.toString() !== userId) {
//             return res.status(403).json({ message: "You are not authorized to delete this entry." });
//         }
//
//         // Delete the history entry
//         await History.findByIdAndDelete(historyId);
//
//         // Return success message
//         res.status(200).json({ message: "History entry deleted successfully." });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "An error occurred while deleting the history entry." });
//     }
// };

const changeEmail = async (req, res) => {
    const { newEmail } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if (!newEmail) {
        return res.status(400).json({ message: 'New email is required' });
    }

    try {
        // Verify the token and get user details
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;


        // Check if the new email is already taken
        const existingUser = await Users.findOne({ email: newEmail });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        // Update the user's email
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.email = newEmail;
        await user.save();

        res.status(200).json({ message: 'Email updated successfully' });
    } catch (err) {
        console.error('Error updating email:', err);
        res.status(500).json({ message: 'Server error while updating email' });
    }
};

const changePassword = async (req, res) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if (!currentPassword || !newPassword || !confirmNewPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ message: 'New password and confirmation do not match' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error('Error updating password:', err);
        res.status(500).json({ message: 'Server error while updating password' });
    }
};



module.exports = {
    getUserProfile,
    signOut,
    updateHistory,
    getHistory,
    // deleteHistory
    changeEmail,
    changePassword
}