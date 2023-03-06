const { Op } = require('sequelize');
let md5 = require('md5');

const { User } = require('../models');

const findUser = async (data) => {
  const { email, password } = data;
  let message = '';
  const senha = md5(password);
  const find = await User.findOne({ where: { email } })
  if (!find) {
    message = { message: 'user not found' }
  } else {
    if (find.password === senha) {
      message = { message: find }
    } else {
      message = { message: 'password is incorrect' }
    }
  }
  return message;
}

const getByRole = async (role) => {
  const users = await User.findAll({ where: { role } });
  return users;
}

const getById = async (id) => {
  const user = await User.findOne({ where: { id } });
  return user;
}

const create = async (user) => {
  const { name, email } = user;

  const userFoundByName = await User.findOne({ where: { name } });
  if (userFoundByName) throw new Error('Usuário já cadastrado');

  const userFoundByEmail = await User.findOne({ where: { email } });
  if (userFoundByEmail) throw new Error('Usuário já cadastrado');

  const passwordHash = md5(user.password);
  const userCreated = await User.create({ ...user, password: passwordHash });
  return userCreated;
}

const getAll = async () => {
  const users = await User.findAll({ where: {
    [Op.or]: [
      { role: "seller" },
      { role: "customer" }
    ]
  }});

  return users;
}

module.exports = {
  findUser,
  getByRole,
  getById,
  create,
  getAll
}
