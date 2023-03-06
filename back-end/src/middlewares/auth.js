const jwt = require('jsonwebtoken');

const jwtKey = require('fs')
  .readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });

module.exports = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    const err = new Error('Token not found');
    err.statusCode = 401;
    return next(err);
  }

  try {
    const payload = jwt.verify(token, jwtKey);

    req.user = payload;

    return next();
  } catch (err) {
    err.message = 'Expired or invalid token';
    err.statusCode = 401;
    return next(err);
  }
};