const express = require('express')
const router = express.Router()

const { createUser, loginUser,createProfile, getUser, updateUser} = require('../controllers/userController');
const { auth, Authorization } = require("../middleware/auth");

router.post("/register", createUser)
router.post("/login", loginUser)
router.post("/user/:userId/profile, createProfile")
router.get("/user/profiles", getUser)
router.put("/updateUser/:userId", auth, Authorization, updateUser)

module.exports = router
