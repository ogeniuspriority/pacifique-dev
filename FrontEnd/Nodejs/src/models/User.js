import mongoose from 'mongoose';

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
export default User;
