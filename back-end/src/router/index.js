const loginRouters = require('./login.router');
const registerRouters = require('./register.router');
const productRouters = require('./product.router');
const customerRouters = require('./customer.router');
const userRouters = require('./user.router');
const saleRouters = require('./customerOrders');
const salesTableRouter = require('./salesRouter');
const adminRouters = require('./admin.router');

module.exports = {
  loginRouters,
  registerRouters,
  productRouters,
  customerRouters,
  userRouters,
  saleRouters,
  salesTableRouter,
  adminRouters,
};