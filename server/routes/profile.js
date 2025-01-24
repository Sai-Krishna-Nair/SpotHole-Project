
const express = require('express');
const router = express.Router();


const {getUserProfile,signOut} = require("../controllers/profile");
//get profile info
router.get('/profileInfo',getUserProfile);

//signout of the application
router.post('/signout',signOut);


module.exports=router;