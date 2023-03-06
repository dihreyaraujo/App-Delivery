const validateProperties = ({ name, password, email }) => {
  if (!name || !password || !email) {
    return false;
  }
  return true;
};

const validateEmail = ({ email }) => {
  const emailRules = /\S+@\S+\.\S+/i;
  if (!email.match(emailRules)) {
    return false;
  }
  return true;
};

const validateBodyRegister = (req, res, next) => {
  const { name, password, email } = req.body;
  const passwordRules = 6;
  const nameRules = 12;

  const propertiesIsValid = validateProperties({ name, password, email });

  if (!propertiesIsValid) {
    return res.status(400).json({ message: '"name" or "email" or "password" is required' });
  }

  const emailIsValid = validateEmail({ email });

  if (!emailIsValid) {
    return res.status(400).json({ message: 'Malformed email.' });
  }

  if (name.length < nameRules || password.length < passwordRules) {
    return res.status(422)
      .json({ message: 'The number of characters in the "name" or "password" is wrong' });
  }

  return next();
};

module.exports = { validateBodyRegister };
