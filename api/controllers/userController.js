const { User } = require('../models');
const { genSalt, hash, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const reqBody = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    const salt = await genSalt(12);
    reqBody.password = await hash(reqBody.password, salt);
    const createdUser = await User.create(reqBody);
    res.status(201).json({
      success: true,
      message: 'user created successfully',
      result: createdUser,
    });
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: err.errors.map((e) => e.message),
      });
    }
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        success: false,
        message: err.errors.map((e) => e.message),
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'server issue',
        error: err.errors.map((e) => e.message),
      });
    }
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'The email is required',
      });
    }
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `The email: ${email} not found in the database`,
      });
    }
    const result = await compare(password, user.password);
    if (result) {
      const token = jwt.sign(
        {
          email: user.email,
          userId: user.id,
        },
        'hello'
      );
      res.status(200).json({
        success: true,
        message: 'user logged in successfully',
        token: token,
      });
    } else {
      return res.status(403).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'server issue',
      error: err,
    });
  }
};

const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users) {
      return res.status(404).json({
        success: false,
        message: 'there is no users found in the database',
        result: {},
      });
    }
    res.status(200).json({
      success: true,
      message: 'users fetched successfully',
      result: users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'server issue',
      error: err.errors.map((e) => e.message),
    });
  }
};

const fetchUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `user with id ${userId} not found in the database`,
      });
    }
    res.status(200).json({
      success: true,
      message: `user with id ${userId} fetched successfully`,
      result: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'server issue',
      error: err,
    });
  }
};

const updateUserById = async (req, res) => {};
const deleteUserById = async (req, res) => {};

module.exports = {
  register,
  login,
  fetchAllUsers,
  fetchUserById,
};
