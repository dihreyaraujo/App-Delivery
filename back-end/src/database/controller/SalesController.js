const salesService = require('../service/SalesService');

const allSalesUser = async (req, res) => {
  const { id } = req.params;
  const allSales = await salesService.findAllSalesUser(id);

  if (allSales) {
    res.status(201).json(allSales);
  } else {
    res.status(404).json({ message: 'Sem pedidos' });
  }
}

const allSalesSeller = async (req, res) => {
  const { id } = req.params;
  const allSales = await salesService.findAllSalesSeller(id);

  if (allSales) {
    res.status(201).json(allSales);
  } else {
    res.status(404).json({ message: 'Sem pedidos' });
  }
}

const updateStatusSale = async (req, res) => {
  const { id } = req.params;
  const updateStatus = await salesService.updateStatus(id, req.body);
  res.status(200).json({ message: updateStatus });
}

module.exports = {
  allSalesUser,
  allSalesSeller,
  updateStatusSale,
}
