const { Router } = require('express');

const auth = require('../middlewares/auth');

const { getByRole, getById, create, getAll } = require('../database/controller/UserController');

const userRouter = Router();

userRouter.get('/users', auth, getAll);

userRouter.post('/user', auth, create);

userRouter.get('/user/:role', getByRole);

userRouter.get('/user/find/:id', getById);

module.exports = userRouter;