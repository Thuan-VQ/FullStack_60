const User = require('../models/usersModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs')

// API create new User
const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    //check user exist in database
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exist')
    }
    // save to database
    const newUser = await User.create({ name, email, password, isAdmin });
    if (newUser) {
        res.status(200).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: generateToken(newUser._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }
});

// API login
const authLogin = asyncHandler( async (req, res) => {
    // xử lý code login
    const { email, password } = req.body;

    const user  = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password')
    }
});

// API get user by ID
const getUserProfile = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(401);
        throw new Error('User info not found')
    }
})


// API update profile by ID
const updateUserProfile = asyncHandler( async (req, res) => {

    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        
        const updateUser = await user.save();
        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin
        });
    } else {
        res.status(401);
        throw new Error('User not found')
    }
})


// API get all user (Admin)
const getAllUser = asyncHandler( async (req, res) => {

    const users = await User.find({});

    res.json(users)
})

// API delete User (Admin)
const deleteUser = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        await user.remove();
        res.json({
            message: "delete user success"
        })
    }else {
        res.status(400);
        throw new Error ('Can not delete user')
    }
})

// API get User by ID (Admin)
const getUserById = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(401)
        throw new Error('User not found')
    }
});

// API update User by ID (Admin)
const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
        try {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        
        const updateUser = await user.save();
        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin
        });
    } catch (error) {
        console.log(error);
    }
    } else {
        res.status(401);
        throw new Error('User not found')
    }
})
module.exports = {
    registerUser,
    authLogin,
    getUserProfile,
    updateUserProfile,
    getAllUser,
    deleteUser,
    getUserById,
    updateUserById
}