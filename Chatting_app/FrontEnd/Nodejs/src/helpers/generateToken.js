const jwt = require('jsonwebtoken');

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
module.exports = generateToken;
