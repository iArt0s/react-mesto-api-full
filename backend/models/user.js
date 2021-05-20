const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (link) => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,}\.[a-z0-9]{1,10}\b([-a-z0-9-._~:/?#@!$&'()*+,;=]*)/gmi.test(link),
      message: 'Неправильная ссылка',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Неправильный email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 10,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
