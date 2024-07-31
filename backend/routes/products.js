// routes/products.js
const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// GET /products - Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// POST /products - Add a new product
router.post('/',  async (req, res) => {
  const { name, description, price, imageUrl } = req.body;

  try {
    const product = new Product({
      name,
      description,
      price,
      imageUrl,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;
