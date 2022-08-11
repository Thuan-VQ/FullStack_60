var express = require('express');
const { registerUser, authLogin, getUserProfile, updateUserProfile, getAllUser, deleteUser, getUserById, updateUserById } = require('../controller/usersController');
const { protect, checkAdmin } = require('../middleware/authMiddleware');
var router = express.Router();

// Register new user
router.post('/', registerUser);

// Login
router.post('/login', authLogin);

// Get profile
router.get('/profile', protect, getUserProfile);

// Update profile
router.put('/profile', protect, updateUserProfile);

// Get all user
router.get('/', protect, checkAdmin, getAllUser);

//Delete User
router.delete('/:id', protect, checkAdmin, deleteUser);

// Get user by ID
router.get('/:id', protect, checkAdmin, getUserById);

// Update user by ID 
router.put('/:id', protect, checkAdmin, updateUserById);

module.exports = router;
