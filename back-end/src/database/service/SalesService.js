const { Sale } = require('../models');

const findAllSalesUser = async (id) => {
  const allSales = await Sale.findAll({ where: { user_id: id } });
  if (allSales) {
    return allSales;
  } 
  return null;
}
const findAllSalesSeller = async (id) => {
  const allSales = await Sale.findAll({ where: { seller_id: id } });
  if (allSales) {
    return allSales;
  } 
  return null;
}

const updateStatus = async (id, body) => {
  const { saleStatus } = body;
  await Sale.update({ status: saleStatus }, { where: { id } });
  return saleStatus;
}

module.exports = {
  findAllSalesUser,
  findAllSalesSeller,
  updateStatus,
}
