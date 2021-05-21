const { JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/401-error');


exports.Auth = (req, res, next) => {
  const token = req.cookies.userToken;

  if (!token) {
    throw new UnauthorizedError('Необходимо залогиниться');
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Не достаточно прав1'));
  }

  req.user = payload;

  return next();
};
