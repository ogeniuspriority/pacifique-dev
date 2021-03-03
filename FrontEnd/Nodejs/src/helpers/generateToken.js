import jwt from 'jsonwebtoken';

const generateToken = (_id, name, email, phone, profile) =>
  jwt.sign(
    {
      _id,
      name,
      email,
      phone,
      profile,
    },
    process.env.secret
  );
export default generateToken;
