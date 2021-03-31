const { v4: uuidv4 } = require('uuid');
const path = require('path');
const generateToken = require('../helpers/generateToken.js');
const { errorResponse, successResponse } = require('../helpers/responses.js');
const User = require('../models/User.js');
const hashPassword = require('../helpers/hashPassword.js');
const checkPassword = require('../helpers/checkPassword.js');

const signUp = async (req, res) => {
  const { name, email, phone, gender, password } = req.body;
  let profile;
  const userFound = await User.findOne({ email: email });
  if (userFound) {
    return errorResponse(res, 409, 'User with this email exists');
  } else {
    const hashedPassword = hashPassword(password);
    if (req.files !== null && req.files.profile) {
      const imgId = uuidv4();
      const filePath = `${path.resolve('./public/images/')}/${imgId}.${
        req.files.profile.name.split('.')[1]
      }`;
      req.files.profile.mv(filePath, (err) => {
        if (err) {
          return errorResponse(res, 500, err.message);
        }
      });
      profile = `/images/${imgId}.${req.files.profile.name.split('.')[1]}`;
    }
    let newUser = new User({
      name: name,
      email: email,
      phone: phone,
      gender: gender,
      password: hashedPassword,
      profile: profile,
    });
    const user = await newUser.save();
    delete user.password;
    const { _id } = user;
    const token = generateToken(_id, name, email, phone, profile);
    let data = {
      ...user._doc,
      token,
    };
    return successResponse(res, 201, 'Account created...', data);
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email: email });
  if (userFound && checkPassword(password, userFound.password)) {
    const { _id, name, profile, phone } = userFound;
    const token = generateToken(_id, name, email, phone, profile);
    delete userFound.password;
    const data = {
      ...userFound._doc,
      token,
    };
    return successResponse(res, 200, 'Logged in successfully', data);
  }
  return errorResponse(res, 401, 'Invalid email/ password');
};
module.exports = {
  signUp,
  signIn,
};
