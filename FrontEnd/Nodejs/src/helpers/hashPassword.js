import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const hashPassword = (password) =>
  bcrypt.hashSync(password, Number(process.env.saltRounds));
export default hashPassword;
