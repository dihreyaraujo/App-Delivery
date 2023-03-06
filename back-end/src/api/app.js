const express = require('express');
const cors = require('cors');

const {
  loginRouters,
  registerRouters,
  productRouters,
  customerRouters,
  userRouters,
  saleRouters,
  salesTableRouter,
  adminRouters,
} = require('../router');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(loginRouters);
app.use(registerRouters);
app.use(productRouters);
app.use(customerRouters);
app.use(userRouters);
app.use(saleRouters);
app.use(salesTableRouter);
app.use(adminRouters);

module.exports = app;
