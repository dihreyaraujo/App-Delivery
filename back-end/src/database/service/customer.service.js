const { QueryTypes } = require('sequelize');
const { Sale, SaleProduct, Product, Sequelize, sequelize } = require('../models')

const createOrder = async (order) => {
  const orderCreated = await Sale.create(
    { ...order, saleDate: new Date().toISOString(), status: 'Pendente' }
  );
  return orderCreated.id;
}

const insertOrderProducts = async (order) => {
  const orderWithoutProducts = { ...order, products: undefined }
  const orderId = await createOrder(orderWithoutProducts);
  await Promise.all(order.products.map(async (product) => {
    await SaleProduct.create({ saleId: orderId, productId: product.id, quantity: product.quantity })
  }))
  return { id: orderId, ...order }
}

const getOrderById = async (id) => {
  // const order = await Sale.findOne({
  //   where: { id },
  //   include: [
  //     { model: Product, as: 'products', through: { attributes: [] } },
      
  //   ]
  // });

  // const order = await SaleProduct.findAll(
  //   {where: {sale_id: id},
  // include: [{model: Sale, as: "sales", through: SaleProduct}]}
    //   )

  const [results] = await sequelize.query(
   `SELECT * FROM sales AS s
   INNER JOIN sales_products AS sp ON s.id= sp.sale_id
   INNER JOIN products AS p ON p.id = sp.product_id
   WHERE sp.sale_id = ${id}`)

  return results;
}

module.exports = {
  createOrder,
  insertOrderProducts,
  getOrderById,
};