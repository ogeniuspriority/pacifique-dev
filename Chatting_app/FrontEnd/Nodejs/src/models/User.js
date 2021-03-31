const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    phone: String,
    gender: String,
    password: String,
    profile: String,
  },
  { timestamps: true }
);
const User = mongoose.model('User', schema);
module.exports = User;
