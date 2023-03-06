const { User } = require('../models');

const deleteById = async (id) => {
  const userDeleted = await User.destroy({ where: { id }});
  return userDeleted;
};

module.exports = {
  deleteById,
}