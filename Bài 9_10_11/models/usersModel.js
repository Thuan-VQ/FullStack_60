const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String, required: true
    },

    email: {
        type: String, required: true
    },

    password: {
        type: String, required: true
    },

    isAdmin: {
        type: Boolean, required: true, default: false
    },
});

userSchema.pre('save', async function (next) {
    //Mã hóa pass trước khi lưu user vào database

        //check password có dc sửa hay k? k sửa gì thì next. nếu có thì mã hóa
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
})


const User = mongoose.model('User', userSchema);

module.exports = User;