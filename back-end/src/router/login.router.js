const { Router } = require('express');
const { findUserLogin } = require('../database/controller/UserController');

const router = Router();

router.post('/login', findUserLogin);

module.exports = router;
