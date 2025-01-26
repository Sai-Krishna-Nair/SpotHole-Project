const mongoose = require("mongoose");

const UserHistory = new mongoose.Schema({
    image: {
        type: String, // Can store a base64 string or binary buffer
        required: true,
    },
    prediction: {
        type: String, // 1 for pothole detected, 0 for no pothole
        required: true,
    },
    probability: {
        type: Number, // Confidence score (e.g., 0.85)
        required: true,
    },
    address: {
        type: String, // User-provided address
        default: null,
    },
    description: {
        type: String, // User-provided description of the pothole or situation
        default: null, // Optional field
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users", // Reference to the user who submitted it
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

// Create and export the model
const History = mongoose.model("History", UserHistory);
module.exports = History;
