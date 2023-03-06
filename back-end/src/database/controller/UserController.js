const jwt = require('jsonwebtoken');
const userService = require('../service/UserService');

const jwtKey = require("fs")
  .readFileSync("./jwt.evaluation.key", { encoding: "utf-8" });

const findUserLogin = async (req, res) => {
  const findUser = await userService.findUser(req.body);
  const { email, password } = req.body;

  if (typeof findUser.message === 'object') {
    const { id, name, role } = findUser.message;
    const token = jwt.sign({ email, password, name, role }, jwtKey, { algorithm: 'HS256' });

    res.status(200).json({ id, name, email, role, token });
  } else {
    res.status(404).json({ message: findUser.message });
  }
}

const getByRole = async (req, res) => {
  const { role } = req.params;
  const users = await userService.getByRole(role);
  return res.status(200).json(users)
}

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getById(id);
  return res.status(200).json(user)
}

const create = async (req, res) => {
  try {
    const userCreated = await userService.create(req.body);
    return res.status(201).json(userCreated);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
}

const getAll = async (req, res) => {
  const users = await userService.getAll();
  return res.status(200).json(users);
}

module.exports = {
  findUserLogin,
  getByRole,
  getById,
  create,
  getAll
}
