require('dotenv').config();
const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { default: validator } = require('validator');
const { celebrate, Joi, errors } = require('celebrate');
const { usersRoutes } = require('./routes/users');
const { cardsRoutes } = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { Auth } = require('./middlewares/auth');
const NotFoundError = require('./errors/404-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler');

app.use(cors({
  origin: 'https://react-mesto.nomoredomains.icu',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value, helpers) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      }
      return helpers.message('Неправильная ссылка');
    }),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
}), createUser);

app.use('/users', Auth, usersRoutes);
app.use('/cards', Auth, cardsRoutes);

app.use('*', () => {
  throw new NotFoundError('Ресурс не найден');
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'Ошибка сервера7' : message });
  next(err);
});

app.listen(PORT, () => {
});
