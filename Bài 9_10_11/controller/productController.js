const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');

// API get all products
const getAllProduct = asyncHandler( async (req, res) => {
    const products = await Product.find({});
    res.json(products)
})

// API create new Products (Admin)
const createNewPorduct = asyncHandler ( async (req, res) => {
    const {user, name, image, brand, category, description, rating, numReview, price, countInStock} = req.body;
    
    //save to database
    const newProduct = await Product.create({user, name, image, brand, category, description, rating, numReview, price, countInStock });
    if (newProduct) {
        res.status(200).json({
            _id: newProduct._id,
            user: newProduct.user,
            name: newProduct.name,
            image: newProduct.image,
            brand: newProduct.brand,
            description: newProduct.description,
            category: newProduct.category,
            rating: newProduct.rating,
            numReview: newProduct.numReview,
            price: newProduct.price,
            countInStock: newProduct.countInStock
        })
    } else {
        res.status(400);
        throw new Error('Invalid product data')
    }
})

// API get Product by ID
const getProductById = asyncHandler ( async (req, res) => {
    const product = await Product.findById(req.params._id);

    if (product) {
        res.json({
            _id: product._id,
            user: product.user,
            name: product.name,
            image:product.image,
            brand:product.brand,
            description: product.description,
            category: product.category,
            rating: product.rating,
            numReview: product.numReview,
            price: product.price,
            countInStock: product.countInStock
        })
    } else {
        res.status(400);
        throw new Error('Product not found')
    }
})


// API delete product by ID
const deleteProductById= asyncHandler ( async (req, res) => {
    const product = await Product.findById(req.params._id)

    if (product) {
        await product.remove()
        res.json({
            message: "delete product success"
        })
    } else {
        res.status(400);
        throw new Error('Can not delete Product')
    }
}) 

// API update Product by ID
const updateProductById = asyncHandler ( async (req, res) => {
    const product = await Product.findById(req.params._id)

    if (product) {
        product.name = req.body.name || product.name
        product.image = req.body.image || product.image
        product.brand = req.body.brand || product.brand
        product.description = req.body.description || product.description
        product.category = req.body.category || product.category
        product.rating = req.body.rating || product.rating
        product.numReview = req.body.numReview || product.numReview
        product.price = req.body.price || product.price
        product.countInStock = req.body.countInStock || product.countInStock

        const updateProduct = await product.save()
        res.json({
             _id: updateProduct._id,
            user: updateProduct.user,
            name: updateProduct.name,
            image: updateProduct.image,
            brand: updateProduct.brand,
            description: updateProduct.description,
            category: updateProduct.category,
            rating: updateProduct.rating,
            numReview: updateProduct.numReview,
            price: updateProduct.price,
            countInStock: updateProduct.countInStock
        })
    } else {
        res.status(400);
        throw new Error('Can not update product')
    }
})

module.exports ={
    getAllProduct,
    createNewPorduct,
    getProductById,
    deleteProductById,
    updateProductById,
}