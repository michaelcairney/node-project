const userModel = require('../models/userModel');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const createJWT = (user, status, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // hide encrypted password in the response
  user.password = undefined;

  res.status(status).json({
    status: 'success',
    token,
    data: {
      user: user,
    },
  });
};

const signup = async (req, res, next) => {
  try {
    const newUser = await userModel.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    createJWT(newUser, 201, res);
  } catch (error) {
    // send error
    res.status(404).json({
      status: 'failed',
      message: error.message,
    });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new Error('Please provide a valid email and password'));
    }

    // since password is unselected in the model definition we must select it to query it
    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
      return next(new Error('Email not recognised, please sign up'));
    }

    const isCorrectPassword = await user.correctPassword(password, user.password);

    if (!isCorrectPassword) {
      return next(new Error('Incorrect password'));
    }

    createJWT(user, 200, res);
  } catch (error) {
    // send error
    res.status(404).json({
      status: 'failed',
      message: error.message,
    });
  }
};

const verify = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new Error('No valid bearer token provided'));
  }

  const decodedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await userModel.findById(decodedToken.id);

  if (!currentUser) {
    return next(new Error('The user belonging to this token does no longer exist'));
  }

  req.user = currentUser;
  next();
};

module.exports = { signup, login, verify };
