const express = require('express');
const { getAllProduct, createNewPorduct, getProductById, deleteProductById, updateProductById } = require('../controller/productController');
const { checkAdmin, protect } = require('../middleware/authMiddleware');
const router = express.Router();

// get All product
router.get('/', getAllProduct)

// create new product
router.post('/', protect, checkAdmin, createNewPorduct)

//get product by ID
router.get('/:_id', getProductById)

// delete product by ID
router.delete('/:_id', protect, checkAdmin, deleteProductById)

// Update product by ID
router.put('/:_id', protect, checkAdmin, updateProductById)

module.exports = router;
