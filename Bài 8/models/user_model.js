const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    age: {
        required: true,
        type: Number,
    },
    email: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    address: {
        required: true,
        type: String,
    }, 
    gender: {
        required: true,
        type: String,
    },
    phone: {
        required: true,
        type: Number,
    }

});

module.exports = mongoose.model('user', userSchema)