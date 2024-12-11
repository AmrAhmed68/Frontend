const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  retypePassword: { type: String, required: false },
  age: { type: Number, required: true },
  phone: { type: Number, required: true },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  isAdmin: { type: Boolean, default: false },
  profilePhoto: { type: String }, 
});

module.exports = mongoose.model('User', UserSchema);
