const registerService = require('../service/register.service');

const insertUser = async (req, res) => {
  const user = req.body;

  try {
    const newUser = await registerService.insertUser(user);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
}

module.exports = {
  insertUser,
}