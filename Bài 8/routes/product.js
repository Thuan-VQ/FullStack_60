var express = require('express');
const verifyUserMiddleware = require('../middleware/auth_middleware');
var router = express.Router();
const Product = require('../models/product_model');
const { productValidation } = require('../Validation/validate');

//Get all product
router.get('/', (req, res) => {
  Product.find().exec( (err, product) => {
    if (err) return res.status(400).send(err.details[0].message);
    res.json(product)
  })
})

// Create new Product
router.post('/', verifyUserMiddleware ,async (req, res) => {

 const {error} = productValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newProduct = new Product();
  newProduct.name = req.body.name;
  newProduct.price = req.body.price;
  newProduct.amount = req.body.amount;

  try {
    const product = await newProduct.save()
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
})

// Update product
router.put('/:id', verifyUserMiddleware, (req, res) => {
  Product.findByIdAndUpdate(
    {
      _id: req.params.id
    },
    {
      $set: {
        name: req.body.name,
        price: req.body.price,
        amount: req.body.amount,
      }
    },
    (error, obj) => {
        if (error) return res.status(400).send(error.details[0].message);
        res.send(obj);
    }
  )
})


//Delete product
router.delete('/:id', verifyUserMiddleware, (req, res) => {
  Product.findByIdAndDelete(
    {
      _id: req.params.id
    },
    (error, obj) => {
      if (error) return res.status(400).send(error.details[0].message);
      res.send(obj);
    }
  )
})

module.exports = router;
