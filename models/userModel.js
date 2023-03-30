const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    required: [true, 'Please provide a username'],
    type: String,
  },
  email: {
    required: [true, 'Please provide an email'],
    validate: [validator.isEmail, 'Please provide a valid email'],
    unique: true,
    lowercase: true,
    type: String,
  },
  password: {
    required: true,
    minlength: 8,
    // select determines whether the property will be returned when queried,
    // we would like to hide the password
    select: false,
    type: String,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on create and save
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not match',
    },
  },
});

// pre is a document middleware function specified on the schema level
// Document is an instance of a Model
// "this" referes to the document i.e. instance of userModel

// This middleware ensures that passwords are encrypted
// when they are created or changed
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified/created
  if (!this.isModified('password')) return next();

  // Hash password with bcrypt - it is asynchronous
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

// Create a method that can be used on model instances (userModel).
// This method "correctPassword" verifies if passwords provided by users are correct,
// which can only be done through bcyrpt package since they are encyrpted
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
