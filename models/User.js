const mongoose = require("mongoose");
const { emit } = require("nodemon");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
  email: {
    type: email,
    required: true,
    minlength: 5,
    maxlength: 25,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  hash: String,
  salt: String,
});

module.exports = mongoose.model('User', UserSchema);