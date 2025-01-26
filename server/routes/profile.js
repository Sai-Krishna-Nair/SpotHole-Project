
const express = require('express');
const router = express.Router();


const {getUserProfile,signOut,updateHistory,getHistory,deleteHistory,changeEmail,changePassword} = require("../controllers/profile");
//get profile info
router.get('/profileInfo',getUserProfile);

//signout of the application
router.post('/signout',signOut);

// update history
router.post('/history',updateHistory);

// fetch users history
router.get('/history',getHistory);

// delete history by id
// router.delete('/history/:id',deleteHistory);


//change email
router.put('/changeEmail',changeEmail);

//change password
router.put('/changePassword',changePassword);
module.exports=router;