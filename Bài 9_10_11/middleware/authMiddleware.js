const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');
// check có gửi token k
const protect = asyncHandler( async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization && authorization.startsWith('Bearer')) {
        // check token có hợp lệ k
        try {
            const token = req.headers.authorization.split(' ')[1];
            const userVerify = jwt.verify(token, 'masobimat123');
            req.user = await User.findById(userVerify.id).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('token invalid')
        }
    } else {
        res.status(401);
        throw new Error('Not authorization or no token or token invalid')
    }
});

const checkAdmin = asyncHandler( async (req, res, next) => {
    const user = req.user;
    if (user && user.isAdmin) {
       next();
    } else {
        res.status(401);
        throw new Error('You are not Admin')
    }
})

module.exports = {
    protect,
    checkAdmin
}