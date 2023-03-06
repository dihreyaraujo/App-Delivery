const customerService = require('../service/customer.service');

const createOrder = async (req, res) => {
  const orderCreated = await customerService.insertOrderProducts(req.body);
  return res.status(201).json(orderCreated);
}

const getOrderById = async (req, res) => {
  const { id } = req.params;
  const order = await customerService.getOrderById(id);
  return res.status(200).json(order);
}

module.exports = {
  createOrder,
  getOrderById,
}