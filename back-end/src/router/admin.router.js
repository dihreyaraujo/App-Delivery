const { Router } = require('express');

const auth = require('../middlewares/auth');

const { deleteById } = require('../database/controller/admin.controller');

const adminRouter = Router();

adminRouter.delete('/admin/manage/:id', auth, deleteById);

module.exports = adminRouter;
