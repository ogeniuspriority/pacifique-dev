import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import generateToken from '../helpers/generateToken.js';
import { errorResponse, successResponse } from '../helpers/responses.js';
import User from '../models/User.js';
import hashPassword from '../helpers/hashPassword.js';
import checkPassword from '../helpers/checkPassword.js';

export const signUp = async (req, res) => {
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
      profile = `/uploads/${imgId}.${req.files.profile.name.split('.')[1]}`;
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

export const signIn = async (req, res) => {
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
