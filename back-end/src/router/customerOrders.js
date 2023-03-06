const express = require('express');

const ordersController = require('../database/controller/SalesController');

const router = express.Router();

router.get('/orders/user/:id', ordersController.allSalesUser);

router.get('/orders/seller/:id', ordersController.allSalesSeller);

module.exports = router;