const express = require('express');
const RegisterController = require('../database/controller/register.controller');
const { validateBodyRegister } = require('../middlewares/validateBodyRegister');

const router = express.Router();

router.post('/register', validateBodyRegister, RegisterController.insertUser);

module.exports = router;