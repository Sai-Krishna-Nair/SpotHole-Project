const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the CORS middleware
const auth = require('./routes/auth');
const profile = require('./routes/profile');
const app = express();
const PORT = 3000;


// middleware
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));  // Allow JSON payloads up to 50MB
app.use(cors());
app.use('/api/v1/auth',auth);
app.use('/api/v1/profile',profile);



// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Spothole')
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
    console.error('MongoDB connection error:', err);
});





// establishing the connection
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
