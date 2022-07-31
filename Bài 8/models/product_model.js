const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    price: {
        required: true,
        type: Number,
    },
    amount: {
        required: true,
        type: Number,
    }
})

module.exports = mongoose.model('product', productSchema)