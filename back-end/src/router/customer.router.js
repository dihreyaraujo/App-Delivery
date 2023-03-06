const express = require('express');

const auth = require('../middlewares/auth');

const customerController = require('../database/controller/customer.controller');

const router = express.Router();

router.post('/customer/order', auth, customerController.createOrder);
router.get('/customer/order/:id', customerController.getOrderById);

module.exports = router;