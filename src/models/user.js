const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  date: {
    type: String,
    default: Date.now
  }
});

module.exports = User = mongoose.model('User', userSchema);