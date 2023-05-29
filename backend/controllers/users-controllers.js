const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const HttpError = require('../models/http-error');

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

  const createdUser = new User({
    name,
    email,
    image: 'https://cdn.webshopapp.com/shops/268192/files/396299701/pb-pht-tommy-20-00029-2.jpg',
    password,
    docs: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError('Signing up failed, please try again later.', 500));
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
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

  if (!existingUser || existingUser.password !== password) {
    return next(new HttpError('Invalid credentials, could not log you in.', 401));
  }

  res.json({ message: 'Logged in!', user: existingUser.toObject({ getters: true }) });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
