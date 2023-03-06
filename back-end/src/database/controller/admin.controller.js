const adminService = require('../service/admin.service');

const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    await adminService.deleteById(id, token);
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = {
  deleteById,
}