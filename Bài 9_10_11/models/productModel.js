const mongoose = require('mongoose');
const reviewSchema = mongoose.Schema({
    name: { type: String, required: true },
    rating:{ type: Number, required: true},
    comment: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        require: true,
        ref: 'User'
    }
})
const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        require: true,
        ref: 'User'
    },
    name: {
        type: String, required: true
    },
    image: {
        type: String, required: true
    },
    brand: {
        type: String, required: true
    },
    category: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    review : [reviewSchema],
    rating: {
        type: Number, required: true
    },
    numReview: {
        type: Number, required: true
    },
    price: {
        type: Number, required: true
    },
    countInStock: {
        type: Number, required: true
    }

})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;