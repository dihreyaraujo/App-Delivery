const isValidName = (name) => {
  const validNumberCharacters = 12;
  const onlyLettersRegex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/gm;
  const isOnlyLetters = onlyLettersRegex.test(name);
  return name.length >= validNumberCharacters && isOnlyLetters;
};

const isValidEmail = (email) => {
  const emailRegex = /\S+@\S+\.\S+/i;
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
  const validNumberCharacters = 6;
  return password.length >= validNumberCharacters;
};

module.exports = {
  isValidName,
  isValidEmail,
  isValidPassword,
};
