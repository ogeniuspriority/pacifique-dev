const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();
const hashPassword = (password) =>
  bcrypt.hashSync(password, Number(process.env.saltRounds));
module.exports = hashPassword;
