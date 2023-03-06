const express = require('express');

const SalesController = require('../database/controller/SalesController');

const router = express.Router();

router.patch('/status/sale/:id', SalesController.updateStatusSale);

module.exports = router;
