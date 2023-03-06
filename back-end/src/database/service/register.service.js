const { User } = require('../models')
const md5 = require('md5');

const insertUser = async ({ name, email, password }) => {
  const passwMd5 = md5(password);

  const user = await User.findOne({ where: { email } });

  if (user) {
    throw new Error('Usuário já existente');
  }

  const newUser = await User.create({ name, email, password: passwMd5, role: 'customer'});
  return newUser.dataValues;
}

module.exports = { insertUser };
