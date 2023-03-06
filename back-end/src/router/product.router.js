const express = require('express');

const productController = require('../database/controller/product.controller');

const router = express.Router();

router.get('/products', productController.getProducts);

module.exports = router;