const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {
    login,
    signup
} = require('../controllers/auth');


// signup route
router.post('/signup',signup);

// Login route
router.post('/login',login);


module.exports = router;
