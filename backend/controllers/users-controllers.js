const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');
const User = require('../models/user');
const HttpError = require('../models/http-error');
const jwt = require('jsonwebtoken');

// Get all users
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    next(new HttpError('Fetching users failed, please try again later.', 500));
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};


// User signup
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError('Validation failed, invalid inputs', 422);
    return next(error);
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError('Signing up failed, please try again later.', 500));
  }

  if (existingUser) {
    return next(new HttpError('User already exists, please login instead.', 422));
  }

  let hashedPassword;
  try { hashedPassword = await bcrypt.hash(password, 12); } catch (err) {
    return next(new HttpError('Could not create user, please try again later.', 500));
  }


  const createdUser = new User({
    name,
    email,
    image: req.file.path,
    password: hashedPassword,
    docs: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError('Signing up failed, please try again later.', 500));
  }

  let token;
  try {
    token =  jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    )
  } catch (err) {
    return next(new HttpError('Signing up failed, please try again later.', 500));
  }

  res
    .status(201)
    .json(
      {
        userId: createdUser.id,
        email: createdUser.email,
        token: token
      }
    );
};


// User login
const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError('Logging in failed, please try again later.', 500));
  }

  if (!existingUser) {
    return next(new HttpError('Invalid credentials, could not log you in.', 403));
  };

  let isValidPassword = false;
  try { isValidPassword = await bcrypt.compare(password, existingUser.password) } catch (err) {
    return next(new HttpError('Could not log you in, please check your credentials and try again later.', 500));
  }

  if (!isValidPassword) {
    return next(new HttpError('Invalid credentials, could not log you in.', 403));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    )
  } catch (err) {
    return next(new HttpError('Login failed, please try again later.', 500));
  }

  res
    .status(201)
    .json(
      {
        userId: existingUser.id,
        email: existingUser.email,
        token: token
      }
    );
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
